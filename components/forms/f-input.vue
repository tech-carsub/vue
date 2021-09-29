<template>
  <f-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }" :class="{ 'has-suffix': $slots.suffix }">
    <div class="input">
      <input v-if="mask" v-bind="{ ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type">
      <input v-else      v-bind="{ ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type" v-model="model">
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </f-field>
</template>

<script>
import { ref, computed } from 'vue'
import { createModel } from 'create-v-model'
import { setupMask } from './f-input-mask.js'
import { default as fField, fieldProps } from './f-field.vue'

export default {
  name: 'fInput',
  components: { fField },
  inheritAttrs: false,
  props: {
    ...fieldProps,
    type: {
      type: String,
      default: 'text'
    },
    autocomplete: { type: String, default: 'off' },
    mask: Object,
  },
  setup(props, { emit, attrs }) {
    const model = createModel({ props, emit })
    const inputEl = ref(null)
    if (props.mask) setupMask({ props, emit, inputEl })
    return { model, inputEl }
  }
}
</script>
