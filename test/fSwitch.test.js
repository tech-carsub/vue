import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fSwitch } from '#components'
import { ref, nextTick } from 'vue'

describe('switch', () => {
  assert.ok(fSwitch.name)

  test('renders', async () => {
    const model = ref(false)
    const SwitchFixture = {
      template: `
        <f-switch v-model="model" id="my-id" />
      `,
      components: { fSwitch },
      setup: () => ({ model })
    }
    const wrapper = mount(SwitchFixture)
    assert.ok(wrapper.get('input').classes().includes('sr-only'))
    assert.equal(wrapper.get('input').attributes('id'), 'my-id')
    assert.notExists(wrapper.get('input').attributes('checked'))
    model.value = true
    await nextTick()
    assert.exists(wrapper.get('input').attributes('checked'))
  })
})
