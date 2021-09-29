<template>
  <component :is="as" tabindex="0" role="button" :class="outerClasses">
    <div :class="innerClasses" />
    <slot />
  </component>
</template>

<script>
import { card as c } from '@fabric-ds/component-classes'
import { computed } from 'vue'

export default {
  name: 'fCard',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    selected: Boolean
  },
  setup: (props) => ({
    outerClasses: computed(() => ({
      [c.card]: true,
      [c.cardSelected]: props.selected
    })),
    innerClasses: computed(() => ({
      [c.cardOutline]: true,
      [props.selected ? c.cardOutlineSelected : c.cardOutlineUnselected]: true
    }))
  })
}
</script>
