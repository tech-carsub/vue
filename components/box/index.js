import fBox from './f-box.vue'
import { fClickable } from '#generics'
import { installer } from '#util'

export const Box = { install: installer([fBox, fClickable]) }
export { fBox }
