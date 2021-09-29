<template>
  <div>
    <setup title="Switch" pkg-name="@fabric-ds/vue-switch" compName="fSwitch" />

    <section-header label="Example" />

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

<script>
import { ref } from 'vue'
import { fField, fSwitch } from '#components'
import Setup from '../Setup.vue'

const token = `<f-field label="a switch" #default="{ labelFor }">
  <f-switch v-model="model" :id="labelFor" />
</f-field>
`

export default {
  components: { fField, fSwitch, Setup },
  setup: () => ({
    token,
    model: ref(false)
  })
}
</script>
