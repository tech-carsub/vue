<template>
  <aside :class="c.toasterContainer">
    <div :class="c.toaster">
      <f-expand-transition group>
        <f-toast v-for="t in shownToasts" v-bind="t.value" :key="t.value.key" />
      </f-expand-transition>
    </div>
  </aside>
</template>

<script>
import { toaster as c } from '@fabric-ds/component-classes'
import { shownToasts } from './controller.js'
import fToast from './f-toast.vue'
import { fExpandTransition } from '@fabric-ds/vue-expandable'

export default {
  name: 'fToastController',
  components: { fToast, fExpandTransition },
  setup: () => ({ shownToasts, c })
}
</script>
