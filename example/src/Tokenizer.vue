<script setup>
import { useSlots, ref, inject, watch } from 'vue'
import { Text } from 'vue'
import { getTagName } from './GenerateUtil'
import { handleDirectives, handleProps, handleChildren, handleSlots, renderTag } from './TokenHandlers'

const props = defineProps({ state: Array })

const highlighter = inject('highlighter')
const slots = useSlots()
const resultText = ref('Hi mom')
const updateText = async () => {
  const lines = await generateSourceCode(slots)
  const code = lines.join('\n')
  const html = highlighter.codeToHtml(code, { lang: 'vue-html' })
  resultText.value = html
}
updateText()

watch(() => props.state, () => {
  console.log("OMG")
  updateText()
})

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
  <div class="my-16 text-14" v-html="resultText" />
</template>

<style>
.shiki {
  padding: 16px;
  border-radius: 8px;
}
</style>
