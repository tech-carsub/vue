<script setup>
defineProps({ x: Boolean, y: Boolean })
</script>

<template>
  <div class="controls border border-gray-200 bg-gray-100 mb-24 p-16 rounded-8 overflow-x-scroll" :class="{ 'space-y-24': y, 'space-x-24': x }">
    <slot />
  </div>
</template>
