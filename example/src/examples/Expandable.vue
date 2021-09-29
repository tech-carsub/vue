<template>
  <div>
    <setup title="Expandable" pkg-name="@fabric-ds/vue-expandable" compName="fExpandable, fExpandTransition, fWillExpand" />

    <section-header label="Example" />
    <f-expandable v-if="activeExample === 'normal'" :title="`Click to ${expanded ? 'collapse' : 'expand'}`" v-model="expanded">
      <h1>I am content</h1>
    </f-expandable>

    <!-- this is an example of how to set a custom-color box -->
    <f-expandable v-else-if="activeExample === 'box'" box class="bg-red-50" button-class="hover:text-red-700" title="Click to expand">
      <h1>I am content</h1>
    </f-expandable>

    <f-expandable v-else-if="activeExample === 'bleed'" box bleed info title="Click to expand">
      <h1>I am content</h1>
    </f-expandable>

    <f-expandable v-else-if="activeExample === 'animated'" box animated class="bg-green-50" button-class="hover:text-green-700" title="Click to expand">
      <h1>I am content</h1>
    </f-expandable>

    <f-toggle class="mt-32 bg-gray-100 p-16 inline-block rounded-4" no-hint radio label="Expandable type" :toggles="exampleToggles" v-model="activeExample" />

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-64 mb-16">Props</h4>
    <docs-table>
      <tr>
        <td>v-model</td>
        <td>
          <div>boolean</div>
          <div class="annotation">If not provided, the component will use an internal value that starts the expandable 'closed'</div>
        </td>
        <td>false</td>
      </tr>
      <tr>
        <td>as</td>
        <td>
          <div>string</div>
          <div class="annotation">The DOM element to emit for the parent element</div>
        </td>
        <td>div</td>
      </tr>
      <tr>
        <td>title</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>box</td>
        <td>boolean</td>
        <td>false</td>
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
        <td>info</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Will style the box with light blue colors</div>
        </td>
        <td>false</td>
      </tr>
      <tr>
        <td>button-class</td>
        <td>
          <div>string</div>
          <div class="annotation">Classes to be applied to the toggle-element</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>content-class</td>
        <td>
          <div>string</div>
          <div class="annotation">Classes to be applied to the content-element</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>chevron</td>
        <td>boolean</td>
        <td>true</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Events</h4>
    <docs-table>
      <template #titles>
        <th>name</th>
        <th>when</th>
      </template>
      <tr>
        <td>expand</td>
        <td class="annotation">Content inside the expandable has been mounted and can be targeted - will fire after any opening animations are complete</td>
      </tr>
      <tr>
        <td>collapse</td>
        <td class="annotation">Content inside the expandable has been fully torn down or hidden</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Slots</h4>
    <p class="border-l-8 bg-green-50 border-green-700 p-16 rounded-4 mb-16 text-12">The slotted content areas automatically remove margin from the last element to ensure the correct spacing on all sides.</p>
    <docs-table>
      <template #titles>
        <th>name</th>
        <th>notes</th>
      </template>
      <tr>
        <td>title</td>
        <td>Content inside toggle-button - this can be used if more control over styling is needed than the title prop allows. Also receives <code>expanded</code> as a slot-prop for v-model-less use cases.</td>
      </tr>
      <tr>
        <td>default</td>
        <td>Content that should be displayed when expanded</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Animation</h4>
    <p class="border-l-8 bg-red-50 border-red-700 p-16 rounded-4 mb-16 text-12">You should only use this feature under careful supervision of your friendly local UXer.</p>

    <p class="text-12 mt-32 mb-16">The <code>f-expandable</code> component can be animated by using the <code>animated</code> prop.</p>
    <show-token :token="animatedExpandableToken" />

    <p class="text-12 mt-32 mb-16">The <code>fExpandTransition</code> component can wrap one or more <code>fWillExpand</code> components.</p>
    <show-token :token="expandTransitionToken" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ShowToken, VariantHeading, SectionHeader } from '../util.js'
import { fExpandable, fWillExpand, fExpandTransition, fToggle } from '#components'
import Setup from '../Setup.vue'
import DocsTable from '../DocsTable.vue'

const log = () => window.alert('expanded')
const exampleToggles = [
  { label: 'Normal', value: 'normal' },
  { label: 'Box', value: 'box' },
  { label: 'Bleed', value: 'bleed' },
  { label: 'Animated', value: 'animated' }
]
const activeExample = ref('normal')
const expanded = ref(false)
const token =
`<f-expandable v-model="expanded" :title="expanded ? 'Click to expand' : 'I am expanded'">
  <p>Hello there I am some informative content</p>
</f-expandable>`
const animatedExpandableToken =
`<f-expandable title="Click to expand" animated>
  <p>Hello there I am some informative content</p>
</f-expandable>`
const expandTransitionToken =
`<f-expand-transition group>
  <f-will-expand v-if="expanded">Hello</f-will-expand>
  <f-will-expand v-else>Hi</f-will-expand>
</f-expand-transition>`
</script>

