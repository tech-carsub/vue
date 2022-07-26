<script setup>
import { fBox } from '#components'
import SidebarLinks from './SidebarLinks.vue'

const sidebarConfig = {
  Actions: {
    startOpen: true,
    links: {
      button: 'Button',
      'button-group': 'Button Group',
      pill: 'Pill'
    }
  },
  Communication: {
    startOpen: true,
    links: {
      alert: 'Alert',
      attention: 'Attention',
      modal: 'Modal',
      steps: 'Steps'
    }
  },
  Forms: {
    startOpen: false,
    links: {
      input: 'Input',
      select: 'Select',
      slider: 'Slider',
      textarea: 'Textarea',
      toggle: 'Toggle'
    }
  },
  Layout: {
    startOpen: true,
    links: {
      box: 'Box',
      card: 'Card',
      expandable: 'Expandable',
      tabs: 'Tabs'
    }
  }
}
</script>

<template>
  <div class="has-sidebar mt-32">
    <aside class="sidebar fixed inset-0 bg-gray-100 border-r border-gray-200 divide-y divide-gray-200">
      <f-box><h1 class="h4">Fabric Vue</h1></f-box>
      <sidebar-links v-for="(group, groupName)  in sidebarConfig" :start-open="group.startOpen" :title="groupName">
        <router-link v-for="(title, to) in group.links" :to="to">{{ title }}</router-link>
      </sidebar-links>
    </aside>
    <main class="page-container">
      <div class="max-w-screen-md mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
a {
  color: var(--f-gray-500);
}
</style>

<style>
.shiki {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  white-space: pre;
  font-size: 14px;
  padding: 16px;
  border-radius: 8px;
  overflow: scroll;
  background-color: var(--f-gray-100) !important;
  border: 1px solid var(--f-gray-200);
  position: relative;
}
.itsy-token {
  padding: 24px 0;
}
.has-sidebar {
  padding-left: 320px;
}
.sidebar {
  width: 320px;
}
@media (max-width: 640px) {
  .shiki {
    font-size: 12px;
  }
  .controls label {
    font-size: 12px;
  }
  .has-sidebar {
    padding-left: 0;
  }
  .sidebar {
    transition: 0.3s ease;
    transform: translate(-100%);
  }
}
code {
  color: var(--f-aqua-800);
}
</style>
