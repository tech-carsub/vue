<template>
  <nav :class="{ [contained ? c.wrapperContained : c.wrapperUnderlined]: true }">
    <div :class="{ [c.tabContainer]: true, [`grid-cols-${numberOfTabs || slotFallback}`]: true }" ref="tabContainer" role="tablist">
      <slot />
      <span v-if="!contained" :class="c.wunderbar" ref="wunderbar" />
    </div>
  </nav>
</template>

<script>
import { tabs as c } from '@fabric-ds/css/component-classes'
import { provide, computed, ref, toRef, watch, nextTick, onMounted, Fragment } from 'vue'
import { modelProps, createModel } from 'create-v-model'
import debounce from 'femtobounce'
import { useKeydownHandler } from './util'

const useGetActiveTab = (tabContainer) => () => tabContainer.value.querySelector('.active-tab')
const getChildren = slot => slot[0].type === Fragment ? slot[0].children : slot

export default {
  name: 'fTabs',
  props: {
    contained: Boolean,
    ...modelProps()
  },
  setup(props, { slots }) {
    const activeTab = createModel({ props })
    const tabContainer = ref(null)
    const wunderbar = ref(null)
    const tabs = ref([])
    const registerTab = (tab) => tabs.value.push(tab)
    const unregisterTab = (tab) => {
      const idx = tabs.value.indexOf(tab)
      if (idx !== -1) tabs.value.splice(idx, 1)
    }
    const numberOfTabs = computed(() => tabs.value.length)
    // SSR doesn't complete the tab-registry lifecycle before render, so we just count children and use that when numberOfTabs is 0
    const slotFallback = computed(() => getChildren(slots.default()).length)
    const getActiveTab = useGetActiveTab(tabContainer)
    const focusActive = () => getActiveTab()?.focus()
    provide('tab-controller', { registerTab, unregisterTab, onKeydown: useKeydownHandler({ tabs, activeTab, focusActive }) })
    provide('activeTab', activeTab)
    provide('contained', toRef(props, 'contained'))

    const updateWunderbar = async () => {
      if (props.contained) return
      await nextTick()
      try {
        const activeEl = getActiveTab()
        const { left: parentLeft } = tabContainer.value.getBoundingClientRect()
        const { left, width } = activeEl.getBoundingClientRect()
        wunderbar.value.style.left = (left - parentLeft) + 'px'
        wunderbar.value.style.width = width + 'px'
      } catch (err) {
        console.warn('Problem updating tabs', err)
      }
    }

    onMounted(() => {
      watch(activeTab, updateWunderbar, { immediate: true })
      watch(() => props.contained, updateWunderbar)
      const resizeHandler = new ResizeObserver(debounce(updateWunderbar, 100))
      resizeHandler.observe(tabContainer.value)
    })

    return { c, tabContainer, wunderbar, numberOfTabs, slotFallback }
  }
}
</script>
