<script setup>
import { fExpandable } from '#components'
import { ref } from 'vue'

const props = defineProps({
  title: String,
  startOpen: Boolean
})

const expanded = ref(props.startOpen)
</script>

<template>
  <f-expandable box animated class="not-rounded" v-model="expanded">
    <template #title>
      <h5 class="mb-0">{{ title }}</h5>
    </template>
    <div class="flex flex-col text-14 text-gray-600 space-y-8">
      <slot />
    </div>
  </f-expandable>
</template>

<style scoped>
.not-rounded {
  border-radius: 0 !important;
}
</style>
