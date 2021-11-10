<template>
  <f-toggle-item v-if="radio || checkbox" class="absolute inset-0 h-full w-full appearance-none cursor-pointer focus-ring" :type="type" v-bind="$attrs">
    <slot />
  </f-toggle-item>
  <component v-else class="focus-ring" :is="href ? 'a' : 'button'" :href="href" :type="href ? undefined : ($attrs.type || 'button')">
    <span class="inset-0 absolute" aria-hidden="true" />
    <slot />
  </component>
</template>

<script>
import { fToggleItem } from '#components'
import { computed } from 'vue'

export default {
  components: { fToggleItem },
  props: {
    href: String,
    radio: Boolean,
    checkbox: Boolean
  },
  setup: (props) => ({
    type: computed(() => props.radio ? 'radio' : 'checkbox')
  })
}
</script>
