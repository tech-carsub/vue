<template>
  <component :is="as" class="field" :class="{ 'is-invalid': hasErrorMessage, 'is-disabled': disabled, [$attrs.class || '']: true }" :role="role" v-bind="aria">
    <component :is="labelType" v-if="label" class="field-label" :id="labelId" :for="id">{{ label }}<span v-if="optional" class="pl-8 font-normal text-14 text-gray-500"> (valgfritt)</span></component>
    <slot :triggerValidation="triggerValidation" :labelFor="id" :labelId="labelId" />
    <slot name="control" :form="collector" />
    <div class="field-hint">
      <span :id="hintId" v-if="hint" v-html="hint" />
      <span v-if="hint && hasErrorMessage">, </span>
      <span :id="errorId" v-if="hasErrorMessage">{{ validationMsg }}</span>
    </div>
  </component>
</template>

<script>
import { computed } from 'vue'
import { createValidation } from './validation'
import { id } from '#util'
import { modelProps } from 'create-v-model'

export const fieldProps = {
  id,
  label: String,
  role: String,
  invalid: Boolean,
  hint: String,
  optional: Boolean,
  rules: {
    type: Array,
    default: () => ([])
  },
  ...modelProps(),
}

export default {
  name: 'fField',
  inheritAttrs: false,
  props: {
    ...fieldProps,
    as: {
      type: String,
      default: 'div',
    },
    required: [Boolean, Function],
    disabled: Boolean,
  },
  setup(props, { attrs, slots }) {

    const { triggerValidation, valid, validationMsg, hasErrorMessage, collector } = createValidation(props)

    const labelType = computed(() => props.as === 'fieldset' ? 'legend' : 'label')
    const labelId = computed(() => (props.label || slots.label) && (props.id + ':label'))
    const hintId = computed(() => props.id + ':hint')
    const errorId = computed(() => hasErrorMessage.value ? props.id + ':error' : undefined)
    const aria = computed(() => ({
      'aria-labelledby': labelId.value,
      'aria-describedby': props.hint ? hintId.value : undefined,
      'aria-errormessage': errorId.value,
      'aria-invalid': !valid.value || props.invalid || undefined,
      'aria-required': props.required && true
    }))

    return { triggerValidation, validationMsg, hasErrorMessage, labelType, labelId, hintId, errorId, aria, collector }
  }
}
</script>
