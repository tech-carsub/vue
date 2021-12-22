import fStep from './f-step.vue'
import fSteps from './f-steps.vue'
import { installer } from '#util'

export const Steps = { install: installer([fStep, fSteps]) }
export { fStep, fSteps }
