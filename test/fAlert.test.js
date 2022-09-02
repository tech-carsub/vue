import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fAlert } from '#components'
import { ref, nextTick } from 'vue'

describe('alert', () => {
  assert.ok(fAlert.name)

  test('alerts', () => {
    const title = 'A test alert'
    const defaultSlot = '<h5>Hello Fabric</h5>'
    const wrapper = mount(fAlert, {
      props: { title, positive: true, modelValue: true },
      slots: { default: defaultSlot } })
    const html = wrapper.get('div[data-test="content"]')
    const wrapperHtml = wrapper.get('div[data-test="wrapper"]')
    const titleHtml = wrapper.get('p')
    assert.equal(titleHtml.text(), title)
    assert.include(html.html(), defaultSlot)
    assert.include(wrapper.html(), '<svg ')
    assert.include(wrapperHtml.classes().join(' '), 'bg-green')
  })
  test('show/hide', async () => {
    const model = ref(false)
    const AlertFixture = {
      template: `
        <f-alert v-model="model" title="Hello">
          <h1>OMG WTF BBQ</h1>
        </f-alert>
      `,
      components: { fAlert },
      setup: () => ({ model })
    }
    const wrapper = mount(AlertFixture)
    assert.notOk(wrapper.find('[data-test="wrapper"]').exists())
    model.value = true
    await nextTick()
    assert.ok(wrapper.find('[data-test="wrapper"]').exists())
  })
})
