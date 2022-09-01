import { describe, it, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fSelect } from '#components'

describe('select', () => {
  assert.ok(fSelect.name)

  // NOTE: bug in happy-dom + test-utils
  it.todo('renders', () => {
    const wrapper = mount(fSelect, {
      props: { modelValue: 'foo' },
      slots: { default: `
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      ` }
    })
    const selectEl = wrapper.html()
    // assert.equal(selectEl.element.value, '')
  })
})


