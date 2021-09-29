<template>
  <f-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div class="input mb-0">
      <div class="input--select__wrap">
        <select v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation">
          <slot />
        </select>
      </div>
    </div>
  </f-field>
</template>

<script>
import { createModel } from 'create-v-model'
import { default as fField, fieldProps } from './f-field.vue'

export default {
  name: 'fSelect',
  components: { fField },
  inheritAttrs: false,
  props: fieldProps,
  setup: (props, { emit }) => ({
    model: createModel({ props, emit })
  })
}
</script>
