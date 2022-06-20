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
    assert.notOk(html.attributes().href)
  })
  it('f-clickable - as an anchor', () => {
    const wrapper = mount(fClickable, { props: { href: '#' } })
    const html = wrapper.get('a')
    assert.ok(html.html())
    assert.ok(html.attributes().href)
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
    assert.equal(input.attributes().value, 'foo')
  })
})
