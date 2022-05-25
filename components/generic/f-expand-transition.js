import { Transition, TransitionGroup, h } from 'vue'
import { expand, collapse } from 'element-collapse'

export default {
  name: 'fExpandTransition',
  props: {
    group: Boolean,
    tag: String
  },
  setup(props, { emit, slots }) {
    const transition = props.group ? TransitionGroup : Transition
    const onAfterEnter = () => emit('expand')
    const onAfterLeave = () => emit('collapse')
    return () => h(transition, { css: false, onEnter: expand, onAfterEnter, onLeave: collapse, onAfterLeave, tag: props.tag }, slots)
  }
}
