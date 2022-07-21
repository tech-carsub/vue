<template>
  <div class="max-w-screen-md mx-auto mt-32">
    <router-view />
  </div>
</template>

<style>
.shiki {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  white-space: pre;
  font-size: 14px;
  padding: 16px;
  border-radius: 8px;
  margin: 24px 0;
  overflow: scroll;
  background-color: var(--f-gray-100) !important;
  border: 1px solid var(--f-gray-200);
  position: relative;
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
.page-container {
  background-color: var(--f-gray-50) !important;
}
</style>
