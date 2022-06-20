<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script>
export default { name: 'fButtonGroupItem' }
</script>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({ selected: Boolean })
const outlined = inject('outlined', false)

const wrapperClass = computed(() => ({
  ['relative last-child:mb-0 hover:bg-gray-50 active:bg-gray-100']: true,
  [outlined.value ? 'border-gray-300' : 'border-transparent']: true,
  [props.selected ? 'bg-gray-200' : 'bg-white']: true,
  ['bg-gray-200 hover:bg-gray-300 active:bg-gray-400']: props.selected
}))
</script>
