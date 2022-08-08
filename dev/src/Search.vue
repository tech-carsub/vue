<script setup>
import Fuse from 'fuse.js'
import { sidebarConfig } from '../src/sidebar-config.js'
import { ref, computed, watch } from 'vue'
import { fInput, fModal, fBox } from '#components'
import { modalShowing } from '../src/store.js'

const inputEl = ref(null)
const showSearch = ref(false)
const searcher = new Fuse(sidebarConfig, { keys: ['links.title'], includeMatches: true })
const searchTerm = ref('')
const results = computed(() => searcher.search(searchTerm.value))
const matches = computed(() => results.value.map(r =>
  r.matches.map(m => r.item.links[m.refIndex])
).flat(Infinity))
const handleSearch = (e) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    showSearch.value = true
  }
}
window.addEventListener('keydown', handleSearch)
const hide = () => {
  showSearch.value = false
  searchTerm.value = ''
}
const focusInput = () => {
  inputEl.value.$el.querySelector('input').focus()
}
watch(showSearch, (showing) => modalShowing.value = showing)
</script>

<template>
  <div>
    <f-modal title="Search" v-model="showSearch" @dismiss="hide" @right="hide" @shown="focusInput">
      <f-input label="Search term" v-model="searchTerm" ref="inputEl" />
      <f-box neutral class="mt-24">
        <h5>Results</h5>
        <p v-for="m in matches">
          <router-link :to="m.to" @click="hide">{{ m.title }}</router-link>
        </p>
      </f-box>
    </f-modal>
  </div>
</template>
