<script setup>
import { ref, computed, watch } from 'vue'
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
const showLeft = ref(false)
const showModal = ref(false)

const showControl = [
  { onClick: () => showModal.value = true, name: 'Go!', button: true }
]

watch(showModal, (showing) => modalShowing.value = showing)
</script>

<template>
  <div>
    <component-title title="Modal" />

    <token>
      <f-modal title="Hello Fabric!" :style="demoStyles" :left="showLeft" :right="{ 'aria-label': 'Close' }" @dismiss="showModal = false" v-model="showModal" @right="showModal = false">
        <div class="space-x-8">
          <button @click="changeHeight" class="button button--utility button--small mb-32">Modify height</button>
          <button @click="showLeft = !showLeft" class="button button--utility button--small mb-32">Toggle the back-button</button>
        </div>
        <modal-content />
        <template #footer>
          <button class="button button--cta" @click="showModal = false">Click me</button>
        </template>
      </f-modal>
    </token>
    <demo-controls>
      <demo-control label="Show modal" :controls="showControl" />
    </demo-controls>
  </div>
</template>
