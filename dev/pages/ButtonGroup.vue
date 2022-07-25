<script setup>
import { ref, reactive } from 'vue'
import { checkbox, radio, useIsActive, buildCheckboxState } from '#dev-util'
import { fButtonGroup, fButtonGroupItem, fClickable } from '#components'

const radioModel = ref('foo')
const alert = () => window.alert('Hello Fabric!')

const type = reactive({ active: 'Radio' })
const active = useIsActive(type)
const typeControls = [
  { name: 'Radio', radio },
  { name: 'Button', radio },
]

const modifierControls = [
  { name: 'Outlined', checkbox },
  { name: 'Raised', checkbox },
  { name: 'Vertical', checkbox },
]
const modifiers = reactive(buildCheckboxState({ controls: modifierControls }))
</script>

<template>
  <div>
    <component-title title="Button Group" />

    <token :state="[type, radioModel, modifiers]">
      <f-button-group :outlined="modifiers.Outlined" :raised="modifiers.Raised" :vertical="modifiers.Vertical">
        <f-button-group-item :selected="active('Radio') && radioModel === 'foo'">
          <f-clickable v-if="active('Radio')" label radio v-model="radioModel" value="foo">Foo</f-clickable>
          <f-clickable v-else label @click="alert">Foo</f-clickable>
        </f-button-group-item>
        <f-button-group-item :selected="active('Radio') && radioModel === 'bar'">
          <f-clickable v-if="active('Radio')" label radio v-model="radioModel" value="bar">Bar</f-clickable>
          <f-clickable v-else label @click="alert">Bar</f-clickable>
        </f-button-group-item>
        <f-button-group-item :selected="active('Radio') && radioModel === 'baz'">
          <f-clickable v-if="active('Radio')" label radio v-model="radioModel" value="baz">Baz</f-clickable>
          <f-clickable v-else label @click="alert">Baz</f-clickable>
        </f-button-group-item>
      </f-button-group>
    </token>

    <demo-controls y>
      <demo-control label="Type" :controls="typeControls" :state="type" />
      <demo-control label="Modifiers" :controls="modifierControls" :state="modifiers" />
    </demo-controls>
  </div>
</template>
