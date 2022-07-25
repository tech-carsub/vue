<template>
  <component :is="as" :class="wrapperClasses" >
    <button v-if="hasTitle" type="button" :aria-expanded="expanded" :class="buttonClasses" @click="expanded = !expanded">
      <slot name="title" :expanded="expanded" />
      <span class="h4" v-if="title">{{ title }}</span>
      <div :class="chevronClasses" v-if="chevron">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.5 5.5L8 11l5.5-5.5"/></svg>
      </div>
    </button>
    <component :is="contentComponent" @expand="emit('expand')" @collapse="emit('collapse')">
      <div v-if="expanded">
        <div :class="contentClasses">
          <slot />
        </div>
      </div>
    </component>
  </component>
</template>

<script>
export default { name: 'fExpandable' }
</script>

<script setup>
import { ref, computed, watch, nextTick, useSlots } from 'vue'
import { modelProps, createModel } from 'create-v-model'
import { absentProp } from '#util'
import { fExpandTransition as expandTransition } from '#generics'
import { expandable as c, box } from '@fabric-ds/css/component-classes'

const props = defineProps({
  title: String,
  box: Boolean,
  bleed: Boolean,
  info: Boolean,
  buttonClass: String,
  contentClass: String,
  chevron: { type: Boolean, default: true },
  as: { type: String, default: 'div' },
  animated: Boolean,
  ...modelProps({ modelDefault: absentProp })
})
const emit = defineEmits(['expand', 'collapse'])
const slots = useSlots()

const expanded = (props.modelValue === absentProp) ? ref(false) : createModel({ props, emit })
const contentComponent = computed(() => props.animated ? expandTransition : 'div')
// fExpandTransition emits its own events and we just bubble them, but for a normal DOM element we need to create them
if (!props.animated) {
  watch(expanded, async (isExpanded) => {
    await nextTick()
    emit(isExpanded ? 'expand' : 'collapse')
  })
}

const hasTitle = computed(() => props.title || slots.title)

const wrapperClasses = computed(() => ({
  [c.expandable]: true,
  [c.expandableInfo]: props.info,
  [c.expandableBox]: props.box,
  [c.expandableBleed]: props.bleed
}))

const buttonClasses = computed(() => ({
  [props.buttonClass || '']: true,
  [c.button]: true,
  [c.buttonBox]: props.box,
  [c.buttonInfo]: props.info
}))

const chevronClasses = computed(() => ({
  [c.chevron]: true,
  [props.box ? c.chevronBox : c.chevronNonBox]: true,
  [c.chevronExpanded]: expanded.value,
}))

const contentClasses = computed(() => ({
  [props.contentClass || '']: true,
  [box.box + (hasTitle.value ? ' pt-0' : '')]: props.box,
}))
</script>
