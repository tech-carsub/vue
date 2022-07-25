<script setup>
import { ref, reactive } from 'vue'
import { radio, useIsActive } from '#dev-util'
import { fAttention, fBox } from '#components'

const target = ref(null)
const showing = ref(false)

const variant = reactive({ active: 'Tooltip' })
const active = useIsActive(variant)
const variantControls = [
  { name: 'Tooltip', radio },
  { name: 'Callout', radio },
]
</script>

<template>
  <div>
    <component-title title="Attention" />

    <token :state="[variant]">
      <div v-if="active('Tooltip')">
        <f-box neutral class="h4" ref="target" @mouseenter="showing = true" @mouseleave="showing = false">Hover over me</f-box>
        <f-attention tooltip bottom :target-el="target?.$el" v-model="showing">
          <p>Hello Fabric!</p>
        </f-attention>
      </div>
      <div class="flex items-center" v-else-if="active('Callout')">
        <f-box neutral class="h4">Don't hover over me</f-box>
        <f-attention callout right class="ml-8">
          <p>Hello Fabric! This thing is new!</p>
        </f-attention>
      </div>
    </token>

    <demo-controls>
      <demo-control label="Variant" :controls="variantControls" :state="variant" />
    </demo-controls>
  </div>
</template>
