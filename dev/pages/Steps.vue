<script setup>
import { ref, reactive } from 'vue'
import { checkbox, buildCheckboxState } from '#dev-util'
import { fStep, fSteps } from '#components'

const modifierControls = [
  { name: 'Horizontal', checkbox },
  { name: 'Right', checkbox },
]
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }))

const current = ref(1)
const cycle = () => {
  if (current.value < 4) current.value += 1
  else current.value = 1
}

const stepControl = [
  { onClick: cycle, name: 'Go!', button: true }
]
</script>

<template>
  <div>
    <component-title title="Steps" />

    <token :state="[modifiers, current]">
      <f-steps :right="modifiers.Right" :horizontal="modifiers.Horizontal">
        <f-step :active="current === 1" :complete="current > 1">
          <p class="font-bold">Step 1</p>
          <p>Text describing step 1.</p>
        </f-step>
        <f-step :active="current === 2" :complete="current > 2">
          <p class="font-bold">Step 2</p>
          <p>Something amazing probably happens during step 2.</p>
        </f-step>
        <f-step :active="current === 3" :complete="current > 3">
          <p class="font-bold">Step 3</p>
          <p>There is no step 3.</p>
        </f-step>
      </f-steps>
    </token>
    <demo-controls x class="flex items-center">
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
      <demo-control label="Complete step" :controls="stepControl" />
    </demo-controls>
  </div>
</template>
