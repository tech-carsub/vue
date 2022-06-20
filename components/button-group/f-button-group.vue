<template>
  <div class="f-button-group inline-flex rounded-4 divide-gray-300 overflow-hidden" :class="classes">
    <slot />
  </div>
</template>

<script>
export default { name: 'fButtonGroup' }
</script>

<script setup>
import { provide, computed, toRef } from 'vue'

const props = defineProps({
  outlined: Boolean,
  raised: Boolean,
  vertical: Boolean
})

provide('outlined', toRef(props, 'outlined'))

const classes = computed(() => ({
  ['border border-gray-300']: props.outlined,
  ['filter drop-shadow-10']: props.raised,
  [props.vertical ? 'divide-y' : 'divide-x']: true,
  ['flex-col']: props.vertical
}))
</script>
