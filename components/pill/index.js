import { fClickable } from '#util'
import fPill from './f-pill.vue'

export const Pill = { install: (app) => app.component(fPill.name, fPill) }
export { fPill }
