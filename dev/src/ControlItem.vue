<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { fButtonGroupItem, fClickable } from '#components'
import { computed } from 'vue'

const props = defineProps({
  state: null,
  name: String,
  radio: Boolean,
  checkbox: Boolean,
  button: Boolean
})

const stateLocation = computed(() => props.radio ? 'active' : props.name)
const model = props.button ? null : computed({
  get: () => props.state[stateLocation.value],
  set: v => props.state[stateLocation.value] = v
})
const selected = props.button ? null : computed(() => props.radio ? model.value === props.name : model.value)
</script>

<template>
  <f-button-group-item :selected="selected">
    <f-clickable v-if="button" label v-bind="$attrs">{{ name }}</f-clickable>
    <f-clickable v-else label v-bind="$props" v-model="model" :value="name">{{ name }}</f-clickable>
  </f-button-group-item>
</template>
