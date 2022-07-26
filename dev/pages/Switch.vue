<script setup>
import { ref } from 'vue'
import { fField, fSwitch } from '#components'

const model = ref(false)
</script>

<template>
  <div>
    <component-title title="Switch" />

    <token :state="model">
      <f-field label="Switch it up!" #default="{ labelFor }">
        <f-switch v-model="model" :id="labelFor" />
      </f-field>
    </token>
  </div>
</template>
