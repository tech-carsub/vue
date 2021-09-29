import { inject, watchEffect, onMounted, onBeforeUnmount } from 'vue'

export const setupMask = ({ props, emit, inputEl }) => {
  const Cleave = inject('Cleave', null)
  if (!Cleave) throw "Cleave not provided from Vue app, cannot set up mask"
  let cleave = null
  onMounted(() => {
    const onValueChanged = (e) => emit('update:modelValue', e.target.rawValue)
    cleave = new Cleave(inputEl.value, Object.assign({}, props.mask, { onValueChanged }))
    watchEffect(() => {
      // if values are in sync, don't set them again
      // this can happen when we just updated the value, since we're watching
      if (props.modelValue === cleave.getRawValue()) return
      cleave.setRawValue(props.modelValue)
    })
  })
  onBeforeUnmount(() => {
    cleave.destroy()
    cleave = null
  })
}
