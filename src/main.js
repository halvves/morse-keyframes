import getKeyframe from './getKeyframe';
import getSafeOffset from './getSafeOffset';
import getTime from './getTime';

const DELAY = 0.3;

export default (
  morse = '',
  percentOffset,
  minOpacity = 0,
  maxOpacity = 1,
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
    getKeyframe(0, minOpacity) +
    (offset ? getKeyframe(offset, minOpacity) : '') +
    chars
      .map(c => {
        const t = getTime(c, dash, dot);
        const keys =
          getKeyframe(p, c === space ? minOpacity : maxOpacity) +
          getKeyframe(
            p + (t / 2) * mult,
            c === dash ? maxOpacity : minOpacity
          ) +
          getKeyframe(p + t * mult, minOpacity);

        p = p + (t + DELAY) * mult;

        return keys;
      })
      .join('')
  );
};
