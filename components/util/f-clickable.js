import { h } from 'vue'

const uiTarget = h('span', { class: 'inset-0 absolute', ariaHidden: true })

export default {
  name: 'fClickable',
  setup: (_, { slots, attrs }) => () => h(attrs.href ? 'a' : 'button', {
    class: 'focus-ring',
    type: attrs.href ? undefined : (attrs.type || 'button')
  }, [
    uiTarget,
    slots.default()
  ])
}
