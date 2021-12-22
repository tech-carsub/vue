import fButtonGroup from './f-button-group.vue'
import fButtonGroupItem from './f-button-group-item.vue'
import { fClickable } from '#generics'
import { installer } from '#util'

export const ButtonGroup = { install: installer([fClickable, fButtonGroup, fButtonGroupItem]) }
export { fButtonGroup, fButtonGroupItem }
