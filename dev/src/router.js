import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Alert from '../pages/Alert.vue'
import Attention from '../pages/Attention.vue'
import Box from '../pages/Box.vue'
import Breadcrumbs from '../pages/Breadcrumbs.vue'
import Button from '../pages/Button.vue'
import ButtonGroup from '../pages/ButtonGroup.vue'
import Card from '../pages/Card.vue'
import Expandable from '../pages/Expandable.vue'
import Modal from '../pages/Modal.vue'
import Pill from '../pages/Pill.vue'
import Slider from '../pages/Slider.vue'
import Tabs from '../pages/Tabs.vue'
// import Switch from '../pages/Switch.vue'
// import Forms from '../pages/Forms.vue'
// import Steps from '../pages/Steps.vue'

export const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/alert', component: Alert, name: 'alert' },
  { path: '/attention', component: Attention, name: 'attention' },
  { path: '/box', component: Box, name: 'box' },
  { path: '/button', component: Button, name: 'button' },
  { path: '/breadcrumbs', component: Breadcrumbs, name: 'breadcrumbs' },
  { path: '/button-group', component: ButtonGroup, name: 'button-group' },
  { path: '/card', component: Card, name: 'card' },
  { path: '/expandable', component: Expandable, name: 'expandable' },
  { path: '/modal', component: Modal, name: 'modal' },
  { path: '/pill', component: Pill, name: 'pill' },
  { path: '/slider', component: Slider, name: 'slider' },
  { path: '/tabs', component: Tabs, name: 'tabs' },
  // { path: '/switch', component: Switch, name: 'switch' },
  // { path: '/forms', component: Forms, name: 'forms' },
  // { path: '/steps', component: Steps, name: 'steps' },
]

const scrollBehavior = () => ({ top: 0 })
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})
