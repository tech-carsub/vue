<template>
  <button :class="tabClasses" @click="setActive" role="tab" :id="`fabric-tab-${name}`" :aria-selected="isActive" :aria-controls="isActive ? `fabric-tabpanel-${name}` : undefined" :tabindex="isActive ? 0 : -1" @keydown="onKeydown">
    <span v-if="$slots.default" :class="iconClasses">
      <slot />
    </span>
    <span :class="contentClasses">
      {{ label }}
      <slot name="label" />
    </span>
  </button>
</template>

<script>
import { tab as c } from '@honk-ds/css/component-classes'
import { inject, computed, onBeforeUnmount } from 'vue'

export default {
  name: 'fTab',
  props: {
    label: String,
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const controller = inject('tab-controller')
    const activeTab = inject('activeTab')
    const contained = inject('contained')
    const isActive = computed(() => props.name === activeTab.value)
    const setActive = () => activeTab.value = props.name

    controller.registerTab(props.name)
    onBeforeUnmount(() => {
      controller?.unregisterTab?.(props.name)
    })

    const contentClasses = computed(() => ({
      [c.contentUnderlined]: !contained.value,
      [isActive.value ? c.contentUnderlinedActive : c.contentUnderlinedInactive]: !contained.value,
      [c.contentContainedActive]: contained.value && isActive.value,
    }))

    const iconClasses = computed(() => ({
      [c.icon]: true,
      [c.iconUnderlined]: !contained.value,
      [isActive.value ? c.iconUnderlinedActive : c.iconUnderlinedInactive]: !contained.value
    }))

    const tabClasses = computed(() => ({
      [c.tab]: true,
      [c.tabActive]: isActive.value,
      [c.tabContained]: contained.value,
      [c.tabContainedActive]: contained.value && isActive.value
    }))

    return { isActive, setActive, contentClasses, iconClasses, tabClasses, onKeydown: controller.onKeydown }
  }
}
</script>
