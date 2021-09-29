<template>
  <div tabindex="-1" role="tabpanel" :id="`fabric-tabpanel-${name}`" :aria-labelledby="`fabric-tab-${name}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'fTabPanel',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
