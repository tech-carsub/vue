<template>
  <div>
    <h4 class="my-16">Validating Elements</h4>

    <p class="text-14">Every form element accepts a prop <code>rules</code> which takes an array of functions. These functions will be run in order until one returns an object. If all functions return <code>true</code> the field is considered valid.</p>
    <show-token :token="ruleToken" />
    <p class="text-12 mt-16 mb-32">The function has one argument, the current value of the form element — and can either return <code>true</code> or an object with attributes described below</p>
    <docs-table>
      <template #titles>
        <th>attribute</th>
        <th>type</th>
      </template>
      <tr>
        <td>valid</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Whether or not to treat the form element as valid</div>
        </td>
      </tr>
      <tr>
        <td>hint</td>
        <td>
          <div>string</div>
          <div class="annotation">The hint to show when this result is triggered</div>
        </td>
      </tr>
      <tr>
        <td>always</td>
        <td>
          <div>boolean</div>
          <div class="annotation">If true, will show the status/hint even if the form element hasn't been touched yet - normally validation is only shown after blur</div>
        </td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Collecting Validation with fForm</h4>

    <p class="text-14 mb-32">The <code>fForm</code> component registers element descendants at any level, and provides the aggregate validation status.</p>

    <docs-table>
      <tr>
        <td>v-model</td>
        <td>
          <div>boolean</div>
          <div class="annotation">True when all descendants are valid</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>v-model:completed</td>
        <td>
          <div>boolean</div>
          <div class="annotation">True when all descendants are completed - passing their <code>required</code> rule</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>should-validate</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Can be used to instruct all descendants to immediately validate. Note that this will not update if the should-validate logic is updated elsewhere.</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>as</td>
        <td>
          <div>string</div>
          <div class="annotation">The DOM element to emit for the wrapper</div>
        </td>
        <td>form</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Programatic validation</h4>
    <p class="text-14">The <code>fField</code> component can provide access to programatic validation beyond what <code>fForm</code>'s props can. For information on which methods are available, see the documentation on Field.</p>
    <show-token :token="fieldControlToken" />

    <h4 class="mt-64 mb-16">Validation and <code>required</code> Form Elements</h4>
    <p class="text-14">If the form element is marked <code>required</code>, <a href="omg">a special rule</a> will be inserted before any user-defined rules.</p>
    <p class="text-14">The <code>required</code> prop can accept a function that will be used as the required-rule</p>

    <h4 class="mt-64 mb-16">Complete Form Example</h4>

    <f-form class="space-y-32 bg-gray-100 p-16 rounded-4">
      <f-input v-model="form1" required label="An input with several hints" :rules="[v => v.trim().length > 4 || { valid: false, hint: 'Must be more than 4 characters!' }]" hint="Enter <strong>more</strong> than 4 characters" />
      <f-toggle checkbox v-model="form2" :toggles="[{ label: 'This must be checked', value: true }]" :required="v => v || { valid: false, hint: 'You must accept the terms!' }" />

      <f-field #control="{ form }">
        <f-button utility label="Submit" @click="handleSubmit(form)" />
      </f-field>
    </f-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fButton, fInput, fSelect, fToggle, fForm, fField, fSuffix } from '#components'

const form1 = ref('')
const form2 = ref('')
const handleSubmit = form => {
  form.validate()
  if (!form.valid) return
  alert('I submitted a thing!')
}
const ruleToken = `[v => v.trim().length > 5 || { valid: false, hint: 'This should be longer' }]`
const fieldControlToken =
`<f-field #control="{ form }">
  <button @click="submit(form)">Submit</button>
</f-field>
`
</script>
