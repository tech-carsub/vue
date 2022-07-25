<script setup>
import { fBreadcrumbs } from '#components'
</script>

<template>
  <div>
    <component-title title="Breadcrumbs" />

    <token>
      <f-breadcrumbs>
        <a href="#/foo">Foo</a>
        <a href="#/bar">Bar</a>
        <span aria-current="page">Baz</span>
      </f-breadcrumbs>
    </token>
  </div>
</template>
