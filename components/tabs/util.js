import { nextTick } from 'vue'

const validEvents = Object.freeze({
  left: 'ArrowLeft',
  right: 'ArrowRight',
  home: 'Home',
  end: 'End'
})
const validEventNames = Object.values(validEvents)
const hasModifierKey = (evt) => evt.altKey || evt.ctrlKey || evt.shiftKey
const shouldExitEarly = (evt) => !(!hasModifierKey(evt) && validEventNames.includes(evt.key))

export const useKeydownHandler = ({ tabs, activeTab, focusActive }) => async (event) => {
  if (shouldExitEarly(event)) return
  try {
    const current = tabs.value.indexOf(activeTab.value)
    const next = (() => {
      switch (event.key) {
        case validEvents.home: return 0
        case validEvents.end: return tabs.value.length - 1
        case validEvents.left: return Math.max(0, current - 1)
        case validEvents.right: return Math.min(tabs.value.length - 1, current + 1)
      }
    })()
    if (current !== next) {
      event.preventDefault()
      activeTab.value = tabs.value[next]
      await nextTick()
      focusActive()
    }
  } catch (err) {
    console.warn('Problem handling tabs keydown', err)
  }
}

