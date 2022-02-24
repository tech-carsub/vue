<template>
  <div :class="arrowClass" :style="arrowStyle" />
</template>

<script>
import { computed } from 'vue'
import { props as attentionProps, opposites, rotation } from './attentionUtil.js'

export default {
  name: 'fAttentionArrow',
  inheritAttrs: false,
  props: {
    ...attentionProps,
    direction: String
  },
  setup: (props) => {
    const arrowDirection = computed(() => opposites[props.direction])
    const arrowClass = computed(() => ({
      ['absolute h-14 w-14 border-2 border-b-0 border-r-0 transform']: true,
      [`-${arrowDirection.value}-8`]: true,
      ['bg-gray-700 border-gray-700']: props.tooltip,
      ['bg-green-100 border-green-400']: props.callout,
      ['bg-white border-white']: props.popover,
    }))
    const arrowStyle = computed(() => ({
      // TW doesn't let us specify exactly one corner, only whole sides
      borderTopLeftRadius: '4px',
      // border alignment is off by a fraction of a pixel, this fixes it
      [`margin-${arrowDirection.value}`]: '-0.5px',
      transform: `rotate(${rotation[arrowDirection.value]}deg)`
    }))

    return { arrowClass, arrowStyle }
  }
}
</script>
