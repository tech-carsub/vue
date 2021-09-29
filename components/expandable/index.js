import fExpandable from './f-expandable.vue'
import fExpandTransition from './f-expand-transition.js'
import fWillExpand from './f-will-expand.vue'

export const Expandable = { install: (app) => [fExpandable, fExpandTransition, fWillExpand].forEach(c => app.component(c.name, c)) }
export { fExpandable, fExpandTransition, fWillExpand }
