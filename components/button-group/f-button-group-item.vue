<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'fButtonGroupItem',
  props: {
    selected: Boolean
  },
  setup(props) {
    const outlined = inject('outlined', false)
    const raised = inject('raised', false)
    const quiet = inject('quiet', false)

    const wrapperClass = computed(() => ({
      ['relative last-child:mb-0 hover:bg-gray-50 active:bg-gray-100']: true,
      [outlined.value ? 'border-gray-300' : 'border-transparent']: true,
      [props.selected ? 'bg-gray-200' : 'bg-white']: true,
      ['bg-gray-200 hover:bg-gray-300 active:bg-gray-400']: props.selected
    }))

    return { wrapperClass }
  }
}
</script>
