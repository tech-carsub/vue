<script setup>
import { ref } from 'vue'
import { fCard, fDeadToggle, fClickable } from '#components'

const selected = ref(false)
const foo = ref('')
</script>

<template>
  <div>
    <component-title title="Card" />

    <token>
      <div class="w-1/2">
        <f-card :selected="selected">
          <img class="h-144 w-full object-cover" src="https://source.unsplash.com/random/600x600" />
          <p class="absolute top-12 left-12 bg-aqua-200 p-4 rounded-4 text-12">Ukens bolig</p>
          <div class="p-16">
            <p class="text-12 text-gray-300">DNB Eiendom</p>
            <p><f-clickable @click="selected = !selected" class="text-left">Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</f-clickable></p>
            <p class="text-14 text-gray-400 mb-0">Eier (Selveier) <span class="text-gray-200">•</span> Leilighet <span class="text-gray-200">•</span> 2 soverom</p>
          </div>
        </f-card>
      </div>
    </token>

    <token :state="foo">
      <div class="grid grid-cols-2 gap-16">
        <f-card flat class="py-4 px-12 flex items-center" :selected="foo === 'foo'">
          <f-dead-toggle radio v-model="foo" value="foo" />
          <div class="ml-12">
            <h4 class="mb-0"><f-clickable radio v-model="foo" value="foo">Purchase foo</f-clickable></h4>
            <p class="mb-0 text-14">470 kr/mnd</p>
          </div>
        </f-card>
        <f-card flat class="py-8 px-12 flex items-center" :selected="foo === 'bar'">
          <f-dead-toggle radio v-model="foo" value="bar" />
          <div class="ml-12">
            <h4 class="mb-0"><f-clickable radio v-model="foo" value="bar">Purchase bar</f-clickable></h4>
            <p class="mb-0 text-14">520 kr/mnd</p>
          </div>
        </f-card>
      </div>
    </token>

  </div>
</template>
