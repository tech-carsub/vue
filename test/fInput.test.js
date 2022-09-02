import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fInput } from '#components'

describe('input', () => {
  assert.ok(fInput.name)

  test('renders', () => {
    const inputValue = 'Hello Fabric'
    const wrapper = mount(fInput, {
      props: { modelValue: inputValue }
    })
    const inputEl = wrapper.get('input')
    assert.equal(inputEl.element.value, inputValue)
  })
  test('prefix/suffix', () => {
    const wrapper = mount(fInput, {
      slots: {
        prefix: '<h1>Hello</h1>',
        suffix: '<h2>Fabric</h2>'
      }
    })
    const content = wrapper.get('div.input')
    assert.equal(content.text(), 'HelloFabric')
    assert.include(content.html(), '<h1>Hello</h1>')
  })
})

