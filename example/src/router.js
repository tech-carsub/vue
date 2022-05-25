import { createRouter, createWebHistory } from 'vue-router';
import Home from './examples/Home.vue';
import Icons from './examples/Icons.vue';
import Button from './examples/Button.vue';
import ButtonGroup from './examples/ButtonGroup.vue';
import Slider from './examples/Slider.vue';
import Switch from './examples/Switch.vue';
import Modal from './examples/Modal.vue';
import Breadcrumbs from './examples/Breadcrumbs.vue';
import Forms from './examples/Forms.vue';
import Box from './examples/Box.vue';
import Card from './examples/Card.vue';
import Tabs from './examples/Tabs.vue';
import Expandable from './examples/Expandable.vue';
import Steps from './examples/Steps.vue';
import Pill from './examples/Pill.vue';
import Attention from './examples/Attention.vue'
import Alert from './examples/Alert.vue'
import Utilities from './examples/Utilities.vue';

export const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/icons', component: Icons, name: 'icons' },
  { path: '/button', component: Button, name: 'button' },
  { path: '/button-group', component: ButtonGroup, name: 'button-group' },
  { path: '/slider', component: Slider, name: 'slider' },
  { path: '/switch', component: Switch, name: 'switch' },
  { path: '/modal', component: Modal, name: 'modal' },
  { path: '/breadcrumbs', component: Breadcrumbs, name: 'breadcrumbs' },
  { path: '/forms', component: Forms, name: 'forms' },
  { path: '/box', component: Box, name: 'box' },
  { path: '/card', component: Card, name: 'card' },
  { path: '/tabs', component: Tabs, name: 'tabs' },
  { path: '/expandable', component: Expandable, name: 'expandable' },
  { path: '/steps', component: Steps, name: 'steps' },
  { path: '/pill', component: Pill, name: 'pill' },
  { path: '/utilities', component: Utilities, name: 'utilities' },
  { path: '/attention', component: Attention, name: 'attention' },
  { path: '/alert', component: Alert, name: 'alert' },
]

const scrollBehavior = () => ({ top: 0 })
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})
