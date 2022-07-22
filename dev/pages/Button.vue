<script setup>
import { fButton } from '#components'
import { checkbox, radio, useIsActive } from '#dev-util'
import { reactive } from 'vue'

const variants = reactive({ active: 'Primary' })
const active = useIsActive(variants)
const variantControls = [
  { name: 'Primary', radio },
  { name: 'Secondary', radio },
  { name: 'Link', radio },
  { name: 'Utility', radio },
  { name: 'Pill', radio },
]

const modifiers = reactive({
  Negative: false,
  Quiet: false,
  Small: false,
  Loading: false
})
const modifierControls = [
  { name: 'Negative', checkbox },
  { name: 'Quiet', checkbox },
  { name: 'Small', checkbox },
  { name: 'Loading', checkbox }
]
</script>

<template>
  <div>
    <component-title title="Button" />

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

    <demo-controls>
      <demo-control label="Variants" :controls="variantControls" :state="variants" />
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
