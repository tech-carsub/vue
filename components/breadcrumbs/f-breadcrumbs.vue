<template>
  <nav :aria-label="ariaLabel">
    <h2 class="sr-only">{{ ariaLabel }} </h2>
    <div class="flex space-x-8">
      <breadcrumbify>
        <slot />
      </breadcrumbify>
    </div>
  </nav>
</template>

<script>
import { h, Fragment } from 'vue'
import { interleave } from '@fabric-ds/core/breadcrumbs'

export const fBreadcrumbSeparator = h('span', { ariaHidden: true, class: 'select-none' }, '/')
const isFragment = vnode => vnode.type === Fragment
const collectElements = (vnodes = []) => vnodes?.map(vnode => isFragment(vnode) ? collectElements(vnode.children) : vnode)
const Breadcrumbify = (_, context) => {
  const slot = context.slots.default()
  const vnodes = slot[0].children
  const elements = collectElements(vnodes).flat(Infinity)
  return interleave(elements, fBreadcrumbSeparator)
}

// because most of the logic is in Breadcrumbify
// there's no reason to script-setup this component
export default {
  name: 'fBreadcrumbs',
  components: { Breadcrumbify },
  props: {
    ariaLabel: { type: String, default: 'Her er du' }
  }
}
</script>
