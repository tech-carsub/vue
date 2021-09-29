import { inject } from 'vue'
import { mount } from 'mount-vue-component'
import { makeToast } from './controller.js'
import Toaster from './f-toaster.vue'

const exists = (el) => typeof(el) !== 'undefined'
const injectionKey = 'toaster'

export default {
  install: app => {
    let element
    if (exists(window) && window.fToast) {
      app.provide(injectionKey, { makeToast: window.fToast.makeToast })
    } else {
      if (exists(document)) element = document.createElement('div')
      mount(Toaster, { element, app })
      const iface = { makeToast }
      document.body.appendChild(element)
      app.provide(injectionKey, iface)
      if (exists(window)) window.fToast = iface
    }
  }
}

export const useToaster = () => inject(injectionKey)
export { default as fToast } from './f-toast.vue'
export { makeToast, createToast } from './controller.js'
