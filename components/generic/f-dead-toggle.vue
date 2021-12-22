<template>
  <div class="input-toggle h-20 w-20 pointer-events-none" aria-hidden="true">
    <f-toggle-item class="hidden" label-class="-mt-2" :type="type" v-bind="$attrs" />
  </div>
</template>

<script>
import fToggleItem from './f-toggle-item.vue'
import { computed } from 'vue'

export default {
  name: 'fDeadToggle',
  components: { fToggleItem },
  props: {
    radio: Boolean,
    checkbox: Boolean,
  },
  setup: (props) => ({
    type: computed(() => props.radio ? 'radio' : 'checkbox')
  })
}
</script>
