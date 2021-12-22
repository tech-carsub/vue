import fButtonGroup from './f-button-group.vue'
import fButtonGroupItem from './f-button-group-item.vue'

export const ButtonGroup = { install: (app) => [fButtonGroup, fButtonGroupItem].forEach(c => app.component(c.name, c)) }
export { fButtonGroup, fButtonGroupItem }
