<script setup>
import { fBox, fClickable } from '#components'
</script>

<template>
  <div>
    <component-title title="Box" />

    <token class="py-24">
      <f-box bleed class="bg-aqua-300">
        <h3 class="h4">I am some content</h3>
      </f-box>
    </token>
    <!-- <f-box v-else-if="activeExample === 'bordered'" as="section" bordered>
      <h3 class="h1">I am some content</h3>
    </f-box>
    <f-box v-else-if="activeExample === 'clickable'" info clickable>
      <h3 class="h1"><f-clickable @click="clickAction" class="font-bold">I am some content</f-clickable></h3>
    </f-box> -->
  </div>
</template>
