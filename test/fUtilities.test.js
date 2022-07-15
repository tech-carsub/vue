import { describe, it, assert } from 'vitest'
import { id, absentProp, installer } from '#util'

describe('utilities', () => {
  it('id', () => {
    const generatedId = id.default()
    assert.include(generatedId, 'f-')
    assert.match(generatedId, /f-.+-.+-.+-.+/)
    assert.notEqual(id.default(), id.default())
  })
  it('absentProp', () => {
    assert.equal(typeof absentProp, 'symbol')
  })
  it('installer', () => {
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
