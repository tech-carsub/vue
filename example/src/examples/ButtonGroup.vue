<template>
  <div>
    <f-button-group :outlined="toggleOutline" :raised="toggleRaised">
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
    <div class="mt-32">
      <div><button @click="toggleOutline = !toggleOutline">Toggle outline</button> {{ toggleOutline }}</div>
      <div><button @click="toggleRaised = !toggleRaised">Toggle raised</button> {{ toggleRaised }}</div>
      <div><button @click="toggleSelected = !toggleSelected">Toggle selected</button> {{ toggleSelected }}</div>
    </div>


    <f-button-group outlined>
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
import { fButtonGroup, fButtonGroupItem, fClickable } from '#components'
const toggleOutline = ref(false)
const toggleRaised = ref(false)
const toggleSelected = ref(false)
const alert = () => window.alert('foo')
const radioModel = ref('')
</script>
