<script setup>
import { useSlots, ref } from 'vue'
import { vModelText, vModelCheckbox, vModelSelect, vModelRadio, vModelDynamic, Text } from 'vue'
import { createAutoBuildingObject, indent, serializeJs, voidElements } from './TokenUtil'
import { getTagName, serializeAndCleanJs, cleanupExpression, useGenerateDirective, useAddAttr } from './GenerateUtil'
import { handleDirectives, handleProps } from './TokenHandlers'

const vModelDirectives = [vModelText, vModelCheckbox, vModelSelect, vModelRadio, vModelDynamic]

function kebabCase(str) {
  return str
    .replace(/_/gu, '-')
    .replace(/\B([A-Z])/gu, '-$1')
    .toLowerCase()
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function camelCase(str) {
  if (isPascalCase(str)) {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }
  return str.replace(/[-_](\w)/gu, (_, c) => (c ? c.toUpperCase() : ''))
}
function isPascalCase(str) {
  return !hasSymbols(str) && !/^[a-z]/u.test(str) && !/-|_|\s/u.test(str)
}
function hasSymbols(str) {
  return /[!"#%&'()*+,./:;<=>?@[\\\]^`{|}]/u.exec(str) // without " ", "$", "-" and "_"
}
function pascalCase(str) {
  return capitalize(camelCase(str))
}

const slots = useSlots()
const resultText = ref('Hi mom')
const updateText = async () => {
  const lines = await generateSourceCode(slots)
  resultText.value = lines.join('\n')
}
updateText()


async function generateSourceCode (_slots) {
  const vnode = _slots.default?.() ?? []
  const list = Array.isArray(vnode) ? vnode : [vnode]
  for (const n in list) {
    const vnode = list[n]
    const result = await printVNode(vnode)
    return result.lines
  }
  // return lines.join('\n')
  // console.log("RESULT", lines.join('\n'))
}
async function printVNode (vnode) {
  if (vnode.type === Text) {
    return { lines: [vnode.children], isText: true }
  }

  const lines = []

  if (typeof vnode.type === 'object' || typeof vnode.type === 'string') {
    // Wait for async component
    if (vnode.type?.__asyncLoader && !vnode.type.__asyncResolved) await vnode.type.__asyncLoader()

    const state = { vnode, attrs: [], skipProps: ['key'], multilineAttrs: false }

    // Directives
    handleDirectives(state)
    handleProps(state)

    // See TODO below
    // if (state.attrs.length > 1) state.multilineAttrs = true

    // Tags
    const tagName = getTagName(vnode)

    // Children
    let isChildText = false
    const childLines = []
    if (typeof vnode.children === 'string') {
      if (tagName === 'pre') {
        childLines.push(vnode.children)
      } else {
        childLines.push(...vnode.children.split('\n'))
      }
      isChildText = true
    } else if (Array.isArray(vnode.children)) {
      let isAllChildText
      for (const child of vnode.children) {
        const result = await printVNode(child)
        if (result.isText) {
          if (isAllChildText === undefined) {
            isAllChildText = true
          }
          const text = result.lines[0]
          if (!childLines.length || /^\s/.test(text)) {
            childLines.push(text.trim())
          } else {
            childLines[childLines.length - 1] += text
          }
        } else {
          if (isAllChildText === undefined) {
            isAllChildText = false
          }
          childLines.push(...result.lines)
        }
      }
      if (isAllChildText !== undefined) {
        isChildText = isAllChildText
      }
    }

    // Slots
    if (typeof vnode.children === 'object' && !Array.isArray(vnode.children)) {
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
            childLines.push(`<template #${key}="{ ${slotProps.join(', ')} }">`)
            childLines.push(...indent(slotLines))
            childLines.push('</template>')
          } else if (key === 'default') {
            childLines.push(...slotLines)
          } else {
            childLines.push(`<template #${key}>`)
            childLines.push(...indent(slotLines))
            childLines.push(`</template>`)
          }
        }
      }
    }

    // Template
    const tag = [`<${tagName}`]
    // if (state.multilineAttrs) {
    for (const attrLines of state.attrs) {
      tag[0] += ` ${attrLines}`
      // TODO: make this behavior switch/configurable
      // This makes the attrs multiple lines - old behavior
      // tag.push(...indent(attrLines))
    }
    if (childLines.length > 0) {
      tag[0] += `>`
      // tag.push('>')
    }
    // } else {
    //   if (state.attrs.length === 1) {
    //     tag[0] += ` ${state.attrs[0]}`
    //   }
    //   if (childLines.length > 0) {
    //     tag[0] += '>'
    //   }
    // }

    const isVoid = voidElements.includes(tagName.toLowerCase())
    if (childLines.length > 0) {
      if (childLines.length === 1 && tag.length === 1 && !state.attrs.length && isChildText) {
        lines.push(`${tag[0]}${childLines[0]}</${tagName}>`)
      } else {
        lines.push(...tag)
        lines.push(...indent(childLines))
        lines.push(`</${tagName}>`)
      }
    } else if (tag.length > 1) {
      lines.push(...tag)
      lines.push(isVoid ? '>' : '/>')
    } else {
      lines.push(`${tag[0]}${isVoid ? '' : ' /'}>`)
    }
  } else if (vnode?.shapeFlag & 1 << 4) {
    for (const child of vnode.children) {
      lines.push(...(await printVNode(child)).lines)
    }
  }

  return { lines }
}
</script>

<template>
  <slot />
  <pre><code>{{ resultText }}</code></pre>
</template>
