import { describe, it, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fClickable, fDeadToggle, fExpandTransition, fToggleItem } from '#components'

describe('generics', () => {
  [fClickable, fDeadToggle, fExpandTransition, fToggleItem].forEach(comp => {
    assert.ok(comp.name)
  })

  it('f-clickable - as a button', () => {
    const wrapper = mount(fClickable)
    const html = wrapper.get('button')
    assert.ok(html.html())
    assert.notOk(html.attributes('href'))
  })
  it('f-clickable - as an anchor', () => {
    const wrapper = mount(fClickable, { props: { href: '#' } })
    const html = wrapper.get('a')
    assert.ok(html.html())
    assert.ok(html.attributes('href'))
  })
  it('f-clickable - as a toggle', () => {
    const wrapper = mount(fClickable, {
      slots: { default: 'bar' },
      props: { radio: true },
      attrs: { value: 'foo' }
    })
    const input = wrapper.get('input')
    const label = wrapper.get('label')
    assert.equal(label.text(), 'bar')
    assert.ok(input.html())
    assert.equal(input.attributes('value'), 'foo')
  })
  it('f-dead-toggle', () => {
    const wrapper = mount(fDeadToggle, { props: { radio: true } })
    assert.ok(wrapper.classes().includes('pointer-events-none'))
    assert.equal(wrapper.attributes('aria-hidden'), 'true')
    const inputEl = wrapper.get('input')
    assert.ok(inputEl.exists)
    assert.ok(inputEl.classes().includes('hidden'))
    assert.equal(inputEl.attributes('type'), 'radio')
    assert.ok(wrapper.get('label').exists)
  })
  it('f-toggle-item - label prop', () => {
    const text = 'Hello Fabric'
    const wrapperLabelProp = mount(fToggleItem, {
      props: { label: `<h1>${text}</h1>` },
      attrs: { type: 'checkbox' }
    })
    const wrapperSlot = mount(fToggleItem, {
      slots: { default: `<h1>${text}</h1>` },
      attrs: { type: 'checkbox' }
    })
    ;[wrapperLabelProp, wrapperSlot].forEach(wrapper => {
      assert.equal(wrapper.text(), text)
      assert.include(wrapper.html(), `<h1>${text}</h1>`)
      const labelEl = wrapper.get('label')
      const labelContent = wrapper.get('h1')
      assert.ok(labelEl.exists)
      assert.ok(labelContent.exists)
      assert.equal(wrapper.get('input').attributes('type'), 'checkbox')
    })
  })
})
