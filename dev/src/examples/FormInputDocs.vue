<template>
  <section v-once>
    <h4 class="mt-64 mb-16">Props</h4>
    <props-notice />

    <docs-table>
      <tr>
        <td>type</td>
        <td>string</td>
        <td>text</td>
      </tr>
      <tr>
        <td>autocomplete</td>
        <td>string</td>
        <td>off</td>
      </tr>
      <tr>
        <td>mask</td>
        <td>
          <div>object</div>
          <div class="annotation">See the Masking section below for more information</div>
        </td>
        <td></td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Masking</h4>
    <p class="text-14">To use input masking, first <code>provide</code> the default export from the <code>cleave.js</code> package as shown below. Once you've done that, any <a href="https://github.com/nosir/cleave.js/blob/master/doc/options.md">options</a> from Cleave are valid options on the <code>mask</code> prop.</p>
    <show-token :token="cleaveToken" />

  </section>
</template>

<script>
import { PropsNotice } from '../util'

const cleaveToken =
`// in setup, if you only need masking in one component
import { provide } from 'vue'
import Cleave from 'cleave.js'

export default {
  setup() {
    provide('Cleave', Cleave)
  }
}

// or install app-wide by using the provide method on app
app.provide('Cleave', Cleave)`

export default {
  components: { PropsNotice },
  setup: () => ({ cleaveToken })
}
</script>
