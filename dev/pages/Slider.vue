<script setup>
import { ref } from 'vue'
import { fSlider, fInput } from '#components'

const largeNumber = ref(3_000_000)
</script>

<template>
  <div>
    <component-title title="Slider" />

    <token :state="largeNumber">
      <f-slider v-model="largeNumber" :min="1000" :max="10_000_000" :step="1000" label="a large number slider" />
    </token>

    <!-- used for testing that outside-model-updates also update the slider value -->
    <!-- <f-slider v-model="largeNumber" :min="1000" :max="10_000_000" :step="1000" label="a large number slider" /> -->
    <!-- <f-input label="Slider value" v-model="largeNumber" /> -->
  </div>
</template>
