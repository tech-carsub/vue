<template>
  <component :is="as" :class="boxClasses">
    <slot />
  </component>
</template>

<script>
import { box as c } from '@fabric-ds/css/component-classes'
import { computed } from 'vue'

export default {
  name: 'fBox',
  props: {
    bleed: Boolean,
    as: {
      type: String,
      default: 'div'
    },
    clickable: Boolean,
    info: Boolean,
    neutral: Boolean,
    bordered: Boolean
  },
  setup: (props) => ({
    boxClasses: computed(() => ({
      [c.box]: true,
      [c.bleed]: props.bleed,
      'bg-aqua-50': props.info,
      'hover:bg-aqua-100 active:bg-aqua-200': props.info && props.clickable,
      'bg-bluegray-100': props.neutral,
      'hover:bg-bluegray-200 active:bg-bluegray-300': props.neutral && props.clickable,
      'border-2 border-bluegray-300': props.bordered
    }))
  })
}
</script>
