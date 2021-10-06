<template>
  <div>
    <setup title="Button" comp-name="fButton" />

    <section-header label="Example" />

    <div class="space-x-16">
      <f-button primary>Click me!</f-button>
      <f-button secondary>Click me!</f-button>
      <f-button quiet>Click me!</f-button>
      <f-button secondary quiet small>Click me!</f-button>
      <f-button loading>Click me!</f-button>
    </div>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-32 mb-16">Props</h4>
    <docs-table>
      <tr>
        <td>label</td>
        <td>
          <div>string</div>
          <div class="annotation">Interchangable with the default slot for labelling</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>href</td>
        <td>
          <div>string</div>
          <div class="annotation">When set, an anchor tag will be used instead of a button</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>type</td>
        <td>string</td>
        <td>button</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Variants</h4>
    <docs-table>
      <template #titles>
        <th>main</th>
        <th>combinations</th>
      </template>
      <tr>
        <td>primary</td>
        <td>
          <div>negative</div>
          <div>small</div>
        </td>
      </tr>
      <tr>
        <td>secondary</td>
        <td>
          <div>quiet</div>
          <div>small</div>
        </td>
      </tr>
      <tr>
        <td>negative</td>
        <td>
          <div>quiet</div>
          <div>small</div>
        </td>
      </tr>
      <tr>
        <td>link</td>
        <td>
          <div>small</div>
        </td>
      </tr>
      <tr>
        <td>utility</td>
        <td>
          <div>small</div>
        </td>
      </tr>
      <tr>
        <td>pill</td>
        <td></td>
      </tr>
      <tr>
        <td>loading</td>
        <td class="annotation">Can be used with any button type</td>
      </tr>
    </docs-table>
  </div>
</template>

<script setup>
import { fButton } from '#components'
import { ShowToken, SectionHeader } from '../util.js'
import Setup from '../Setup.vue'
import DocsTable from '../DocsTable.vue'

const token = `<f-button primary>Click me!</f-button>`
</script>
