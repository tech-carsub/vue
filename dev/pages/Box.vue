<script setup>
import { reactive } from 'vue'
import { fBox, fClickable } from '#components'
import { checkbox, buildCheckboxState } from '#dev-util'

const controls = [
  { name: 'Bleed', checkbox },
  { name: 'Bordered', checkbox },
  { name: 'Clickable', checkbox },
  { name: 'Info', checkbox },
  { name: 'Neutral', checkbox },
]
const state = reactive(buildCheckboxState({ controls, active: 'Bleed' }))
const handleClick = () => alert('Hello Fabric!')
</script>

<template>
  <div>
    <component-title title="Box" />

    <token :state="[state]">
      <f-box :bleed="state.Bleed" :bordered="state.Bordered" :info="state.Info" :neutral="state.Neutral" :class="[!(state.Info || state.Neutral) && 'bg-aqua-300']">
        <h3 v-if="!state.Clickable" class="h4">I am some content</h3>
        <f-clickable v-else @click="handleClick"><h3 class="h4 mb-0">I am some clickable content</h3></f-clickable>
      </f-box>
    </token>
    <demo-controls>
      <demo-control label="Variants" :controls="controls" :state="state" />
    </demo-controls>
  </div>
</template>
