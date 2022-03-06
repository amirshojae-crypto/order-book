import { CircularProgress } from '@mui/material';
import React from 'react';
import './App.css';
import OrderBook from './components/OrderBook';
import { useParams } from 'react-router-dom';

const CandleStick = React.lazy(() => import('candlestick/App'));

function App() {
  const params = useParams();
  if (!params.crypto) {
    return <h4>Invalid</h4>
  }

  const symbol = params.crypto.replace('_', '/');
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ flexGrow: 4 }}>
          <CandleStick symbol={symbol} />
        </div>
        <div>
          <OrderBook symbol={symbol} />
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
