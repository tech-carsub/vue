<template>
  <div :class="c.toastWrapper" style="--f-expansion-duration: 0.15s">
    <div v-bind="$attrs" :class="{ [c.toast]: true, [c.toastPositive]: positive, [c.toastWarning]: warning, [c.toastNegative]: negative, [c.toastNeutral]: neutral }">
      <div :class="{ [c.toastIcon]: true, [c.toastIconPositive]: positive, [c.toastIconWarning]: warning, [c.toastIconNegative]: negative, [c.toastIconNeutral]: neutral, [c.toastIconLoading]: loading }">
        <!-- check circle -->
        <svg v-if="positive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.5 9l2 1.5L11 6"/></svg>
        <!-- alert circle -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" class="transition-transform duration-200" :class="{ 'transform rotate-180': neutral }"><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" d="M8 9V4"/><circle cx="8" cy="11.8" r=".8" fill="currentColor"/></svg>
      </div>
      <div :class="c.toastContent">
        <p v-if="text">{{ text }}</p>
        <slot />
      </div>
      <button :class="c.toastClose" v-if="canClose" @click="onClose">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z" clip-rule="evenodd"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
import { toast as c } from '@fabric-ds/component-classes'

export default {
  name: 'fToast',
  inheritAttrs: false,
  props: {
    positive: Boolean,
    warning: Boolean,
    negative: Boolean,
    neutral: Boolean,
    loading: Boolean,
    canClose: {
      type: Boolean,
      default: true
    },
    text: String,
    onClose: Function,
    //
    push: null,
    remove: null,
    show: null
  },
  setup: () => ({ c })
}
</script>
