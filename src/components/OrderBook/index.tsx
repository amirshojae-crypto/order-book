import useOrderBook from './useOrderBook';
import './OrderBook.css';
import React from 'react';
interface IOrder {
  price: number,
  size: number,
}
export interface IOrderBook {
  asks: IOrder[],
  bids: IOrder[],
}

const OrderBook: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { buy, sell, orderBook } = useOrderBook(symbol);

  return (
    <div className="Position">
      <h3>Order Book</h3>
      <div className="Table">
        <div className="Head">
          <span>Price ({buy})</span>
          <span>Amount ({sell})</span>
        </div>
        <div className="Body">
          <div className="OrderSection">
            {orderBook?.asks.map((a) => (
              <div>
                <span className="Red">{a.price}</span>
                <span>{a.size}</span>
              </div>
            ))}
          </div>
          <div className="OrderSection">
            {orderBook?.bids.map((a) => (
              <div>
                <span className="Green">{a.price}</span>
                <span>{a.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
