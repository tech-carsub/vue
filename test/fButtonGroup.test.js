import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { fButtonGroup, fButtonGroupItem, fClickable } from '#components'

describe('button group', () => {
  assert.ok(fButtonGroup.name)
  assert.ok(fButtonGroupItem.name)

  test('works', () => {
    const ButtonGroupFixture = {
      template: `
        <f-button-group outlined>
          <f-button-group-item>
            <f-clickable label href="#/foo">Foo</f-clickable>
          </f-button-group-item>
          <f-button-group-item>
            <f-clickable label href="#/bar">Bar</f-clickable>
          </f-button-group-item>
        </f-button-group>
      `,
      components: { fButtonGroup, fButtonGroupItem, fClickable }
    }
    const wrapper = mount(ButtonGroupFixture)
    const anchor = wrapper.get('a')
    assert.include(anchor.attributes().href, '#/foo')
    assert.equal(anchor.text(), 'Foo')
    const groupItem = wrapper.getComponent(fButtonGroupItem)
    assert.include(groupItem.classes(), 'border-gray-300') // providing the outlined prop succeeded
  })
})
