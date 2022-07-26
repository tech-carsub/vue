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
import Input from '../pages/Input.vue'
import Modal from '../pages/Modal.vue'
import Pill from '../pages/Pill.vue'
import Select from '../pages/Select.vue'
import Slider from '../pages/Slider.vue'
import Steps from '../pages/Steps.vue'
import Switch from '../pages/Switch.vue'
import Tabs from '../pages/Tabs.vue'
import Textarea from '../pages/Textarea.vue'
import Toggle from '../pages/Toggle.vue'
// import Forms from '../pages/Forms.vue'

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
  { path: '/input', component: Input, name: 'input' },
  { path: '/modal', component: Modal, name: 'modal' },
  { path: '/pill', component: Pill, name: 'pill' },
  { path: '/select', component: Select, name: 'select' },
  { path: '/slider', component: Slider, name: 'slider' },
  { path: '/steps', component: Steps, name: 'steps' },
  { path: '/switch', component: Switch, name: 'switch' },
  { path: '/tabs', component: Tabs, name: 'tabs' },
  { path: '/textarea', component: Textarea, name: 'textarea' },
  { path: '/toggle', component: Toggle, name: 'toggle' },
  // { path: '/forms', component: Forms, name: 'forms' },
]

const scrollBehavior = () => ({ top: 0 })
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})
