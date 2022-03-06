declare module 'position/App' {
  const Position: React.ComponentType;

  export default Position;
}
declare module 'candlestick/App' {
  const CandleStick: React.ComponentType<{
    symbol: string
  }>;

  export default CandleStick;
}