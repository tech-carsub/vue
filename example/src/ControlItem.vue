<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: null,
  name: String,
  radio: Boolean,
  checkbox: Boolean
})

const stateLocation = computed(() => props.radio ? 'active' : props.name)
const model = computed({
  get: () => props.state[stateLocation.value],
  set: v => props.state[stateLocation.value] = v
})
const selected = computed(() => props.radio ? model.value === props.name : model.value)
</script>

<template>
  <f-button-group-item :selected="selected">
    <f-clickable label v-bind="$props" v-model="model" :value="name">{{ name }}</f-clickable>
  </f-button-group-item>
</template>
