import { describe, it, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fExpandable } from '#components'
import { nextTick } from 'vue'

describe('expandable', () => {
  assert.ok(fExpandable.name)

  it('can mount expanded', () => {
    const defaultSlot = '<h1>Hello Fabric</h1>'
    const wrapper = mount(fExpandable, { props: { modelValue: true }, slots: { default: defaultSlot } })
    assert.equal(wrapper.text(), 'Hello Fabric')
  })
  it('has a title area - prop', () => {
    const titleWrapper = mount(fExpandable, { props: { title: 'Hi' } })
    assert.equal(titleWrapper.text(), 'Hi')

    const defaultSlot = '<h1>Mom</h1>'
    const fullWrapper = mount(fExpandable, {
      props: { modelValue: true, title: 'Hi ' },
      slots: { default: defaultSlot }
    })
    assert.equal(fullWrapper.text(), 'Hi Mom')
  })
  it('has a title area - slot', () => {
    const titleSlot = '<h1>Hi </h1>'
    const titleWrapper = mount(fExpandable, { slots: { title: titleSlot } })
    assert.equal(titleWrapper.text(), 'Hi')

    const defaultSlot = '<h1>Mom</h1>'
    const fullWrapper = mount(fExpandable, {
      props: { modelValue: true },
      slots: { default: defaultSlot, title: titleSlot }
    })
    assert.equal(fullWrapper.text(), 'Hi Mom')
  })
  it('has a chevron', () => {
    const wrapper = mount(fExpandable, { props: { title: 'Yay' } })
    assert.include(wrapper.html(), '<svg ')

    const noChevronWrapper = mount(fExpandable, { props: { title: 'Yay', chevron: false } })
    assert.notInclude(noChevronWrapper.html(), '<svg ')
  })
  it('emits events', async () => {
    const wrapper = mount(fExpandable, { props: { title: 'Yay' } })
    wrapper.get('button').trigger('click')
    // we have to wait twice because the event trigger itself is waiting for the DOM!
    await Promise.all([nextTick, nextTick])
    assert.property(wrapper.emitted(), 'expand')

    wrapper.get('button').trigger('click')
    await Promise.all([nextTick, nextTick])
    assert.property(wrapper.emitted(), 'collapse')
  })
})
