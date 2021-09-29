<template>
  <router-view />
</template>

<script setup>
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const SidebarLink = (props) =>
  h(
    RouterLink,
    {
      to: props.to,
      class: 'h5 block rounded-4 pl-8 py-8 font-normal text-gray-700',
    },
    () => props.label,
  );
</script>

<style scoped>
.layout {
  padding-left: 240px;
}
@media (max-width: 767px) {
  .layout {
    padding-left: 0;
  }
}
.router-link-active {
  background-color: var(--f-gray-200);
}
.vue-logo {
  height: 24px;
}
@media (min-width: 768px) {
  main {
    max-width: 1080px;
  }
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 240px;
  }
}
</style>

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
