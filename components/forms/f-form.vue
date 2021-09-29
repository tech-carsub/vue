<template>
  <component :is="as">
    <slot />
  </component>
</template>

<script>
import { watchEffect } from 'vue'
import { absentProp } from '#util'
import { modelProps } from 'create-v-model'
import { createValidationCollector } from './validation'

export default {
  name: 'fForm',
  props: {
    as: {
      default: 'form'
    },
    shouldValidate: {
      type: null,
      default: absentProp
    },
    ...modelProps({ modelDefault: absentProp }),
    ...modelProps({ modelName: 'completed', modelDefault: absentProp }),
  },
  setup(props, { emit }) {
    const { allChildrenValid, completed, childrenShouldValidate } = createValidationCollector()
    if (props.modelValue !== absentProp) watchEffect(() => emit('update:modelValue', allChildrenValid.value))
    if (props.completed !== absentProp) watchEffect(() => emit('update:completed', completed.value))
    if (props.shouldValidate !== absentProp) watchEffect(() => childrenShouldValidate.value = props.shouldValidate)
  }
}
</script>
