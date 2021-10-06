<template>
  <div>
    <setup title="Pill" comp-name="fPill" />
    <section-header label="Example" />
    <div class="flex flex-wrap space-x-8">
      <f-pill label="Example" suggestion />
      <f-pill label="Example" suggestion can-close />
      <f-pill label="Example" />
      <f-pill label="Example" can-close />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fPill } from '#components'

const model = ref(false)
</script>
