<template>
  <component :is="href ? 'a' : 'button'" :href="href" :class="buttonClass" v-bind="saneDefaults">
    <slot>{{ label }}</slot>
    <span v-if="loading" role="progressbar" aria-valuenow="0" aria-valuetext="Laster..." class="sr-only" />
  </component>
</template>

<script>
export default { name: 'fButton' }
</script>

<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()
const props = defineProps({
  primary: Boolean,
  secondary: Boolean,
  negative: Boolean,
  utility: Boolean,
  quiet: Boolean,
  small: Boolean,
  link: Boolean,
  pill: Boolean,
  loading: Boolean,
  href: String,
  label: String
})
const buttonClass = computed(() => ({
  'button': true,
  // primary buttons
  'button--primary': props.primary && !props.negative,
  'button--destructive': props.primary && props.negative,
  // quiet
  'button--flat': (props.secondary || (!props.negative && !props.utility)) && props.quiet,
  'button--destructive-flat': props.negative && props.quiet,
  'button--utility-flat': props.utility && props.quiet,
  // others
  'button--small': props.small,
  'button--utility': props.utility && !props.quiet,
  'button--link': props.link,
  'button--pill': props.pill,
  'button--in-progress': props.loading,
}))
const saneDefaults = computed(() => ({
  type: props.href ? undefined : (attrs.type || 'button'),
  rel: attrs.target === '_blank' ? (attrs.rel || 'noopener') : undefined
}))
</script>
