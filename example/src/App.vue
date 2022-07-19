<script setup>
import { ref } from 'vue'
import { fButton } from '#components'
import Tokenizer from './Tokenizer.vue'

const foo = ref(false)
</script>

<template>
  <div>
    <button @click="foo = !foo">foo</button>
    <tokenizer :state="[foo]">
      <div class="space-x-8">
        <f-button primary negative :quiet="foo">Hello Fabric</f-button>
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
