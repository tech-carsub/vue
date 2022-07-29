<script setup>
import { ref, computed } from 'vue'
import { fModal } from '#components'
import { modalShowing } from '../src/store.js'
import ModalContent from './helpers/ModalContent.vue'

const heightToggle = ref(false)
const demoStyles = computed(() => ({
  '--f-modal-min-height': heightToggle.value ? '100%' : '64%',
  '--f-modal-max-height': '72%',
  // '--f-modal-height': '100%'
}))
const changeHeight = () => heightToggle.value = !heightToggle.value
const show = ref(false)

const showControl = [
  { onClick: () => modalShowing.value = true, name: 'Go!', button: true }
]
</script>

<template>
  <div>
    <component-title title="Modal" />

    <token>
      <f-modal title="Hello Fabric!" :style="demoStyles" :left="show" :right="{ 'aria-label': 'Close' }" @dismiss="modalShowing = false" v-model="modalShowing" @right="modalShowing = false">
        <div class="space-x-8">
          <button @click="changeHeight" class="button button--utility button--small mb-32">Modify height</button>
          <button @click="show = !show" class="button button--utility button--small mb-32">Toggle the back-button</button>
        </div>
        <modal-content />
        <template #footer>
          <button class="button button--cta" @click="modalShowing = false">Click me</button>
        </template>
      </f-modal>
    </token>
    <demo-controls>
      <demo-control label="Show modal" :controls="showControl" />
    </demo-controls>
  </div>
</template>
