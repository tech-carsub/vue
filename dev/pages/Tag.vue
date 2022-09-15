<script setup>
import { reactive } from 'vue'
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
</script>

<template>
  <div>
    <component-title title="Tag" />

    <token :state="[side, color]">
      <f-tag class="text-14" primary :left="side.Left" :right="side.Right" :info="activeColor('Info')" :success="activeColor('Success')" :warning="activeColor('Warning')" :error="activeColor('Error')" :disabled="activeColor('Disabled')" :sponsored="activeColor('Sponsored')">
        Hello Fabric
      </f-tag>
    </token>
    <demo-controls y>
      <demo-control label="Side modifiers" :controls="sideControls" :state="side" />
      <demo-control label="Color variants" :controls="colorControls" :state="color" />
    </demo-controls>
  </div>
</template>
