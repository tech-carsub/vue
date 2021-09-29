<template>
  <f-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div class="input input--textarea mb-0">
      <textarea v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" />
    </div>
  </f-field>
</template>

<script>
import { createModel } from 'create-v-model'
import { default as fField, fieldProps } from './f-field.vue'

export default {
  name: 'fTextarea',
  components: { fField },
  inheritAttrs: false,
  props: fieldProps,
  setup: (props, { emit }) => ({
    model: createModel({ props, emit })
  })
}
</script>
