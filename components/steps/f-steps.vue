<template>
  <div class="w-full" :class="{ 'flex': horizontal }">
    <slot />
  </div>
</template>

<script>
import { ref, provide, watchEffect } from 'vue'

export default {
  name: 'fSteps',
  props: {
    horizontal: Boolean,
    right: Boolean
  },
  setup(props) {
    const vertical = ref(!props.horizontal)
    const left = ref(!props.right)
    provide('steps-vertical', vertical)
    provide('steps-left', left)
    watchEffect(() => vertical.value = !props.horizontal)
    watchEffect(() => left.value = !props.right)
  }
}
</script>
