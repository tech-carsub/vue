import fCard from './f-card.vue'
import { fClickable } from '#generics'
import { installer } from '#util'

export const Card = { install: installer([fClickable, fCard]) }
export { fCard }
