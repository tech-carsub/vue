import fTabs from './f-tabs.vue'
import fTab from './f-tab.vue'
import fTabPanel from './f-tab-panel.vue'
import { installer } from '#util'

export const Tabs = { install: installer([fTabs, fTab, fTabPanel]) }
export { fTabs, fTab, fTabPanel }
