<template>
  <div :class="[{ 'absolute z-50': !callout }, attentionClass]" ref="attentionRef" v-show="model">
    <div :class="wrapperClass">
      <f-attention-arrow v-bind="$props" v-if="!noArrow" ref="arrowEl" :direction="actualDirection" />
      <div class="last-child:mb-0"><slot /></div>
    </div>
  </div>
</template>

<script>
import { watch, computed, ref, onMounted, nextTick } from 'vue'
import { absentProp } from '#util'
import { props as attentionProps, directions, computeCalloutArrow, sleep } from './attentionUtil.js'
import fAttentionArrow from './f-attention-arrow.vue'
import { computePosition, flip, offset, shift, arrow } from '@floating-ui/dom'
import { createModel, modelProps } from 'create-v-model'

export default {
  name: 'fAttentionItem',
  props: {
    ...attentionProps,
    ...modelProps({ modelDefault: absentProp }),
    targetEl: Object,
    attentionClass: [Object, String],
    attentionEl: {
      default: () => ref(null)
    }
  },
  components: { fAttentionArrow },
  setup: (props, { emit }) => {
    const directionName = computed(() => directions.find(e => props[e]))
    const wrapperClass = computed(() => ({
      ['border-2 relative']: true,
      ['bg-gray-700 border-gray-700 text-white rounded-4 py-6 px-8']: props.tooltip,
      ['bg-green-100 border-green-400 py-8 px-16 rounded-8']: props.callout,
      ['bg-white border-white rounded-8 p-16 filter drop-shadow-20']: props.popover,
    }))

    const model = (props.modelValue === absentProp) ? ref(true) : createModel({ props, emit })
    const arrowEl = ref(null)
    const actualDirection = ref(directionName.value)
    const recompute = async () => {
      if (!model.value) return
      await nextTick()
      if (props.callout) return computeCalloutArrow({ directionName, arrowEl, actualDirection })
      const position = await computePosition(props.targetEl, props.attentionEl.value, {
        placement: directionName.value,
        middleware: [
          flip(),
          offset(8),
          shift({ padding: 16 }),
          arrow({ element: props.noArrow ? undefined : arrowEl.value.$el })
        ]
      })
      actualDirection.value = position.placement
      Object.assign(props.attentionEl.value.style, {
        left: '0',
        top: '0',
        transform: `translate3d(${Math.round(position.x)}px, ${Math.round(position.y)}px, 0)`
      })
      let { x, y } = position.middlewareData.arrow
      arrowEl.value.$el.style.left = x ? (x + 'px') : null
      arrowEl.value.$el.style.top = y ? (y + 'px') : null
    }

    onMounted(async () =>  {
      watch(() => [props.top, props.bottom, props.left, props.right], recompute)
      watch(model, recompute, { immediate: props.callout })
    })

    return { wrapperClass, attentionRef: props.attentionEl, arrowEl, actualDirection, model }
  }
}
</script>
