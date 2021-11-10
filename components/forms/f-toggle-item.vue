<template>
  <input :id="id" v-model="model" v-bind="$attrs" />
  <label v-if="label" :for="id" v-html="label" :class="labelClass" />
  <label v-else :for="id" :class="labelClass"><slot /></label>
</template>

<script>
import { id } from '#util'
import { modelProps, createModel } from 'create-v-model'

export default {
  name: 'fToggleItem',
  props: {
    id,
    label: String,
    labelClass: String,
    ...modelProps()
  },
  setup: (props, { emit }) => ({
    model: createModel({ props, emit })
  })
}
</script>
