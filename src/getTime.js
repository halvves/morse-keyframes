export default (c, dash, dot) => {
  if (c === dash) {
    return 1.5;
  }

  if (c === dot) {
    return 0.75;
  }

  return 0.5;
};
