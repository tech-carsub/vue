<script setup>
import { fButton } from '#components'
import Tokenizer from './Tokenizer.vue'
</script>

<template>
  <div>
    <tokenizer>
      <div class="space-x-8">
        <f-button primary>Hello Fabric</f-button>
        <f-button primary label="Hello Fabric" />
      </div>
    </tokenizer>
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
