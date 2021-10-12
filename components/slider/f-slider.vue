<template>
  <div :class="c.wrapper">
    <div :class="{ [c.trackDisabled]: disabled, [c.track]: true }" ref="sliderLine" @click="handleClick" />
    <div :class="{ [c.activeTrackDisabled]: disabled, [c.activeTrack]: true }" :style="sliderActiveStyle" @click="handleClick" />
    <div :class="{ [c.thumbDisabled]: disabled, [c.thumbEnabled]: !disabled, [c.thumb]: true }"
      ref="thumb"
      role="slider"
      tabindex="0"
      v-bind="aria"
      :style="thumbStyles"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeyDown">
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { modelProps, createModel } from 'create-v-model'
import { slider as c } from '@fabric-ds/component-classes'
import { useDimensions } from './util.js'
import { createHandlers } from './handlers.js'

export default {
  name: 'fSlider',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: Number,
    label: String,
    labelledBy: String,
    disabled: Boolean,
    ...modelProps()
  },
  setup(props, { emit }) {
    const sliderLine = ref(null)
    const thumb = ref(null)
    const { dimensions } = useDimensions(sliderLine)
    const sliderPressed = ref(false)
    const v = createModel({ props, emit })
    const position = ref(v.value)

    // step is a computed so we can check if props.step is set or not
    // and only do shiftedChange when set
    const step = computed(() => props.step || 1)
    const shiftedChange = (n) => {
      const r = 1.0 / step.value
      return Math.floor(n * r) / r
    }

    watch(position, () => {
      // prevents shiftedChange when modelValue was set externally
      if (position.value === props.modelValue) return
      const n = props.step ? shiftedChange(position.value) : position.value
      if (v.value === n) return
      v.value = n
    })
    watch(() => props.modelValue, () => {
      if (sliderPressed.value || (position.value === props.modelValue)) return
      position.value = props.modelValue
    })
    const thumbPosition = computed(() => ((position.value - props.min) / (props.max - props.min) * 100))
    const transformValue = computed(() => (thumbPosition.value / 100) * dimensions.value.width) || 0
    const thumbStyles = computed(() => ({
      transform: 'translateX(' + transformValue.value + 'px)',
    }))
    const sliderActiveStyle = computed(() => ({
      left: 0,
      right: (100 - thumbPosition.value) + '%',
    }))
    const aria = computed(() => ({
      'aria-label': props.label,
      'aria-labelledby': props.labelledBy,
      'aria-valuemin': props.min,
      'aria-valuemax': props.max,
      'aria-valuenow': v.value,
      'aria-valuetext': props['aria-valuetext']
    }))

    const { handleKeyDown, handleFocus, handleBlur, handleMouseDown, handleMouseUp, handleClick } = createHandlers({ props, emit, step, position, v, sliderPressed, thumb, dimensions })

    return { c, aria, sliderLine, thumb, sliderActiveStyle, thumbStyles, handleClick, handleBlur, handleFocus, handleKeyDown, handleMouseDown, v }
  }
}
</script>
