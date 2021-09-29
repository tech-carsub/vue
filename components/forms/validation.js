import { ref, toRefs, reactive, computed, watch, provide, inject, onBeforeUnmount } from 'vue'

export const defaultValid = { valid: true }
export const defaultInvalid = { valid: false, hint: 'Må fylles ut' }

export function defaultRequiredRule(v) {
  if (v == null) return defaultInvalid // check for null or undefined
  if (typeof v === 'string' && !v.trim()) return defaultInvalid
  if (typeof v === 'number' && (Number.isNaN(v))) return defaultInvalid
  return true
}

const collectionKey = 'validation:collector'
export const useForm = () => inject(collectionKey)

export const createValidationCollector = () => {
  const validationElements = ref([])
  const childrenShouldValidate = ref(false)

  const validate = () => childrenShouldValidate.value = true
  const allChildrenValid = computed(() => validationElements.value.every(e => e.valid))
  const completed = computed(() => validationElements.value.filter(e => e.required).every(e => e.valid))
  const registerValidation = v => {
    v.shouldValidate.value = childrenShouldValidate.value
    validationElements.value.push(v)
  }
  const unregisterValidation = v => {
    const idx = validationElements.value.indexOf(v)
    if (idx !== -1) validationElements.value.splice(idx, 1)
  }

  watch(childrenShouldValidate, () => validationElements.value.forEach(e => e.shouldValidate = childrenShouldValidate.value))

  const collectionAttrs = reactive({ registerValidation, unregisterValidation, validationElements, childrenShouldValidate, allChildrenValid, valid: allChildrenValid, completed, validate })
  provide(collectionKey, collectionAttrs)
  return toRefs(collectionAttrs)
}

export const createValidation = (props) => {
  const shouldValidate = ref(false)
  const triggerValidation = () => {
    shouldValidate.value = true
  }

  const _rules = computed(() => {
    const requiredRule = typeof props.required === 'function' ? props.required : defaultRequiredRule
    if (props.required) return [requiredRule].concat(props.rules || [])
    return props.rules || []
  })
  const validation = computed(() => {
    if (!_rules.value.length) return defaultValid
    let result
    const triggered = _rules.value.some(rule => {
      result = rule(props.modelValue)
      return typeof result === 'object'
    })
    return triggered ? result : defaultValid
  })
  const valid = computed(() => validation.value.valid)
  const validationMsg = computed(() => validation.value.hint)
  const showValidation = computed(() => shouldValidate.value || !!validation.value.always)
  const hasErrorMessage = computed(() => showValidation.value && !validation.value.valid)

  const collector = inject(collectionKey, null)
  if (collector) {
    const validationData = { shouldValidate, valid }
    collector.registerValidation(validationData)
    onBeforeUnmount(() => collector.unregisterValidation(validationData))
  }

  return { triggerValidation, shouldValidate, validation, valid, validationMsg, showValidation, hasErrorMessage, collector }
}
