<script setup>
import { reactive, watch } from 'vue'
import { fTag, fExpandable } from '#components'
import { checkbox, radio, useIsActive, buildCheckboxState } from '#dev-util'

const colorControls = [
  { name: 'Info', radio },
  { name: 'Success', radio },
  { name: 'Warning', radio },
  { name: 'Error', radio },
  { name: 'Disabled', radio },
  { name: 'Sponsored', radio },
]
const color = reactive({ active: 'Info' })
const activeColor = useIsActive(color)

const sideControls = [
  { name: 'Left', checkbox },
  { name: 'Right', checkbox },
]
const side = reactive(buildCheckboxState({ controls: sideControls }))

const typeControls = [
  { name: 'Primary', radio },
  { name: 'Secondary', radio },
]
const type = reactive({ active: 'Primary' })
const activeType = useIsActive(type)

watch(() => type.active, (t) => {
  if (t === 'Secondary') {
    side.Left = false
    side.Right = false
    color.active = ''
  }
  if (t === 'Primary') {
    color.active = 'Info'
  }
})
</script>

<template>
  <div>
    <component-title title="Tag" />

    <token :state="[type, side, color]">
      <f-tag class="text-14" :primary="activeType('Primary')" :secondary="activeType('Secondary')" :left="side.Left" :right="side.Right" :info="activeColor('Info')" :success="activeColor('Success')" :warning="activeColor('Warning')" :error="activeColor('Error')" :disabled="activeColor('Disabled')" :sponsored="activeColor('Sponsored')">
        Hello Fabric
      </f-tag>
    </token>
    <demo-controls>
      <demo-control label="Type" :controls="typeControls" :state="type" />
      <f-expandable :model-value="activeType('Primary')" animated>
        <div class="space-y-16 pt-16">
          <demo-control label="Side modifiers" :controls="sideControls" :state="side" />
          <demo-control label="Color variants" :controls="colorControls" :state="color" />
        </div>
      </f-expandable>
    </demo-controls>
  </div>
</template>
