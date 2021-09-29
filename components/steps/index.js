import fStep from './f-step.vue'
import fSteps from './f-steps.vue'

export const Steps = { install: (app) => [fStep, fSteps].forEach(c => app.component(c.name, c)) }
export { fStep, fSteps }
