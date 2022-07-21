<template>
  <div>
    <setup title="Box" compName="fBox" />

    <f-box v-if="activeExample === 'bleed'" bleed class="bg-aqua-300">
      <h3 class="h1">I am some content</h3>
    </f-box>
    <f-box v-else-if="activeExample === 'bordered'" as="section" bordered>
      <h3 class="h1">I am some content</h3>
    </f-box>
    <f-box v-else-if="activeExample === 'clickable'" info clickable>
      <h3 class="h1"><f-clickable @click="clickAction" class="font-bold">I am some content</f-clickable></h3>
    </f-box>

    <f-toggle class="mt-32 bg-gray-100 p-16 inline-block rounded-4" no-hint radio label="Box type" :toggles="exampleToggles" v-model="activeExample" />
    <!-- <f-box as="article" clickable class="bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-800 active:text-red-900"> -->
    <!--   <h1 class="group-hover:text-blue-800">I am some content</h1> -->
    <!-- </f-box> -->

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-64 mb-16">Props</h4>
    <docs-table>
      <tr>
        <td>as</td>
        <td>
          <div>string</div>
          <div class="annotation">The DOM element to emit</div>
        </td>
        <td>div</td>
      </tr>
      <tr>
        <td>bleed</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Will make a box full-width on mobile</div>
        </td>
        <td>false</td>
      </tr>
      <tr>
        <td>clickable</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Applies focus and pointer helpers, should be used with other styling to indicate clickability</div>
        </td>
        <td>false</td>
      </tr>
      <tr>
        <td>bordered</td>
        <td>boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>info</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Will style the box with light blue colors</div>
        </td>
        <td>false</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Will style the box with light gray colors</div>
        </td>
        <td>false</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Clickable boxes</h4>
    <p class="text-14">The Box component supplies <code>f-clickable</code> which is a button that will cover the entire box.</p>
    <show-token :token="clickableToken" />

    <h4 class="mt-64 mb-16">Adding utility classes</h4>
    <h5 class="text-gray-500">Styling slotted content</h5>
    <p class="text-14">The box component applies the <span class="token">group</span> utility, so the hover state can be styled using <a href="https://tailwindcss.com/docs/hover-focus-and-other-states#group-hover"><span class="token">group-hover:*</span></a></p>
    <h5 class="mt-16 text-gray-500">Styling clickable boxes</h5>
    <p class="text-14">If creating a custom clickable box - one can use <span class="token">hover:*</span> and <span class="token">active:*</span> to style the respective states.</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { fBox, fClickable, fToggle } from '#components'

const exampleToggles = [
  { label: 'Bleed', value: 'bleed' },
  { label: 'Bordered', value: 'bordered' },
  { label: 'Clickable', value: 'clickable' }
]
const activeExample = ref('bleed')
const clickAction = () => alert(`You clicked me!`)

const token =
`<f-box info>
  <h1>I am some content</h1>
</f-box>`
const clickableToken =
`<f-box>
  <h3 class="h1"><f-clickable @click="clickAction">I am informative content for the click action</f-clickable></h3>
</f-box>`
</script>
