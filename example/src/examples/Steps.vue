<template>
  <div>
    <setup title="Steps" pkg-name="@fabric-ds/vue-steps" compName="fSteps, fStep" />

    <section-header label="Example" />

    <f-steps class="mb-32" :right="right" :horizontal="horizontal">
      <f-step :active="current === 1" :complete="current > 1">
        <p class="font-bold">Step 1</p>
        <p>Some more text describing step 1.</p>
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
    <div class="space-x-8">
      <button class="button button--utility" @click="cycle">Complete a step</button>
      <button class="button button--utility" @click="horizontal = !horizontal">Make the steps {{ horizontal ? 'vertical' : 'horizontal' }}</button>
      <button v-if="!horizontal" class="button button--utility" @click="right = !right">Move the steps to the {{ right ? 'left' : 'right' }}</button>
    </div>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-64 mb-16">Props: fSteps</h4>
    <docs-table>
      <tr>
        <td>horizontal</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>right</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
    </docs-table>
    <h4 class="mt-64 mb-16">Props: fStep</h4>
    <docs-table>
      <tr>
        <td>active</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>completed</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
    </docs-table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { fStep, fSteps } from '#components'
import { ShowToken, SectionHeader } from '../util.js'
import Setup from '../Setup.vue'
import DocsTable from '../DocsTable.vue'

const current = ref(1)
const horizontal = ref(false)
const right = ref(false)
const cycle = () => {
  if (current.value < 4) current.value += 1
  else current.value = 1
}

const token =
`<f-steps>
  <f-step complete>
    <h3>Step 1</h3>
  </f-step>
  <f-step active>
    <h3>Step 2</h3>
  </f-step>
  <f-step>
    <h3>Step 3</h3>
  </f-step>
</f-steps>`
</script>
