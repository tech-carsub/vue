import { describe, it, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fBreadcrumbs } from '#components'

describe('breadcrumbs', () => {
  assert.ok(fBreadcrumbs.name)

  it('v-for slot children', () => {
    // this is producing a fragment, which is what a v-for would do
    const defaultSlot = [
      `<a href="#/foo">Foo</a>`,
      `<a href="#/bar">Bar</a>`,
      `<span aria-current="page">Baz</span>`
    ]
    const wrapper = mount(fBreadcrumbs, { slots: { default: defaultSlot } })
    const html = wrapper.get('nav')
    assert.include(wrapper.text(), 'Foo/Bar/Baz')
    assert.include(wrapper.html(), 'class="select-none"')
    assert.ok(html.attributes()['aria-label'])
  })
})
