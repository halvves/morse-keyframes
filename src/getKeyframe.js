export default (percentage, val) =>
  `${percentage.toFixed(2)}% ${typeof val === 'number' ? `{opacity: ${val};}` : val}\n`;
