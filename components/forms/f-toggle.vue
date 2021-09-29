<template>
  <f-field as="fieldset" v-bind="{ ...$attrs, ...$props }" :role="role" #default="{ triggerValidation }">
    <div :class="wrapperClasses">
      <f-toggle-item v-for="(toggle, i) in toggles"
        v-model="model"
        :type="type"
        :disabled="disabled"
        :name="id + ':toggles'"
        :key="id + i + type"
        v-bind="toggle"
        @blur="triggerValidation" />
    </div>
  </f-field>
</template>

<script>
import { computed } from 'vue'
import { default as fField, fieldProps } from './f-field.vue'
import fToggleItem from './f-toggle-item.vue'
import { createModel } from 'create-v-model'

const hasLabelAndValue = e => ('value' in e) && ('label' in e)

export default {
  name: 'fToggle',
  components: { fField, fToggleItem },
  inheritAttrs: false,
  props: {
    ...fieldProps,
    radio: Boolean,
    checkbox: Boolean,
    radioButton: Boolean,
    equalWidth: Boolean,
    small: Boolean,
    disabled: Boolean,
    toggles: {
      type: Array,
      required: true,
      validator: (v) => v.every(hasLabelAndValue)
    }
  },
  setup: (props, { emit }) => ({
    model: createModel({ props, emit }),
    type: computed(() => (props.radio || props.radioButton) ? 'radio' : 'checkbox'),
    role: computed(() => props.toggles.length > 1 ? ((props.radio || props.radioButton) ? 'radiogroup' : 'group') : undefined),
    wrapperClasses: computed(() => ({
      'input-toggle--is-disabled': props.disabled && !props.radioButton,
      'segment-control': props.radioButton,
      'segment-control--justified': props.equalWidth,
      'segment-control--small': props.small,
      'segment-control--is-disabled': props.disabled && props.radioButton,
      'input-toggle': props.radio || props.checkbox
    })),
    optionsClasses: computed(() => ({
      'flex flex-row segment-control-options': props.radioButton,
    }))
  })
}
</script>
