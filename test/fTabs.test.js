import { describe, it, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fTabs, fTab, fTabPanel } from '#components'
import { ref } from 'vue'

describe('tabs', () => {
  [fTabs, fTab, fTabPanel].forEach(comp => {
    assert.ok(comp.name)
  })

  it('renders', async () => {
    const model = ref('foo')
    const TabFixture = {
      template: `
        <f-tabs v-model="model">
          <f-tab label="Foo" name="foo" />
          <f-tab label="Bar" name="bar" />
        </f-tabs>
        <div>
          <f-tab-panel name="foo" v-if="model === 'foo'">
            <h1>OMG</h1>
          </f-tab-panel>
          <f-tab-panel name="bar" v-if="model === 'bar'">
            <h1>BBQ</h1>
          </f-tab-panel>
        </div>
      `,
      components: { fTabs, fTab, fTabPanel },
      setup: () => ({ model })
    }
    const wrapper = mount(TabFixture)
    assert.equal(wrapper.text(), 'Foo Bar OMG')
    const buttons = wrapper.findAll('button')
    assert.equal(buttons.length, 2)
    assert.ok(buttons.some(button => button.attributes('aria-selected') === 'true'))
    assert.ok(buttons.some(button => button.attributes('aria-selected') === 'false'))
    assert.ok(buttons.some(button => button.attributes('tabindex') === '0'))
    assert.ok(buttons.some(button => button.attributes('tabindex') === '-1'))
  })
})
