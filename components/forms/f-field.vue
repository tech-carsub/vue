<template>
  <component :is="as" class="field" :class="{ 'is-invalid': hasErrorMessage, 'is-disabled': disabled, [$attrs.class || '']: true }" :role="role" v-bind="wrapperAria">
    <component :is="labelType" v-if="label" class="field-label" :id="labelId" :for="labelFor" :role="valueOrUndefined(labelLevel, 'heading')" :aria-level="valueOrUndefined(labelLevel, labelLevel)">{{ label }}<span v-if="optional" class="pl-8 font-normal text-14 text-gray-500"> (valgfritt)</span></component>
    <slot :triggerValidation="triggerValidation" :labelFor="id" :labelId="labelId" :aria="aria" />
    <slot name="control" :form="collector" />
    <div class="field-hint" v-if="hint || hasErrorMessage">
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
  labelLevel: Number,
  rules: {
    type: Array,
    default: () => ([])
  },
  ...modelProps(),
}

const valueOrUndefined = (test, value) => test ? value : undefined

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
  setup(props, { slots }) {

    const { triggerValidation, valid, validationMsg, hasErrorMessage, collector } = createValidation(props)

    const isFieldset = computed(() => props.as === 'fieldset')
    const labelType = computed(() => isFieldset.value ? 'legend' : 'label')
    const labelFor = computed(() => isFieldset.value ? undefined : props.id)
    const labelId = computed(() => (props.label || slots.label) && (props.id + ':label'))
    const hintId = computed(() => props.id + ':hint')
    const errorId = computed(() => valueOrUndefined(hasErrorMessage.value, props.id + ':error'))
    const aria = computed(() => ({
      'aria-labelledby': labelId.value,
      'aria-describedby': valueOrUndefined(props.hint, hintId.value),
      'aria-errormessage': errorId.value,
      'aria-invalid': !valid.value || props.invalid || undefined,
      'aria-required': props.required && true
    }))
    const wrapperAria = computed(() => valueOrUndefined(isFieldset.value, aria.value))

    return { triggerValidation, validationMsg, hasErrorMessage, labelType, labelFor, labelId, hintId, errorId, aria, wrapperAria, collector, valueOrUndefined }
  }
}
</script>
