<template>
  <div>
    <setup title="Tabs" compName="fTabs, fTab, fTabPanel" />

    <f-tabs v-model="model" :contained="contained">
      <f-tab label="Home" name="home">
        <stars />
      </f-tab>
      <f-tab label="Car" name="car">
        <stars />
      </f-tab>
      <f-tab label="Motorcycle" name="motorcycle">
        <stars />
      </f-tab>
    </f-tabs>
    <div :class="{ 'bg-aqua-50 p-24 last-child:mb-0': contained, 'mb-16': !contained }">
      <f-tab-panel name="home" v-if="model === 'home'"><h3>Welcome home!</h3></f-tab-panel>
      <f-tab-panel name="car" v-if="model === 'car'"><h3>I am a car page</h3></f-tab-panel>
      <f-tab-panel name="motorcycle" v-if="model === 'motorcycle'"><h3>Something something two wheels</h3></f-tab-panel>
    </div>

    <button class="button button--utility mt-32" @click="contained = !contained">Toggle tab style</button>
  </div>
</template>

<script setup>
import { fTabs, fTab, fTabPanel } from '#components'
import { ref, h } from 'vue'

const Stars = h('div', { innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.322 10.1l-.863-.45a.49.49 0 00-.453 0L2.991 10.7a.491.491 0 01-.51-.034.474.474 0 01-.193-.466l.387-2.246a.471.471 0 00-.137-.419L.894 5.944a.472.472 0 01.029-.704.48.48 0 01.24-.106l2.263-.327a.483.483 0 00.364-.262L4.8 2.511a.484.484 0 01.434-.267M17.678 10.1l.863-.451a.49.49 0 01.453 0L21.01 10.7a.491.491 0 00.51-.034.474.474 0 00.193-.466l-.387-2.246a.472.472 0 01.137-.419l1.644-1.595a.471.471 0 00-.028-.704.48.48 0 00-.24-.106l-2.264-.327a.483.483 0 01-.364-.262l-1.01-2.03a.483.483 0 00-.434-.267M3 14h18M3 22h18M3 18h14M11.566 1.017a.486.486 0 01.868 0l1.01 2.034a.483.483 0 00.362.262l2.264.327a.48.48 0 01.39.323.47.47 0 01-.122.487L14.7 6.044a.473.473 0 00-.138.419l.388 2.247a.473.473 0 01-.194.465.487.487 0 01-.509.035l-2.02-1.054a.482.482 0 00-.453 0L9.758 9.21a.487.487 0 01-.673-.24.474.474 0 01-.03-.26l.388-2.247a.473.473 0 00-.138-.419L7.662 4.45a.47.47 0 01.028-.704.481.481 0 01.24-.106l2.264-.327a.483.483 0 00.363-.262l1.01-2.034z"></path></svg>' })

const model = ref('home')
const contained = ref(true)
</script>
