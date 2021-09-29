<template>
  <div>
    <setup title="Forms" pkg-name="@fabric-ds/vue-forms" compName="fInput, fSelect, fToggle, fForm, fField, fSuffix" />

    <section-header label="Example" />

    <section v-if="activeExample === 'input'">
      <f-input class="mb-16" #suffix="{ inputElement }" label="A required input with a clear button" hint="A hint" required v-model="inputModel">
        <f-suffix clear @click="handleClear(inputElement)" />
      </f-input>

      <f-input v-model.number="numericModel" optional number type="tel" :mask="moneyMask" label="A masked (money) input" :hint="`Model value: <code>${numericModel}</code>`" />
    </section>

    <f-textarea v-else-if="activeExample === 'textarea'" v-model="textareaModel" label="A textarea lies below" />

    <f-select v-else-if="activeExample === 'select'" v-model="selectModel" label="A useful and informative label">
      <option disabled selected value="">Pick something</option>
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
    </f-select>

    <f-toggle v-else-if="activeExample === 'radio'" radio v-model="multiToggleModel" label="A very toggly label" :toggles="toggles" />
    <f-toggle v-else-if="activeExample === 'checkbox'" checkbox v-model="checkboxModel" label="A very toggly label" :toggles="toggles" />
    <div v-else-if="activeExample === 'radio-button'">
      <f-toggle radio-button :equal-width="isJustified" v-model="multiToggleModel" label="A very toggly label" :toggles="toggles" />
      <f-button class="mt-16" small utility @click="isJustified = !isJustified">{{ isJustified ? 'Unjustify' : 'Justify' }}</f-button>
    </div>

    <f-toggle class="mt-32 bg-gray-100 p-16 inline-block rounded-4" no-hint radio label="Form element" :toggles="exampleToggles" v-model="activeExample" />



    <section-header label="Documentation" />

    <div class="text-12 text-gray-400 flex mb-32">
      <div class="flex-1 p-16 pt-0 mb-16 border-b-2 border-gray-200" />
      <tab name="input">Input</tab>
      <tab name="textarea">Select</tab>
      <tab name="select">Select</tab>
      <tab name="toggle">Toggle</tab>
      <tab name="field">Field</tab>
      <div class="flex-1 p-16 pt-0 mb-16 border-b-2 border-gray-200" />
    </div>

    <h4>Token</h4>

    <show-token v-if="activeDocument === 'input'" :token="inputToken" />
    <show-token v-else-if="activeDocument === 'textarea'" :token="textareaToken" />
    <show-token v-else-if="activeDocument === 'select'" :token="selectToken" />
    <show-token v-else-if="activeDocument === 'toggle'" :token="toggleToken" />
    <show-token v-else-if="activeDocument === 'field'" :token="fieldToken" />

    <form-input-docs v-if="activeDocument === 'input'" />
    <section v-else-if="activeDocument === 'textarea'">
      <h4 class="mt-64 mb-16">Props</h4>
      <p class="text-12">All typical HTML5 attributes are valid props for textarea, see Field for additional props.</p>
    </section>
    <section v-else-if="activeDocument === 'select'">
      <h4 class="mt-64 mb-16">Props</h4>
      <p class="text-12">All typical HTML5 attributes are valid props for select, see Field for additional props.</p>
    </section>
    <form-toggle-docs v-else-if="activeDocument === 'toggle'" />
    <form-field-docs v-else-if="activeDocument === 'field'" />

    <section-header label="Validation" />
    <form-validation-docs />
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { PropsNotice } from '../util.js'
import { fInput, fSelect, fTextarea, fToggle, fForm, fField, fSuffix, fButton } from '#components'
import Setup from '../Setup.vue'
import FormToggleDocs from './FormToggleDocs.vue'
import FormFieldDocs from './FormFieldDocs.vue'
import FormInputDocs from './FormInputDocs.vue'
import FormValidationDocs from './FormValidationDocs.vue'

const initialDoc = window.location.hash.replace('#', '') || 'input'
const activeDocument = ref(initialDoc)
const isJustified = ref(false)

const Tab = (props, context) => h('button', {
  class: {
    'capitalize focus-ring font-bold antialias p-16 pt-0 border-b-2 border-gray-200 mb-16': true,
    'border-gray-700 text-gray-700': props.name === activeDocument.value
  },
  onClick: () => activeDocument.value = props.name
}, props.name)

const exampleToggles = [
  { label: 'Input', value: 'input' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Select', value: 'select' },
  { label: 'Radio', value: 'radio' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Radio-button', value: 'radio-button' }
]
const activeExample = ref(initialDoc)

const handleClear = (el) => {
  inputModel.value = ''
  el.focus()
}
const moneyMask = { numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 8, delimiter: ' ' }
const inputModel = ref('I am an input element')
const numericModel = ref('')
const textareaModel = ref('')
const selectModel = ref('')
const multiToggleModel = ref('')
const checkboxModel = ref([])
const toggles = [
  { label: 'One', value: 1, 'data-test': 'toggle:1' },
  { label: 'Two', value: 2, 'data-test': 'toggle:2' },
]
const form1 = ref('')
const form2 = ref('')
const handleSubmit = form => {
  form.validate()
  if (!form.valid) return
  alert('I submitted a thing!')
}

const inputToken = `<f-input label="A label" hint="A hint" v-model="model" />`
const textareaToken = `<f-textarea label="A label" hint="A hint" v-model="model" />`
const selectToken =
`<f-select v-model="model" label="A label">
  <option disabled selected value="">Pick something</option>
  <option value="foo">Foo</option>
</f-select>`
const toggleToken =
`<f-toggle radio v-model="model" label="A label" :toggles="[
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 }
]" />`
const fieldToken =
`<f-field label="I can be anything!" hint="Isn't that neat?">
  <your-custom-element />
<f-field>`
</script>
