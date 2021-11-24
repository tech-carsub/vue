<template>
  <transition name="fade">
    <div :class="c.backdrop" v-if="showModal" @click.self="emitDismiss" ref="backdropEl">
      <transition name="slide">
        <div v-if="showContent" :class="c.modal" tabindex="-1" aria-modal="true" aria-labelledby="f-modal-title" role="dialog" ref="modalEl">
          <div :class="[c.title, headerClasses]">
            <transition-group name="f-modal-title">
              <button v-if="left" aria-label="Tilbake" @click="$emit('left')" :class="titleLeftClasses" key="left" v-bind="left">
                <svg v-if="!$slots.left" aria-hidden="true" :class="[c.titleButtonIcon, 'transform rotate-90']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="nonzero" d="M8 2.25a.75.75 0 01.743.648L8.75 3v8.189l3.72-3.72a.75.75 0 011.133.977l-.073.084-5 5a.747.747 0 01-.374.204l-.104.014h-.104a.747.747 0 01-.478-.218l-5-5a.75.75 0 01.976-1.133l.084.073 3.72 3.719V3A.75.75 0 018 2.25z"></path></svg>
                <slot name="left" />
              </button>
              <div :class="titleCenterClasses" key="title" v-bind="titleAttrs">
                <p id="f-modal-title" :class="c.titleText" v-if="title">{{ title }}</p>
                <slot name="title" />
              </div>
              <button v-if="right" aria-label="Lukk" @click="$emit('right')" :class="titleRightClasses" key="right" v-bind="right">
                <svg v-if="!$slots.right" aria-hidden="true" :class="c.titleButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 12l6 6-6-6-6 6 6-6zm0 0L6 6l6 6 6-6-6 6z"/></svg>
                <slot name="right" />
              </button>
            </transition-group>
          </div>
          <div :class="[c.content, contentClasses]" v-if="$slots.default" ref="contentEl" :id="contentId">
            <slot />
          </div>
          <div :class="c.footer" v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { modal as c } from '@fabric-ds/component-classes'
import focusLock from '@finn-no/dom-focus-lock-fixed'
import { id } from '#util'
import { setup as setupScrollLock, teardown as teardownScrollLock } from 'scroll-doctor'

const transitions = 'transition-gpu transition-transform'

export default {
  name: 'fModal',
  props: {
    left: [Object, Boolean],
    right: [Object, Boolean],
    title: String,
    titleAttrs: Object,
    headerClasses: [String, Object],
    contentClasses: [String, Object],
    modelValue: Boolean,
    contentId: id
  },
  emits: ['dismiss', 'left', 'right', 'shown', 'hidden'],
  setup(props, { emit }) {
    const modalEl = ref(null)
    const contentEl = ref(null)
    const backdropEl = ref(null)
    const showModal = ref(false)
    const showContent = ref(false)
    const titleShouldTransition = ref(false)
    const emitDismiss = () => emit('dismiss')
    const emitIfEscape = e => {
      if (e.key === 'Escape') emitDismiss()
    }
    const titleLeftClasses = computed(() => ({ [transitions]: true, [titleShouldTransition.value ? 'duration-300' : 'duration-1']: true, [c.titleButton]: true, [c.titleButtonLeft]: true, ['justify-self-start']: true }))
    const titleCenterClasses = computed(() => ({ [transitions]: true, [titleShouldTransition.value ? 'duration-300' : 'duration-0']: true, 'justify-self-center': props.left, 'col-span-2': !props.left }))
    const titleRightClasses = computed(() => ({ [transitions]: true, [titleShouldTransition.value ? 'duration-300' : 'duration-0']: true, [c.titleButton]: true, [c.titleButtonRight]: true, ['justify-self-end']: true }))

    // when the content area reflows the title area transitions because of v-move in the transition-group
    // this limits the effects
    watch(() => ([props.left, props.right, props.title]), async () => {
      titleShouldTransition.value = true
      await nextTick()
      titleShouldTransition.value = false
    })

    // vue-ism
    // because we have nested transitions we need to fire this in order
    // we use nextTick to ensure DOM elements are available for later
    async function handleTransitions(showing) {
      if (showing) showModal.value = showing
      else showContent.value = showing
      await nextTick()
      if (showing) showContent.value = showing
      else showModal.value = showing
      await nextTick()
    }

    // change the modal's border radius when within 2% of full height
    const modifyBorderRadius = () => {
      if (modalEl.value?.scrollHeight * 1.02 > innerHeight) modalEl.value.style.borderRadius = '0px'
      else modalEl.value.style.borderRadius = null
    }

    async function setupHandlers() {
      focusLock.on(modalEl.value)
      modalEl.value.addEventListener('transitionend', modifyBorderRadius, { passive: true })
      addEventListener('keydown', emitIfEscape, { passive: true })
      setupScrollLock(contentEl.value)
      emit('shown')
    }
    async function teardownHandlers() {
      // if the modal's parent component is getting unmounted our refs won't exist
      if (modalEl.value) {
        focusLock.off(modalEl.value)
        modalEl.value.removeEventListener('transitionend', modifyBorderRadius, { passive: true })
      }
      removeEventListener('keydown', emitIfEscape)
      teardownScrollLock()
      emit('hidden')
    }

    async function handleShow(showing) {
      if (!showing) await teardownHandlers()
      await handleTransitions(showing)
      if (showing) await setupHandlers()
    }

    watch(() => props.modelValue, handleShow, { immediate: true })
    onBeforeUnmount(handleShow)

    return {
      c,
      modalEl,
      backdropEl,
      emitDismiss,
      contentEl,
      showModal,
      showContent,
      titleLeftClasses,
      titleCenterClasses,
      titleRightClasses
    }
  }
}
</script>
