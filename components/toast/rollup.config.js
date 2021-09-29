import pkg from './package.json';
import { getExports } from '../../build/rollup-settings'

export default getExports(pkg, { external: ['@fabric-ds/vue-expandable'] })
