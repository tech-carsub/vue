<script setup>
import { ref, reactive, watch } from 'vue'
import { radio, useIsActive } from '#dev-util'
import { fToggle } from '#components'

const toggleModel = ref([])

const toggles = [
  { label: 'One', value: 1, 'data-test': 'toggle:1' },
  { label: 'Two', value: 2, 'data-test': 'toggle:2' },
]

const variants = reactive({ active: 'Checkbox' })
const variantControls = [
  { name: 'Checkbox', radio },
  { name: 'Radio', radio },
]
const active = useIsActive(variants)

const changeToggleModel = () => {
  if (active('Radio')) toggleModel.value = ''
  else toggleModel.value = []
}
watch(() => variants.active, changeToggleModel)
</script>

<template>
  <div>
    <component-title title="Toggle" />

    <token :state="[variants, toggleModel]">
      <f-toggle :radio="active('Radio')" :checkbox="active('Checkbox')" v-model="toggleModel" label="A very toggly label" :toggles="toggles" />
    </token>

    <demo-controls>
      <demo-control label="Variants" :controls="variantControls" :state="variants" />
    </demo-controls>
  </div>
</template>
