import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fBreadcrumbs } from '#components'

describe('breadcrumbs', () => {
  assert.ok(fBreadcrumbs.name)

  test('normal', () => {
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
  test('v-for', () => {
    const BreadcrumbFixture = {
      template: `
        <f-breadcrumbs>
          <a v-for="c in crumbs" :href="c.url">{{ c.title }}</a>
        </f-breadcrumbs>
      `,
      components: { fBreadcrumbs },
      setup: () => ({
        crumbs: [
          { title: 'Foo', url: '/hello' },
          { title: 'Bar', url: '/fabric' }
        ]
      })
    }
    const wrapper = mount(BreadcrumbFixture)
    assert.include(wrapper.text(), 'Foo/Bar')
  })
})
