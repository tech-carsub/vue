<script setup>
import { reactive } from 'vue'
import { checkbox, buildCheckboxState } from '#dev-util'
import { fPill } from '#components'

const modifierControls = [
  { name: 'Suggestion', checkbox },
  { name: 'Closeable', checkbox },
]
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }))
</script>

<template>
  <div>
    <component-title title="Pill" />

    <token :state="modifiers">
      <f-pill label="Hello Fabric" :suggestion="modifiers.Suggestion" :canClose="modifiers.Closeable" />
    </token>

    <demo-controls>
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
