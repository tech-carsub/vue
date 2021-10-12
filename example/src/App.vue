<template>
  <div v-if="route.name === 'home'" class="grid lg:grid-cols-3 gap-16">
    <div class="lg:col-span-2">
      <router-view />
    </div>
    <div>
      <f-docs-highlight-box></f-docs-highlight-box>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<style>
.token {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  white-space: pre;
  line-height: 1.8;
}
code {
  color: var(--f-aqua-800);
}
</style>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
