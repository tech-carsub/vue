import { describe, it, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fBox } from '#components'
import { box as boxClasses } from '@honk-ds/css/component-classes'

describe('box', () => {
  assert.ok(fBox.name)

  it('boxes', () => {
    const defaultSlot = '<h1>Hello Fabric</h1>'
    const wrapper = mount(fBox, { slots: { default: defaultSlot } })
    const html = wrapper.get('div')
    assert.equal(wrapper.text(), 'Hello Fabric')
    assert.deepEqual(html.classes(), boxClasses.box.split(' '))
  })
  it('boxes any DOM element', () => {
    const defaultSlot = '<h1>Hello Fabric</h1>'
    const as = 'section'
    const wrapper = mount(fBox, { props: { as }, slots: { default: defaultSlot } })
    const html = wrapper.get(as)
    assert.ok(html.html())
  })
})
