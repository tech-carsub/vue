import fExpandable from './f-expandable.vue'
import fWillExpand from './f-will-expand.vue'
import { fExpandTransition } from '#generics'
import { installer } from '#util'

export const Expandable = { install: installer([fExpandable, fExpandTransition, fWillExpand]) }
export { fExpandable, fWillExpand }
