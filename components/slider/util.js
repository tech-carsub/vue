import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useDimensions = (sliderLine) => {
  let observer
  const dimensions = ref({})
  // we use boundingClient because other observer attributes don't calculate X offset in a useful way
  const onResize = entries => {
    const { left, width: w } = entries[0].target.getBoundingClientRect()
    dimensions.value = { left, width: w - 24 } // so the thumb can't run off the track to the right because Troika's slider is built 'wrong' UI-wise
  }
  onMounted(() => {
    dimensions.value = sliderLine.value.getBoundingClientRect()
    observer = new ResizeObserver(onResize)
    observer.observe(sliderLine.value)
  })
  onBeforeUnmount(() => {
    observer.disconnect()
  })
  return { dimensions }
}

export const validKeys = Object.freeze({
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  end: 'End',
  home: 'Home',
  pageup: 'PageUp',
  pagedown: 'PageDown'
})

export const validKeyCodes = Object.values(validKeys)

export const eventOptions = { passive: true }

export function roundDecimals(n, decimals = 2) {
  const rounding = decimals ? Math.pow(10, decimals) : 1
  return Math.round(n * rounding) / rounding
}

const isNumber = (e) => Number.isFinite(parseFloat(e))
export const clamp = (v, { min, max }) => isNumber(v) ? Math.min(Math.max(v, min), max) : min
