import { useGenerateDirective, useAddAttr } from './GenerateUtil'
import { createAutoBuildingObject, indent, voidElements } from './TokenUtil'
import { vModelText, vModelCheckbox, vModelSelect, vModelRadio, vModelDynamic } from 'vue'

const vModelDirectives = [vModelText, vModelCheckbox, vModelSelect, vModelRadio, vModelDynamic]

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
        valueCode = result?.[1]
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
  const props = vnode.props
  const addAttr = useAddAttr(state)
  for (const prop in props) {
    if (!state.skipProps.includes(prop)) addAttr(prop, props[prop])
  }
}

export async function handleChildren(state, printVNode) {
  const { vnode } = state
  if (typeof vnode.children === 'string') {
    state.childLines.push(...(state.tagName === 'pre' ? [vnode.children] : vnode.children.split('\n')))
    state.isChildText = true
  } else if (Array.isArray(vnode.children)) {
    let isAllChildText
    for (const child of vnode.children) {
      const result = await printVNode(child)
      if (result.isText) {
        isAllChildText ??= true
        const text = result.lines[0]
        if (!state.childLines.length || /^\s/.test(text)) {
          state.childLines.push(text.trim())
        } else {
          state.childLines[state.childLines.length - 1] += text
        }
      } else {
        isAllChildText ??= false
        state.childLines.push(...result.lines)
      }
    }
    // TODO: see if this 'if' is even needed
    if (isAllChildText !== undefined) state.isChildText = isAllChildText
  }
}

export async function handleSlots(state, printVNode) {
  const { vnode } = state
  if (!(typeof vnode.children === 'object' && !Array.isArray(vnode.children))) return
  for (const key in vnode.children) {
    if (typeof vnode.children[key] === 'function') {
      const autoObject = createAutoBuildingObject(key => `{{ ${key} }}`, (target, p) => {
        // Vue 3
        if (p === '__v_isRef') return () => false
      })
      const children = vnode.children[key](autoObject.proxy)
      const slotLines = []
      for (const child of children) {
        slotLines.push(...(await printVNode(child)).lines)
      }
      const slotProps = Object.keys(autoObject.cache)
      if (slotProps.length) {
        state.childLines.push(`<template #${key}="{ ${slotProps.join(', ')} }">`)
        state.childLines.push(...indent(slotLines))
        state.childLines.push('</template>')
      } else if (key === 'default') {
        state.childLines.push(...slotLines)
      } else {
        state.childLines.push(`<template #${key}>`)
        state.childLines.push(...indent(slotLines))
        state.childLines.push(`</template>`)
      }
    }
  }
}

export function renderTag(state) {
  // See TODO below
  // if (state.attrs.length > 1) state.multilineAttrs = true
  const tag = [`<${state.tagName}`]
  for (const attrLines of state.attrs) {
    tag[0] += ` ${attrLines}`
    // TODO: make this behavior switch/configurable
    // This makes the attrs multiple lines - old behavior
    // if (state.multilineAttrs) {
    // tag.push(...indent(attrLines))
  }
  if (state.childLines.length > 0) {
    tag[0] += `>`
    // if (state.multilineAttrs) {
    // tag.push('>')
  }

  const isVoid = voidElements.includes(state.tagName.toLowerCase())
  if (state.childLines.length > 0) {
    if (state.childLines.length === 1 && tag.length === 1 && !state.attrs.length && state.isChildText) {
      state.lines.push(`${tag[0]}${state.childLines[0]}</${state.tagName}>`)
    } else {
      state.lines.push(...tag)
      state.lines.push(...indent(state.childLines))
      state.lines.push(`</${state.tagName}>`)
    }
  } else if (tag.length > 1) {
    state.lines.push(...tag)
    state.lines.push(isVoid ? '>' : '/>')
  } else {
    state.lines.push(`${tag[0]}${isVoid ? '' : ' /'}>`)
  }
}
