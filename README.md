# morse-keyframes

|   |   |
|---|---|
| npm | [v0.3.1](https://www.npmjs.com/package/morse-keyframes) |
| size | [420b minzipped](./scripts/sizecheck.js) |
| dependencies | [zero](./package.json) |
| license | [MIT](./LICENSE) |

*turn morse code into css keyframes*

`morse-keyframes` is a tiny library created to help communicate messages via morse code using css animations.

## usage

### script include

```html
<script src="https://unpkg.com/morse-keyframes"></script>
```
```javascript
const CODE_STRING = '... ___ ...';
const PERCENT_OFFSET = 20;
const DASH_CHAR = '_';
const DOT_CHAR = '.';
const SPACE_CHAR = ' ';

const m = morseKeyframes(
	CODE_STRING,
	PERCENT_OFFSET,
	0,
	1,
	DASH_CHAR,
	DOT_CHAR,
	SPACE_CHAR
);

const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `@keyframes morse {${m}}`;
document.getElementsByTagName('head')[0].appendChild(style);
```
```css
.selector {
	animation: 4s linear infinite morse;
}
```

### import

`npm install morse-keyframes`

```javascript
import React from 'react';
import styled, { keyframes } from 'styled-components';
import morse from 'morse-keyframes';

const Secret = styled.div`
	position: fixed;
	bottom: 0;
	left: calc(50% - 25px);
	height: 50px;
	width: 50px;
	background: #00f;
	border-radius: 4px;
	animation: 5s linear infinite ${keyframes`${morse(
		'gggbrrrbggg',
		20,
		'{transform: translate3d(0, 40%, 0) scale3d(1.5, 1, 1); opacity: 0;}',
		'{transform: translate3d(0, 0, 0) scale3d(1, 1, 1); opacity: 1;}'
	)}`};
`;

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(React.createElement(Secret), app);
```

## api

some of the api may be a bit obtuse, but this is to help your easter eggs/puzzles stay hidden!

### parameters

| parameter       | type           | default | description      |
|-----------------|----------------|---------|------------------|
| `morse`         | string         | `''`    | morse coded message |
| `percentOffset` | number         | `20`    | css animation percent delay before starting the message |
| `offValue`      | number/string  | `0`     | the opacity or css when "off" (opacity when number, css when string) |
| `onValue`       | number/string  | `1`     | the opacity or css when "on" (opacity when number, css when string) |
| `dash`          | string         | `'r'`   | character to match for morse dash |
| `dot`           | string         | `'g'`   | character to match for morse dot |
| `space`         | string         | `'b'`   | character to match for morse space |