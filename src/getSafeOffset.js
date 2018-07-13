export default offset =>
  typeof offset === 'number' ? Math.max(Math.min(offset, 100), 0) : 20;
