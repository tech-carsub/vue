import { describe, it, assert, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { fAttention } from '#components'
import { ref, nextTick } from 'vue'

// I don't known if the workaround with attachTo breaks anything so I'm making sure to cleanup here
afterEach(() => { document.body.innerHTML = '' })

describe('attention', () => {
  assert.ok(fAttention.name)

  it('callout', () => {
    const defaultSlot = '<h5>Hello Fabric</h5>'
    const wrapper = mount(fAttention, {
      props: { callout: true, modelValue: true },
      slots: { default: defaultSlot } })
    assert.include(wrapper.text(), 'Hello Fabric')
    const html = wrapper.get('[data-test="wrapper"]')
    assert.include(html.classes().join(' '), 'bg-green')
  })
  it('show/hide callout', async () => {
    const model = ref(false)
    const CalloutFixture = {
      template: `
        <f-attention callout v-model="model" data-test="comp">
          <h1>OMG WTF BBQ</h1>
        </f-attention>
      `,
      components: { fAttention },
      setup: () => ({ model })
    }
    const wrapper = mount(CalloutFixture, { attachTo: document.body })
    assert.notOk(wrapper.isVisible())
    model.value = true
    await nextTick()
    assert.ok(wrapper.isVisible())
  })
})
