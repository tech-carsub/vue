<script setup>
import { useSlots, ref } from 'vue'
import { Text } from 'vue'
import { getTagName } from './GenerateUtil'
import { handleDirectives, handleProps, handleChildren, handleSlots, renderTag } from './TokenHandlers'

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
  const resultLines = []
  for (const vnode of list) resultLines.push((await printVNode(vnode)).lines)
  return resultLines.flat(Infinity)
}
async function printVNode (vnode) {
  // bail early if we've hit text
  if (vnode.type === Text) return { lines: [vnode.children], isText: true }

  // state elements are shared by multiple handlers
  const state = {
    vnode,
    tagName: getTagName(vnode),
    attrs: [],
    skipProps: ['key'],
    multilineAttrs: false,
    childLines: [],
    isChildText: false,
    lines: []
  }

  if (typeof vnode.type === 'object' || typeof vnode.type === 'string') {
    // wait for async component before going on
    if (vnode.type?.__asyncLoader && !vnode.type.__asyncResolved) await vnode.type.__asyncLoader()
    handleDirectives(state)
    handleProps(state)
    await handleChildren(state, printVNode)
    await handleSlots(state, printVNode)
    renderTag(state)
  } else if (vnode?.shapeFlag & 1 << 4) {
    for (const child of vnode.children) state.lines.push(...(await printVNode(child)).lines)
  }

  return { lines: state.lines }
}
</script>

<template>
  <slot />
  <pre class="my-16 p-16 bg-gray-100 rounded-8 text-12"><code>{{ resultText }}</code></pre>
</template>
