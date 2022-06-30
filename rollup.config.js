import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import eik from '@eik/rollup-plugin';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const input = 'index.js'
const outputOpts = { format: 'es', exports: 'named', sourcemap: true }
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
    // all deps and Vue externalized
    input,
    output: { file: './dist/fabric-vue.js', ...outputOpts },
    plugins: commonPlugins,
    external: ['vue', ...Object.keys(pkg.dependencies)]
  },
  { // docs build (used by the tech-docs for examples)
    // all deps included in build, Vue externalized (we use the Vue included with Vitepress)
    input,
    output: { file: './dist/docs/fabric-vue.js', ...outputOpts },
    plugins: commonPlugins,
    external: ['vue']
  },
  { // eik build
    // all deps included in build, Vue externalized to Eik
    input,
    output: { file: './dist/eik/index.js', ...outputOpts },
    plugins: [eik(), ...commonPlugins]
  }
]
