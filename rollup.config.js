import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import pkg from './package.json';

let external = Object.keys(pkg.dependencies || {});
external = external.concat(Object.keys(pkg.peerDependencies || {}), [
  'react-transition-group/Transition',
]);

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    postcss({
      modules: true,
      inject: {
        insertAt: 'top',
      },
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve(),
    commonjs(),
  ],
};
