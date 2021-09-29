<template>
  <nav :aria-label="ariaLabel">
    <h2 class="sr-only">{{ ariaLabel }}</h2>
    <div class="flex space-x-8">
      <breadcrumbify>
        <slot />
      </breadcrumbify>
    </div>
  </nav>
</template>

<script>
import { h, Fragment } from 'vue'

const separator = h('span', { ariaHidden: true, class: 'select-none' }, '/')
// from https://stackoverflow.com/a/55387306/966362
const interleave = (slot, el) => {
  // check if the default slot is using v-for or just normal elements
  const arr = slot[0].type === Fragment ? slot[0].children : slot
  return [].concat(...arr.map(n => [n, el])).slice(0, -1)
}

const Breadcrumbify = (_, context) => interleave(context.slots.default(), separator)

export default {
  name: 'fBreadcrumbs',
  components: { Breadcrumbify },
  props: {
    ariaLabel: { type: String, default: 'Her er du' }
  }
}
</script>
