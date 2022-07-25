<script setup>
import { fButton } from '#components'
import { checkbox, radio, useIsActive, buildCheckboxState } from '#dev-util'
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

const modifierControls = [
  { name: 'Negative', checkbox },
  { name: 'Quiet', checkbox },
  { name: 'Small', checkbox },
  { name: 'Loading', checkbox }
]
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }))
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

    <demo-controls y>
      <demo-control label="Variants" :controls="variantControls" :state="variants" />
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
