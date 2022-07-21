<template>
  <div>
    <setup title="ButtonGroup" comp-name="fButtonGroup, fButtonGroupItem" />

    <h5 class="mb-16">Button group with buttons</h5>

    <f-button-group :outlined="toggleOutline" :raised="toggleRaised" :vertical="toggleVertical">
      <f-button-group-item>
        <f-clickable label @click="alert">Foo</f-clickable>
      </f-button-group-item>
      <f-button-group-item :selected="toggleSelected">
        <f-clickable label @click="alert">Bar</f-clickable>
      </f-button-group-item>
      <f-button-group-item>
        <f-clickable label @click="alert">Baz</f-clickable>
      </f-button-group-item>
    </f-button-group>

    <div class="pt-32 mb-48 flex gap-8" :class="{ '-mt-2': toggleOutline }">
      <f-button utility @click="toggleOutline = !toggleOutline">{{ toggleOutline ? 'Remove' : 'Add' }} outline</f-button>
      <f-button utility @click="toggleRaised = !toggleRaised">{{ toggleRaised ? 'Remove' : 'Add' }} shadow</f-button>
      <f-button utility @click="toggleSelected = !toggleSelected">{{ toggleSelected ? 'Remove' : 'Add' }} selected-UI</f-button>
      <f-button utility @click="toggleVertical = !toggleVertical">Make {{ toggleVertical ? 'horizontal' : 'vertical' }}</f-button>
    </div>

    <h5 class="mv-16">Button group with radios</h5>

    <f-button-group outlined :vertical="toggleVertical">
      <f-button-group-item :selected="radioModel === 'foo'">
        <f-clickable label radio v-model="radioModel" value="foo">Foo</f-clickable>
      </f-button-group-item>
      <f-button-group-item :selected="radioModel === 'bar'">
        <f-clickable label radio v-model="radioModel" value="bar">Bar</f-clickable>
      </f-button-group-item>
    </f-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fButton, fButtonGroup, fButtonGroupItem, fClickable } from '#components'
const toggleOutline = ref(false)
const toggleRaised = ref(false)
const toggleSelected = ref(false)
const toggleVertical = ref(false)
const alert = () => window.alert('Clicked!')
const radioModel = ref('')
</script>
