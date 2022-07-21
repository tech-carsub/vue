import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Button from '../pages/Button.vue'
// import ButtonGroup from '../pages/ButtonGroup.vue'
// import Slider from '../pages/Slider.vue'
// import Switch from '../pages/Switch.vue'
// import Modal from '../pages/Modal.vue'
// import Breadcrumbs from '../pages/Breadcrumbs.vue'
// import Forms from '../pages/Forms.vue'
// import Box from '../pages/Box.vue'
// import Card from '../pages/Card.vue'
// import Tabs from '../pages/Tabs.vue'
// import Expandable from '../pages/Expandable.vue'
// import Steps from '../pages/Steps.vue'
// import Pill from '../pages/Pill.vue'
// import Attention from '../pages/Attention.vue'
// import Alert from '../pages/Alert.vue'
// import Utilities from '../pages/Utilities.vue'

export const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/button', component: Button, name: 'button' },
  // { path: '/button-group', component: ButtonGroup, name: 'button-group' },
  // { path: '/slider', component: Slider, name: 'slider' },
  // { path: '/switch', component: Switch, name: 'switch' },
  // { path: '/modal', component: Modal, name: 'modal' },
  // { path: '/breadcrumbs', component: Breadcrumbs, name: 'breadcrumbs' },
  // { path: '/forms', component: Forms, name: 'forms' },
  // { path: '/box', component: Box, name: 'box' },
  // { path: '/card', component: Card, name: 'card' },
  // { path: '/tabs', component: Tabs, name: 'tabs' },
  // { path: '/expandable', component: Expandable, name: 'expandable' },
  // { path: '/steps', component: Steps, name: 'steps' },
  // { path: '/pill', component: Pill, name: 'pill' },
  // { path: '/utilities', component: Utilities, name: 'utilities' },
  // { path: '/attention', component: Attention, name: 'attention' },
  // { path: '/alert', component: Alert, name: 'alert' },
]

const scrollBehavior = () => ({ top: 0 })
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})
