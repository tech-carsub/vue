import { fClickable } from '#util'
import fBox from './f-box.vue'

export const Box = { install: (app) => [fBox, fClickable].forEach(c => app.component(c.name, c)) }
export { fBox }
