<template>
  <component :is="as" :class="outerClasses">
    <div v-if="!flat" :class="innerClasses" />
    <slot />
  </component>
</template>

<script>
export default { name: 'fCard' }
</script>

<script setup>
import { card as c } from '@fabric-ds/css/component-classes'
import { computed } from 'vue'

const props = defineProps({
  as: { type: String, default: 'div' },
  selected: Boolean,
  flat: Boolean
})

const outerClasses = computed(() => ({
  [c.card]: true,
  [c.cardShadow]: !props.flat,
  [c.cardSelected]: props.selected,
  [c.cardFlat]: props.flat,
  [props.selected ? c.cardFlatSelected : c.cardFlatUnselected]: props.flat
}))
const innerClasses = computed(() => ({
  [c.cardOutline]: true,
  [props.selected ? c.cardOutlineSelected : c.cardOutlineUnselected]: true
}))
</script>
