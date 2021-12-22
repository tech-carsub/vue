<template>
  <div class="f-button-group inline-flex rounded-4 divide-gray-300 overflow-hidden" :class="classes">
    <slot />
  </div>
</template>

<script>
import { provide, computed, toRef } from 'vue'

export default {
  name: 'fButtonGroup',
  props: {
    outlined: Boolean,
    raised: Boolean,
    vertical: Boolean
  },
  setup(props) {
    provide('outlined', toRef(props, 'outlined'))
    provide('raised', toRef(props, 'raised'))
    provide('quiet', toRef(props, 'quiet'))

    const classes = computed(() => ({
      ['border border-gray-300']: props.outlined,
      ['filter drop-shadow-10']: props.raised,
      [props.vertical ? 'divide-y' : 'divide-x']: true,
      ['flex-col']: props.vertical
    }))

    return { classes }
  }
}
</script>
