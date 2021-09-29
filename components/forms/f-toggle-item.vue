<template>
  <input :id="id" v-model="model" v-bind="$attrs" />
  <label :for="id" v-html="label" />
</template>

<script>
import { id } from '#util'
import { modelProps, createModel } from 'create-v-model'

export default {
  name: 'fToggleItem',
  props: {
    id,
    label: String,
    ...modelProps()
  },
  setup: (props, { emit }) => ({
    model: createModel({ props, emit })
  })
}
</script>
