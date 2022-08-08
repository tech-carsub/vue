<script setup>
import Sidebar from './Sidebar.vue'
import Search from './Search.vue'
</script>

<template>
  <div class="has-sidebar mt-32">
    <search />
    <sidebar />
    <main class="page-container">
      <div class="max-w-screen-md mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.has-sidebar {
  padding-left: 320px;
}
@media (max-width: 640px) {
  .has-sidebar {
    padding-left: 0;
    padding-top: 48px;
  }
}
</style>

<style>
.shiki {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  white-space: pre;
  font-size: 14px;
  padding: 16px;
  border-radius: 8px;
  overflow: scroll;
  background-color: var(--f-gray-100) !important;
  border: 1px solid var(--f-gray-200);
  position: relative;
}
.itsy-token {
  padding: 24px 0;
}
@media (max-width: 640px) {
  .shiki {
    font-size: 12px;
  }
  .controls label {
    font-size: 12px;
  }
}
code {
  color: var(--f-aqua-800);
}
</style>
