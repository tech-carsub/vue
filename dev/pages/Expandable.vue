<script setup>
import { ref, reactive } from 'vue'
import { checkbox, buildCheckboxState } from '#dev-util'
import { fExpandable } from '#components'

const expanded = ref(false)
const modifierControls = [
  { name: 'Box', checkbox },
  { name: 'Bleed', checkbox },
  { name: 'Info', checkbox },
  { name: 'Animated', checkbox },
]
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }))
</script>

<template>
  <div>
    <component-title title="Expandable" />

    <token :state="[modifiers, expanded]">
      <f-expandable :box="modifiers.Box" :bleed="modifiers.Bleed" :info="modifiers.Info" :animated="modifiers.Animated" :title="`Click to ${expanded ? 'collapse' : 'expand'}`" v-model="expanded">
        <h4>Hello Fabric!</h4>
      </f-expandable>
    </token>

    <demo-controls>
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
