<template>
  <div>
    <setup title="Breadcrumbs" compName="fBreadcrumbs" />

    <f-breadcrumbs>
      <a href="#/foo">Foo</a>
      <a href="#/bar">Bar</a>
      <span aria-current="page">Baz</span>
    </f-breadcrumbs>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-32 mb-16">Props</h4>
    <docs-table>
      <tr>
        <td>aria-label</td>
        <td>
          <div>string</div>
          <div class="annotation">Breadcrumbs should have a label that identifies the structure as a breadcrumb trail to screen readers</div>
        </td>
        <td>Her er du</td>
      </tr>
    </docs-table>
  </div>
</template>

<script setup>
import { fBreadcrumbs } from '#components'

const token =
`<f-breadcrumbs>
  <a href="#/omg">OMG</a>
  <a href="#/wtf">WTF</a>
  <span aria-current="page">BBQ</span>
</f-breadcrumbs>`
</script>

