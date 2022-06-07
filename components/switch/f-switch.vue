<template>
  <div class="tap-highlight-transparent">
    <input type="checkbox" class="sr-only" :id="id" v-model="model" :disabled="disabled" ref="inputEl" />
    <div @click="simulateClick" :class="{ [c.label]: true, [c.labelDisabled]: disabled }">
      <div :class="{
        [c.switchTrack]: true,
        [c.switchTrackSelected]: model && !disabled,
        [c.switchTrackUnselected]: !model && !disabled,
        [c.switchTrackDisabled]: disabled
      }" />
      <div :class="{
        [c.switchThumb]: true,
        [c.switchThumbSelected]: model,
        [disabled ? c.switchThumbDisabled : c.switchThumbNotDisabled]: true
      }" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { switchToggle as c } from '@fabric-ds/css/component-classes'
import { createModel, modelProps } from 'create-v-model'
import { id } from '#util'

export default {
  name: 'fSwitch',
  props: {
    id,
    disabled: Boolean,
    ...modelProps()
  },
  setup(props) {
    const model = createModel({ props })
    const inputEl = ref(null)

    const simulateClick = () => inputEl.value.click()

    return { model, c, inputEl, simulateClick }
  }
}
</script>
