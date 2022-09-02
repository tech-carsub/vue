import { describe, test, assert } from 'vitest'
import { id, absentProp, installer } from '#util'

describe('utilities', () => {
  test('id', () => {
    const generatedId = id.default()
    assert.include(generatedId, 'f-')
    assert.match(generatedId, /f-.+-.+-.+-.+/)
    assert.notEqual(id.default(), id.default())
  })
  test('absentProp', () => {
    assert.equal(typeof absentProp, 'symbol')
  })
  test('installer', () => {
    const components = {}
    const fakeApp = {
      component(name, comp) {
        if (!comp) return components[name]
        components[name] = comp
      }
    }
    const fooComp = { name: 'foo', value: 'bar' }
    const fizzComp = { name: 'fizz', value: 'buzz' }
    installer([fooComp, fizzComp])(fakeApp)
    assert.equal(components.foo, fooComp)
    assert.equal(components.fizz, fizzComp)
    installer([fooComp, fizzComp])(fakeApp)
    assert.equal(Object.keys(components).length, 2)
  })
})
