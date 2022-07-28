<script setup>
import { ref } from 'vue'
import { fBox } from '#components'
import SidebarLinks from './SidebarLinks.vue'

const expanded = ref(false)

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
  <div>
    <nav class="mobile-menu fixed top-0 left-0 right-0 bg-gray-100 border-b border-gray-200">
      <f-box class="flex justify-between">
        <h1 class="h4 mb-0">Fabric Vue</h1>
        <button @click="expanded = !expanded" class="flex justify-center items-center w-24 transparent-tap" type="button" aria-label="show mobile navigation" :aria-expanded="expanded" aria-controls="sidebar">
          <span class="relative overflow-hidden w-16 h-14" :class="{ active: expanded }">
            <span class="top-bar absolute w-16 h-2 bg-gray-700 top-0 left-0" />
            <span class="middle-bar absolute w-16 h-2 bg-gray-700 top-6 left-0" />
            <span class="bottom-bar absolute w-16 h-2 bg-gray-700 top-12 left-0" />
          </span>
        </button>
      </f-box>
    </nav>
    <aside id="sidebar" :class="{ expanded }" class="sidebar z-50 fixed inset-0 bg-gray-100 border-r border-gray-200 divide-y divide-gray-200">
      <f-box><h1 class="h4">Fabric Vue</h1></f-box>
      <sidebar-links v-for="(group, groupName)  in sidebarConfig" :start-open="group.startOpen" :title="groupName">
        <router-link v-for="(title, to) in group.links" :to="to">{{ title }}</router-link>
      </sidebar-links>
    </aside>
  </div>
</template>

<style scoped>
a {
  color: var(--f-gray-500);
}
.sidebar, .mobile-menu {
  transition: 0.3s ease;
}
.sidebar {
  width: 320px;
}
.mobile-menu {
  transform: translateY(-100%);
}
.transparent-tap {
  -webkit-tap-highlight-color: transparent;
}
.top-bar, .middle-bar, .bottom-bar { transition: 0.3s ease; }
.top-bar { transform: translate(4px); transform-origin: 9px 4px; }
.bottom-bar { transform: translate(4px); transform-origin: 9px -2px; }
.active .top-bar { transform: translate(0) rotate(225deg); }
.middle-bar { transform: translate(0); }
.active .middle-bar { transform: translate(16px); }
.bottom-bar { transform: translate(8px); }
.active .bottom-bar { transform: translate(0) rotate(135deg); }
@media (max-width: 640px) {
  .sidebar {
    transform: translate(-100%);
  }
  .sidebar.expanded {
    transform: translate(0);
  }
  .mobile-menu {
    transform: translateY(0);
  }
}
</style>
