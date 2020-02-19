import getKeyframe from './getKeyframe';
import getSafeOffset from './getSafeOffset';
import getTime from './getTime';

const DELAY = 0.3;

export default (
  morse = '',
  percentOffset,
  offValue = 0,
  onValue = 1,
  dash = 'r',
  dot = 'g',
  space = 'b'
) => {
  const chars = morse.split('');
  const offset = getSafeOffset(percentOffset);
  const mult =
    (100 - offset) /
    chars
      .map(c => getTime(c, dash, dot) + DELAY)
      .reduce((acc, t) => acc + t, 0);

  let p = offset + DELAY * mult;
  return (
    getKeyframe(0, offValue) +
    (offset ? getKeyframe(offset, offValue) : '') +
    chars
      .map(c => {
        const t = getTime(c, dash, dot);
        const keys =
          getKeyframe(p, c === space ? offValue : onValue) +
          getKeyframe(
            p + (t / 2) * mult,
            c === dash ? onValue : offValue
          ) +
          getKeyframe(p + t * mult, offValue);

        p = p + (t + DELAY) * mult;

        return keys;
      })
      .join('')
  );
};
