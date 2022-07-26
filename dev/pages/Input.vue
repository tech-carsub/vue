<script setup>
import { ref } from 'vue'
import { fInput, fAffix } from '#components'

const inputModel = ref('')
const handleClear = (el) => {
  inputModel.value = ''
  el.focus()
}

// const inputModel = ref('')
const numericInputModel = ref('')

const moneyMask = { numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 8, delimiter: ' ' }
</script>

<template>
  <div>
    <component-title title="Input" />

    <token>
      <f-input class="mb-16" #suffix="{ inputElement }" label="A required input with a clear button" hint="A hint" required v-model="inputModel">
        <f-affix suffix clear @click="handleClear(inputElement)" />
      </f-input>
    </token>

    <token>
      <f-input #prefix v-model="inputModel" label="I have a prefix" class="mb-16" input-wrapper-class="w-1/2">
        <f-affix prefix label="+47" />
      </f-input>
    </token>

    <token>
      <f-input v-model.number="numericInputModel" optional number type="text" inputmode="numeric" :mask="moneyMask" label="A masked (money) input" :hint="`Model value: <code>${numericInputModel}</code>`" />
    </token>
  </div>
</template>
