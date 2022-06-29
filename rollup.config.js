import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import eik from '@eik/rollup-plugin';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const browsers = 'supports es6-module and > 2% in NO and not dead';
const commonPlugins = [
  vue(),
  getBabelOutputPlugin({
    presets: [['@babel/preset-env', { targets: browsers, bugfixes: true }]],
  }),
  nodeResolve(),
  commonjs(),
  terser(),
];

export default [
  { // local build
    input: 'index.js',
    output: { file: './dist/fabric-vue.js', format: 'es', exports: 'named', sourcemap: true },
    plugins: commonPlugins,
    external: ['vue', ...Object.keys(pkg.dependencies)]
  },
  { // docs build
    input: 'index.js',
    output: { file: './dist/docs/fabric-vue.js', format: 'es', exports: 'named', sourcemap: true },
    plugins: commonPlugins,
    external: ['vue']
  },
  { // eik build
    input: 'index.js',
    output: { file: './dist/eik/index.js', format: 'es', exports: 'named', sourcemap: true },
    plugins: [
      eik(),
      ...commonPlugins
    ]
  }
]
