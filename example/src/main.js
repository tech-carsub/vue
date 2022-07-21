import { createApp } from 'vue';
import App from './App.vue';
import Cleave from 'cleave-lite';
import { router } from './router'
import { setWasm, setCDN, getHighlighter } from 'shiki'
import Control from './Control.vue'
import Controls from './Controls.vue'
import ControlItem from './ControlItem.vue'
import { Token } from '@itsy/token'

setWasm('/shiki/dist/onigasm.wasm')
setCDN('/shiki/')

const highlighter = await getHighlighter({ theme: 'nord', langs: ['js', 'vue-html'] })

createApp(App)
  .provide('Cleave', Cleave)
  .provide('highlighter', highlighter)
  .component('token', Token)
  .component('control', Control)
  .component('controls', Controls)
  .use(router)
  .mount('#app');
