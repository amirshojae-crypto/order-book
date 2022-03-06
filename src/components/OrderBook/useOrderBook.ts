import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { IOrderBook } from './index';

const apiCall = {
  apikey: '375274FD-4E03-4E94-8B01-A767D1D73D88', // This wouldn't normally be stored here, for simplicity
  heartbeat: false,
  subscribe_data_type: ["book20"],
  subscribe_filter_asset_id: ["BTC/USDT"],
}

const useOrderBook = (symbol: string) => {
  const [buy, sell] = symbol.split('/');
  const [orderBook, setOrderBook] = useState<IOrderBook>();
  const snackbar = useSnackbar();
  
  const orderBookDataSocket = (): WebSocket => {
    const ws = new WebSocket("wss://ws-sandbox.coinapi.io/v1/");
    ws.onopen = () => {
      ws.send(JSON.stringify({
        ...apiCall, subscribe_filter_asset_id: [symbol],
      }));
    }
    ws.onmessage = (event) => {
      try {
        const { asks, bids } = JSON.parse(event.data);
        setOrderBook({ asks, bids });
      } catch (error) {
        snackbar.enqueueSnackbar((error as Error)?.message || 'Soemthing went wrong with retrieving order book data', {
          variant: 'error'
        })
      }
    };
    ws.onerror = () => {
      snackbar.enqueueSnackbar('Soemthing went wrong with retrieving order book data', {
        variant: 'error'
      })
    }

    return ws;
  }
  
  useEffect(() => {
    const ws = orderBookDataSocket();
    return () => ws.close();
  }, []);

  return {
    buy,
    sell,
    orderBook,
  }
};

export default useOrderBook;
