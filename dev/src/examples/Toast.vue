<template>
  <div>
    <setup title="Toast" compName="fToast, makeToast, useToaster" />
    <p class="border-l-8 bg-red-50 border-red-700 p-16 rounded-4 my-16 text-12">The toaster is a singleton that should be installed app-wide as shown above, <code>fToast</code> should only be imported manually for broadcast messages.</p>

    <section-header label="Example" />

    <f-toast class="sm:mt-0" v-bind="toastOptions" text="This is how a toast looks! You can bring in the toast component manually for broadcast messages." :can-close="false" />

    <f-toggle class="mt-32 bg-gray-100 p-16 inline-block rounded-4" radio label="Toast type" :toggles="exampleToasts" v-model="activeExample" />

    <button @click="make" class="mt-32 block button button--utility">Make some toast</button>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-64 mb-16">Props</h4>
    <docs-table>
      <tr>
        <td>text</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>positive</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>warning</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>negative</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>loading</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Animates the toast-icon</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>can-close</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Hides the close-button when false</div>
        </td>
        <td>true</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Programmatic toasting</h4>
    <p class="border-l-8 bg-red-50 border-red-700 p-16 rounded-4 mb-16 text-12">If you know you'll be in a multi-app environment, it's better to use <code>makeToast</code> via either <code>window.fToast.makeToast</code> or <code>useToaster().makeToast</code>.</p>

    <h5>Making toast</h5>
    <p class="text-12 mb-16">The most common usecase is showing a one-off toast that expires after some time. <code>makeToast</code> also returns a Toast <code>ref</code> with the properties described below.</p>
    <show-token :token="makeToastToken" />

    <h5 class="mt-32 mb-16">Toast properties</h5>
    <p class="border-l-8 bg-green-50 border-green-700 p-16 rounded-4 mb-16 text-12">All props above are valid properties as well!</p>
    <docs-table>
      <template #titles>
        <th>name</th>
        <th>notes</th>
        <th>default</th>
      </template>
      <tr>
        <td>duration</td>
        <td class="annotation">The number of ms to show the toast for, or <code>0</code> to disable auto-removal</td>
        <td>2400</td>
      </tr>
      <tr>
        <td>show</td>
        <td class="annotation">A function that shows the toast and sets the timer to start</td>
        <td></td>
      </tr>
      <tr>
        <td>hide</td>
        <td class="annotation">A function that hides the toast and clears any timers</td>
        <td></td>
      </tr>
      <tr>
        <td>onClose</td>
        <td class="annotation">The function called when the close button is pressed</td>
        <td>hide</td>
      </tr>
    </docs-table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { fToggle } from '@fabric-ds/vue-forms'
import { fToast, makeToast } from '@fabric-ds/vue-toast'

const sleep = n => new Promise(r => setTimeout(r, n))
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const activeExample = ref('positive')
const exampleToasts = [
  { label: 'Positive', value: 'positive' },
  { label: 'Warning', value: 'warning' },
  { label: 'Negative', value: 'negative' },
  { label: 'Neutral', value: 'neutral' }
]
const toastOptions = computed(() => {
  switch (activeExample.value) {
    case 'positive': return { positive: true }
    case 'negative': return { negative: true }
    case 'warning': return { warning: true }
    case 'neutral': return { neutral: true }
  }
})
const make = async () => {
  const duration = getRandomInt(2000, 4000)
  const toast = makeToast({ text: `Hi! I'm an example toast!`, duration, ...toastOptions.value })
  if (duration > 3750) {
    await sleep(duration / 2)
    toast.value.positive = false
    toast.value.warning = false
    toast.value.neutral = false
    toast.value.negative = true
    toast.value.text = `Whoa, things went bad. I'm outta here!`
  }
}
const token = `<f-toast positive text="This is a toast" />`
const makeToastToken = `makeToast({ positive: true, text: 'Hello' })`
</script>
