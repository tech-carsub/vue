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
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { modelProps, createModel } from 'create-v-model'
import { slider as c } from '@fabric-ds/css/component-classes'
import { useDimensions, createHandlers } from '@fabric-ds/core/slider'

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
  setup(props, { emit, attrs }) {
    const sliderLine = ref(null)
    const thumb = ref(null)
    const dimensions = ref({})
    const updateDimensions = _v => dimensions.value = _v
    const { mountedHook, unmountedHook } = useDimensions()
    onMounted(() => mountedHook(sliderLine.value, updateDimensions))
    onBeforeUnmount(unmountedHook)
    const sliderPressed = ref(false)
    const v = createModel({ props, emit })
    const position = ref(v.value)

    // step is a computed so we can check if props.step is set or not
    // and only do getShiftedChange when set
    const step = computed(() => props.step || 1)

    const sliderState = {
      get position() { return position.value },
      set position(v) { position.value = v },
      get sliderPressed() { return sliderPressed.value },
      set sliderPressed(v) { sliderPressed.value = v },
      get val() { return v.value },
      set val(_v) { v.value = _v },
      get thumbEl() { return thumb.value },
      get dimensions() { return dimensions.value },
      get step() { return step.value },
      emitFocus(v) { emit('focus', v) },
      emitBlur(v) { emit('blur', v) }
    }
    const { handleKeyDown, handleFocus, handleBlur, handleMouseDown, handleClick, getThumbPosition, getThumbTransform, getShiftedChange } = createHandlers({ props, sliderState })

    const thumbPosition = computed(getThumbPosition)
    const transformValue = computed(getThumbTransform)
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
      'aria-valuetext': attrs['aria-valuetext']
    }))

    watch(position, () => {
      // prevents shiftedChange when modelValue was set externally
      if (position.value === props.modelValue) return
      const n = props.step ? getShiftedChange(position.value) : position.value
      if (v.value === n) return
      v.value = n
    })
    watch(() => props.modelValue, () => {
      if (sliderPressed.value || (position.value === props.modelValue)) return
      position.value = props.modelValue
    })

    return { c, aria, sliderLine, thumb, sliderActiveStyle, thumbStyles, handleClick, handleBlur, handleFocus, handleKeyDown, handleMouseDown, v }
  }
}
</script>
