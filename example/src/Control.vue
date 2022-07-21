<script>
export const checkbox = true
export const radio = true
export const useIsActive = (state) => (name) => state.active === name
</script>

<script setup>
import ControlItem from './ControlItem.vue'
defineProps({ state: null, controls: Array, label: String })
</script>

<template>
  <section>
    <h2 class="text-12 font-bold" v-if="label">{{ label }}</h2>
    <f-button-group outlined>
      <control-item v-for="c in controls" v-bind="c" :state="state" />
    </f-button-group>
  </section>
</template>
