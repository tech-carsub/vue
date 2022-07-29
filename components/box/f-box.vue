<template>
  <component :is="as" :class="boxClasses">
    <slot />
  </component>
</template>

<script>
export default { name: 'fBox' }
</script>

<script setup>
import { box as c } from '@fabric-ds/css/component-classes'
import { computed } from 'vue'

const props = defineProps({
  bleed: Boolean,
  as: { type: String, default: 'div' },
  clickable: Boolean,
  info: Boolean,
  neutral: Boolean,
  bordered: Boolean
})
const boxClasses = computed(() => ({
  [c.box]: true,
  [c.bleed]: props.bleed,
  'bg-aqua-50': props.info,
  'hover:bg-aqua-100 active:bg-aqua-200': props.info && props.clickable,
  'bg-bluegray-50': props.neutral,
  'hover:bg-bluegray-100 active:bg-bluegray-200': props.neutral && props.clickable,
  'border-2 border-bluegray-300': props.bordered
}))
</script>
