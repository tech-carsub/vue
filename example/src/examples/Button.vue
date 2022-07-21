<script setup>
import { fButton } from '#components'
import Control, { checkbox, radio, useIsActive } from '../Control.vue'
import { reactive } from 'vue'

const variants = reactive({ active: 'Primary' })

const modifiers = reactive({
  Quiet: false,
  Small: false
})

const variantControls = [
  { name: 'Primary', radio },
  { name: 'Secondary', radio },
  { name: 'Link', radio },
  { name: 'Utility', radio },
  { name: 'Pill', radio },
]
const active = useIsActive(variants)

const modifierControls = [
  { name: 'Negative', checkbox },
  { name: 'Quiet', checkbox },
  { name: 'Small', checkbox },
  { name: 'Loading', checkbox }
]
</script>

<template>
  <div>
    <h1 class="mb-64">Button</h1>

    <token :state="[variants, modifiers]">
      <f-button
        :primary="active('Primary')"
        :secondary="active('Secondary')"
        :negative="modifiers.Negative"
        :link="active('Link')"
        :utility="active('Utility')"
        :pill="active('Pill')"
        :quiet="modifiers.Quiet"
        :small="modifiers.Small"
        :loading="modifiers.Loading"
        label="Hello Fabric" />
    </token>

    <div class="bg-gray-200 my-16 p-16 rounded-8 space-y-24 overflow-x-scroll">
      <control label="Variants" :controls="variantControls" :state="variants" />
      <control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </div>

  </div>
</template>
