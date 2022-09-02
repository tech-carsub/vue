import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { createValidationCollector, createValidation, defaultInvalid } from '#components'
import { reactive, nextTick } from 'vue'

const invalidHint = 'invalid'
const lessThanTen = v => v < 10 || { valid: false, hint: invalidHint }
const _Fixture = (setup) => ({ template: '<slot />', setup })

describe('validation', () => {
  test('valid', () => {
    mount(_Fixture(() => {
      const valid = createValidation({})
      assert.ok(valid.valid.value)
    }))
  })
  test('invalid', () => {
    mount(_Fixture(() => {
      const invalid = createValidation({
        rules: [() => ({ valid: false, hint: invalidHint })]
      })
      const invalidWithModel = createValidation({ modelValue: 10, rules: [lessThanTen] })
      assert.notOk(invalid.valid.value)
      assert.equal(invalid.validationMsg.value, invalidHint)
      assert.notOk(invalidWithModel.valid.value)
      assert.equal(invalidWithModel.validationMsg.value, invalidHint)
    }))
  })

  test('dynamic', () => {
    mount(_Fixture(() => {
      const props = reactive({ modelValue: 10, rules: [lessThanTen] })
      const element = createValidation(props)
      assert.notOk(element.valid.value)
      props.modelValue = 0
      assert.ok(element.valid.value)
    }))
  })

  test('display states', () => {
    mount(_Fixture(() => {
      const props = reactive({ modelValue: 10, rules: [lessThanTen] })
      const element = createValidation(props)
      assert.notOk(element.valid.value)
      assert.notOk(element.showValidation.value)
      assert.notOk(element.hasErrorMessage.value)
      element.triggerValidation()
      assert.notOk(element.valid.value)
      assert.ok(element.showValidation.value)
      assert.ok(element.hasErrorMessage.value)
      props.modelValue = 0
      assert.ok(element.valid.value)
      assert.ok(element.showValidation.value)
      assert.notOk(element.hasErrorMessage.value)
    }))
  })

  test('required-flag', () => {
    mount(_Fixture(() => {
      const props = reactive({ modelValue: null, required: true })
      const element = createValidation(props)
      assert.equal(element.valid.value, defaultInvalid.valid)
      assert.equal(element.valid.value, false)
      assert.equal(element.validation.value.hint, defaultInvalid.hint)
      props.modelValue = 1
      assert.ok(element.valid.value)
      assert.equal(element.validation.value.hint, undefined)
    }))
  })

  test('validation - required-function', () => {
    mount(_Fixture(() => {
      const props = reactive({ modelValue: 10, required: lessThanTen })
      const element = createValidation(props)
      assert.notOk(element.valid.value)
      assert.equal(element.validation.value.hint, invalidHint)
      props.modelValue = 9
      assert.ok(element.valid.value)
    }))
  })

  test('collector - validate', () => {
    mount(_Fixture(() => {
      const collector = createValidationCollector()
      const propsA = reactive({ modelValue: 10, rules: [lessThanTen] })
      const propsB = reactive({ modelValue: 10, rules: [lessThanTen] })
      const _a = createValidation(propsA)
      const _b = createValidation(propsB)
      collector.registerValidation({ shouldValidate: _a.shouldValidate, valid: _a.valid })
      collector.registerValidation({ shouldValidate: _b.shouldValidate, valid: _b.valid })
      assert.notOk(collector.allChildrenValid.value)
      assert.notOk(_a.valid.value)
      assert.notOk(_a.hasErrorMessage.value)
      assert.notOk(_b.hasErrorMessage.value)
      collector.validate()
      nextTick().then(() => {
        assert.notOk(_a.valid.value)
        assert.ok(_a.hasErrorMessage.value)
        assert.ok(_b.hasErrorMessage.value)
      })
    }))
  })

  test('collector - sets shouldValidate on registration', async () => {
    mount(_Fixture(() => {
      const collector = createValidationCollector()
      const propsA = reactive({ modelValue: 10, rules: [lessThanTen] })
      const _a = createValidation(propsA)
      collector.validate()
      nextTick().then(() => {
        collector.registerValidation({ shouldValidate: _a.shouldValidate, valid: _a.valid })
        assert.notOk(_a.valid.value)
        assert.ok(_a.hasErrorMessage.value)
      })
    }))
  })

  test('collector - registration', async () => {
    mount(_Fixture(() => {
      const collector = createValidationCollector()
      const propsA = reactive({ modelValue: 10, rules: [lessThanTen] })
      const propsB = reactive({ modelValue: 10, rules: [lessThanTen] })
      const _a = createValidation(propsA)
      const _b = createValidation(propsB)
      const _aCollection = { shouldValidate: _a.shouldValidate, valid: _a.valid }
      const _bCollection = { shouldValidate: _b.shouldValidate, valid: _b.valid }
      collector.registerValidation(_aCollection)
      collector.registerValidation(_bCollection)
      assert.equal(collector.validationElements.value.length, 2)
      collector.unregisterValidation(_aCollection)
      assert.equal(collector.validationElements.value.length, 1)
    }))
  })
})
