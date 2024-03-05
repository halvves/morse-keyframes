// additional time between any character sequence: dot, dash, or space
const DELAY = 1 / 3;

/**
 * @param {number} percentage - the percentage point on the timeline
 * @param {string|number} value - the value to use at this point. if a number, it will be used as opacity, otherwise it will be used as a raw css string
 * @returns	{string} a valid css keyframe for the given percentage and value
 */
const getKeyframe = (percentage, value) =>
	`${percentage.toFixed(2)}%${
		typeof value === 'number' ? `{opacity:${value};}` : value
	}`;

/**
 * Generate css keyframes for a morse code animation
 *
 * @param {string} morse - the morse code to animate
 * @param {number} percentOffset - the percentage from which to delay the start of the animation
 * @param {string|number} offValue - the value to use when "off". if a number, it will be used as opacity, otherwise it will be used as a raw css string
 * @param {string|number} onValue - the value to use when "on". if a number, it will be used as opacity, otherwise it will be used as a raw css string
 * @param {string} dash - the character to interpret as a dash
 * @param {string} dot - the character to interpret as a dot
 * @param {string} space - the character to interpret as a space
 *
 * @returns {string} the css keyframes
 *
 * @example
 * const SOS = 'gggbrrrbggg';
 * const m = morseKeyframes(SOS);
 * const style = document.createElement('style');
 * style.type = 'text/css';
 * style.innerHTML = `@keyframes morse {${m}} .morse {animation: morse 5s linear infinite;}`;
 * document.getElementsByTagName('head')[0].appendChild(style)
 *
 * @example
 * const HELLO_WORLD = '.... . .-.. .-.. ---     .-- --- .-. .-.. -..';
 * const m = morseKeyframes(HELLO_WORLD, 5, '{background-position: 0;}', '{background-position: -200%;}', '-', '.', ' ');
 * const style = document.createElement('style');
 * style.type = 'text/css';
 * style.innerHTML = `@keyframes morse {${m}} .spritesheet {animation: morse 15s steps(2) infinite forwards normal empty;}`;
 * document.getElementsByTagName('head')[0].appendChild(style);
 */
export default (
	morse = '',
	percentOffset = 20,
	offValue = 0,
	onValue = 1,
	dash = 'r',
	dot = 'g',
	space = 'b'
) => {
	/**
	 * @param {string} character - the character to compare
	 * @returns {number} the relative time a character should take in the animation
	 */
	const getTime = (character) => {
		if (character === dash) return 1;
		if (character === dot) return 1 / 2;
		return 1 / 3;
	};

	const chars = morse.split('');

	// clamp percentOffset to between 0 and 100, default to 20 if undefined or NaN
	const offset =
		typeof percentOffset === 'number'
			? Math.max(Math.min(percentOffset, 100), 0)
			: 20;

	// multiplier used to scale time values such that they range between offset% and 100%
	const mult =
		(100 - offset) / chars.reduce((acc, c) => acc + getTime(c) + DELAY, 0);

	// starting time for character keyframes
	let p = offset + DELAY * mult;

	return (
		// 0% opening keyframe always starts with the off value
		getKeyframe(0, offValue) +
		// if there is any offset, continue the off value to that point
		(offset ? getKeyframe(offset, offValue) : '') +
		chars
			.map((c) => {
				// get the relative time this character should take in the animation
				const t = getTime(c);
				const keys =
					getKeyframe(p, c === space ? offValue : onValue) +
					getKeyframe(p + (t / 2) * mult, c === dash ? onValue : offValue) +
					getKeyframe(p + t * mult, offValue);

				// update the starting point for the next character
				p = p + (t + DELAY) * mult;

				return keys;
			})
			.join('')
	);
};
