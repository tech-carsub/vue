<template>
  <component :is="label ? 'div' : 'button'" :class="{ [c.wrapper]: true, [label ? c.wrapperWithIcon : c.wrapperWithLabel]: true }">
    <svg v-if="clear" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z" clip-rule="evenodd"/></svg>
    <svg v-else-if="search" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#nra-cclip0)"><path d="M8.796 11.803A5.684 5.684 0 104.349 1.341a5.684 5.684 0 004.447 10.462zM11 11l4 4"/></g><defs><clipPath id="nra-cclip0"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs></svg>
    <span :class="c.label" v-else-if="label">{{ label }}</span>
  </component>
</template>

<script>
import { suffix as c } from '@fabric-ds/css/component-classes'

export default {
  name: 'fSuffix',
  props: {
    clear: Boolean,
    search: Boolean,
    label: String
  },
  setup: () => ({ c })
}
</script>
