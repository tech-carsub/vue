<template>
  <div class="f-expandable">
    <f-expand-transition>
      <div v-if="model" role="alert">
        <div :class="wrapperClass" :style="wrapperStyle" v-if="model" data-test="wrapper" :role="role">
          <div class="flex">
            <div class="w-16 mr-8" style="min-width: 16px;">
              <svg v-if="negative" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 17"> <path fill="#D91F0A" d="M4.1 1.6A2 2 0 0 1 5.5 1h5c.5 0 1 .2 1.4.6L15.4 5c.4.4.6.9.6 1.4v5c0 .5-.2 1-.6 1.4L12 16.4a2 2 0 0 1-1.4.6h-5a2 2 0 0 1-1.4-.6L.6 13a2 2 0 0 1-.6-1.4v-5c0-.5.2-1 .6-1.4L4 1.6Z"/> <path fill="#fff" fill-rule="evenodd" d="M8 4.3c.4 0 .8.3.8.7v5a.8.8 0 0 1-1.6 0V5c0-.4.4-.8.8-.8Z" clip-rule="evenodd"/> <path fill="#fff" d="M8.8 12.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z"/> </svg>
              <svg v-else-if="positive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 17"> <g clip-path="url(#a)"> <circle cx="8" cy="9" r="8" fill="#059E6F" transform="rotate(180 8 9)"/> <path fill="#fff" fill-rule="evenodd" d="M11.5 6c.3.2.3.7 0 1l-4 4.5a.8.8 0 0 1-1 0l-2-2a.8.8 0 0 1 1-1L7 9.9 10.4 6c.3-.3.8-.3 1.1 0Z" clip-rule="evenodd"/> </g> <defs> <clipPath id="a"> <path fill="#fff" d="M0 0h16v16H0z" transform="translate(0 1)"/> </clipPath> </defs> </svg>
              <svg v-else-if="warning" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 17"> <path fill="#D5840B" d="m.2 13 6-11a2.1 2.1 0 0 1 3.6 0l6 11a2 2 0 0 1-1.9 3H2.1a2 2 0 0 1-1.9-3Z"/> <path fill="#fff" fill-rule="evenodd" d="M8 4.3c.4 0 .8.3.8.7v5a.8.8 0 0 1-1.6 0V5c0-.4.4-.8.8-.8Z" clip-rule="evenodd"/> <path fill="#fff" d="M8.8 12.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z"/> </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 17">
                <!-- nb: logic controlling fill -->
                <circle cx="8" cy="9" r="8" :fill="fillVar"/>
                <path fill="#fff" fill-rule="evenodd" d="M7.3 13a.8.8 0 0 0 1.5 0V9a.8.8 0 0 0-1.6 0v4ZM8 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="last-child:mb-0 text-14" data-test="content">
              <p class="font-bold" v-if="title">{{ title }}</p>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </f-expand-transition>
  </div>
</template>

<script>
export default { name: 'fAlert' }
</script>

<script setup>
import { computed } from 'vue'
import { fExpandTransition } from '#generics'
import { createModel, modelProps } from 'create-v-model'
import { colorMap, possibleColorBooleans, colorBooleanProps } from './logic.js'

const props = defineProps({
  title: String,
  role: {
    type: String,
    default: 'alert'
  },
  ...colorBooleanProps,
  ...modelProps(),
})
const emit = defineEmits(['update:modelValue'])
const model = createModel({ props, emit })
const activeColor = computed(() => {
  const activeType = possibleColorBooleans.find(e => props[e])
  return colorMap[activeType]
})
const fillVar = computed(() => `var(--f-${activeColor.value}-600)`)
const wrapperStyle = computed(() => ({ borderLeftColor: fillVar.value }))
const wrapperClass = computed(() => ({
  'border rounded-4 border-l-4 p-16': true,
  [`bg-${activeColor.value}-50 border-${activeColor.value}-300`]: true
}))
</script>
