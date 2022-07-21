<template>
  <div>
    <setup title="Switch" compName="fSwitch" />

    <div class="mt-16 space-y-32">
      <f-field label="a switch" #default="{ labelFor }">
        <f-switch v-model="model" :id="labelFor" />
      </f-field>
      <f-field label="a disabled switch" #default="{ labelFor }">
        <f-switch v-model="model" disabled :id="labelFor" />
      </f-field>
    </div>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fField, fSwitch } from '#components'

const token = `<f-field label="a switch" #default="{ labelFor }">
  <f-switch v-model="model" :id="labelFor" />
</f-field>
`

const model = ref(false)
</script>
