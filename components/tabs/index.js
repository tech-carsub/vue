import fTabs from './f-tabs.vue'
import fTab from './f-tab.vue'
import fTabPanel from './f-tab-panel.vue'

export const Tabs = { install: (app) => [fTabs, fTab, fTabPanel].forEach(c => app.component(c.name, c)) }
export { fTabs, fTab, fTabPanel }
