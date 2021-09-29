<template>
  <section v-once>
    <h4 class="mt-64 mb-16">Props</h4>
    <p class="mb-16 text-14">Toggle takes a special prop - <code>toggles</code> - which is an array of objects. Each object must at least have a <code>value</code> and <code>label</code> attribute. Any other attributes will be transferred directly to the individual toggle</p>
    <props-notice />

      <docs-table>
        <tr>
          <td>radio</td>
          <td>boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>checkbox</td>
          <td>boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>radio-button</td>
          <td>boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>equal-width</td>
          <td>
            <div>boolean</div>
            <div class="annotation">Will make each radio-button equal width</div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>small</td>
          <td>
            <div>boolean</div>
            <div class="annotation">Will make radio-buttons small size</div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>toggles</td>
          <td>array</td>
          <td></td>
        </tr>
      </docs-table>
  </section>
</template>

<script>
import { PropsNotice } from '../util.js'

export default {
  components: { PropsNotice }
}
</script>

