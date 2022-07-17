import { useGenerateDirective, useAddAttr } from './GenerateUtil'

export function handleDirectives(state) {
  const generateDirective = useGenerateDirective(state)
  const { vnode } = state
  for (const dir of vnode.dirs ?? []) {
    // vModel
    if (vModelDirectives.includes(dir.dir)) {
      const listenerKey = `onUpdate:${dir.arg ?? 'modelValue'}`
      const listener = vnode.props[listenerKey]
      let valueCode = null
      if (listener) {
        state.skipProps.push(listenerKey)
        const listenerSource = listener.toString()
        const result = /\(\$event\) => (.*?) = \$event/.exec(listenerSource)
        if (result) valueCode = result[1]
      }
      generateDirective('model', dir, valueCode)
    } else if (dir.instance._ || dir.instance.$) {
      const target = dir.instance.$ ?? dir.instance._
      let dirName
      for (const directives of [target.directives, target.appContext.directives]) {
        for (const key in directives) {
          if (target.directives[key] === dir.dir) {
            dirName = key
            break
          }
        }
        if (dirName) break
      }
      if (dirName) generateDirective(dirName, dir)
    }
  }
}

export function handleProps(state) {
  const { vnode } = state
  const addAttr = useAddAttr(state)
  for (const prop in vnode.props) {
    // if (skipProps.includes(prop) || (propsOverrides && prop in propsOverrides))
    if (state.skipProps.includes(prop)) continue
    const value = vnode.props[prop]
    addAttr(prop, value)
  }
}
