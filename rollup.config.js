import babel from 'rollup-plugin-babel';
import closure from '@ampproject/rollup-plugin-closure-compiler';
import pkg from './package.json';

export default [
  {
    input: 'src/main.js',
    output: [{ file: pkg.module, format: 'es' }],
    plugins: [babel()],
  },
  {
    input: 'src/main.js',
    output: [
      { name: 'morseKeyframes', file: pkg.browser, format: 'umd' },
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [babel(), closure()],
  },
];
