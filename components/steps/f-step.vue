<template>
  <div class="f-step" :class="{
      [c.stepVertical]: vertical,
      [c.stepVerticalLeft]: vertical && left,
      [c.stepVerticalRight]: vertical && !left,
      [c.stepHorizontal]: !vertical
  }">
    <div v-if="!vertical" class="step-line-h-l" :class="{
      [c.stepLine]: true,
      [c.stepLineHorizontal]: !vertical,
      [c.stepLineIncomplete]: !active && !complete,
      [c.stepLineComplete]: active || complete
    }" />
    <div :aria-current="active ? 'step' : undefined" :class="{
      [c.stepDot]: true,
      [c.stepDotVertical]: vertical,
      [c.stepDotVerticalLeft]: vertical && left,
      [c.stepDotVerticalRight]: vertical && !left,
      [c.stepDotHorizontal]: !vertical,
      [c.stepDotIncomplete]: !(active || complete),
      [c.stepDotActive]: active,
      [c.stepDotComplete]: complete
    }">
      <svg role="img" :aria-label="complete ? '✓' : '⍻'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M13.007 4.447a.75.75 0 01.046 1.06l-5.5 6a.75.75 0 01-1.083.023l-3-3a.75.75 0 011.06-1.06l2.446 2.446 4.971-5.423a.75.75 0 011.06-.046z" />
      </svg>
    </div>
    <div class="step-line-h-r" :class="{
      [c.stepLine]: true,
      [c.stepLineVertical]: vertical,
      [c.stepLineVerticalLeft]: vertical && left,
      [c.stepLineVerticalRight]: vertical && !left,
      [c.stepLineHorizontal]: !vertical,
      [c.stepLineIncomplete]: !complete,
      [c.stepLineComplete]: complete
    }" />
    <div :class="{
      [c.content]: true,
      [c.contentVertical]: vertical,
      [c.contentHorizontal]: !vertical
    }">
      <slot />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { step as c } from '@fabric-ds/css/component-classes'

export default {
  name: 'fStep',
  props: {
    active: Boolean,
    complete: Boolean,
  },
  setup: () => ({
    vertical: inject('steps-vertical', true),
    left: inject('steps-left', true),
    c,
  })
}
</script>
