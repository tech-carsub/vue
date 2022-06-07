<template>
  <component :is="as" :class="outerClasses">
    <div v-if="!flat" :class="innerClasses" />
    <slot />
  </component>
</template>

<script>
import { card as c } from '@fabric-ds/css/component-classes'
import { computed } from 'vue'

export default {
  name: 'fCard',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    selected: Boolean,
    flat: Boolean
  },
  setup: (props) => ({
    outerClasses: computed(() => ({
      [c.card]: true,
      [c.cardShadow]: !props.flat,
      [c.cardSelected]: props.selected,
      [c.cardFlat]: props.flat,
      [props.selected ? c.cardFlatSelected : c.cardFlatUnselected]: props.flat
    })),
    innerClasses: computed(() => ({
      [c.cardOutline]: true,
      [props.selected ? c.cardOutlineSelected : c.cardOutlineUnselected]: true
    }))
  })
}
</script>
