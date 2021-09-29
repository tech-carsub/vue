<template>
  <div>
    <setup title="Card" pkg-name="@fabric-ds/vue-card" compName="fCard" />

    <section-header label="Example" />

    <div class="space-y-32 md:space-y-0 md:grid grid-cols-3 gap-32">
      <f-card @click="selected = !selected" :selected="selected">
        <img class="h-128 w-full object-cover" src="https://source.unsplash.com/random/400x400" />
        <p class="absolute top-12 left-12 bg-aqua-200 text-aqua-900 p-4 rounded-4 text-12">Ukens bolig</p>
        <div class="p-16">
          <p class="text-12 text-gray-300">DNB Eiendom</p>
          <p>Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</p>
          <p class="text-14 text-gray-400 mb-4">Bøgata 25C, 0655 Oslo</p>
          <p class="font-bold my-8">52 m<span style="font-size: 10px; vertical-align: super;">2</span> Totalpris: 4 869 039 kr</p>
          <p class="text-14 text-gray-400 mb-0">Eier (Selveier) <span class="text-gray-200">•</span> Leilighet <span class="text-gray-200">•</span> 2 soverom</p>
        </div>
      </f-card>
      <f-card @click="selected = !selected" :selected="selected">
        <img class="h-128 w-full object-cover" src="https://source.unsplash.com/random/402x402" />
        <div class="p-16">
          <p class="text-12 text-gray-300">DNB Eiendom</p>
          <p>Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</p>
          <p class="text-14 text-gray-400 mb-4">Bøgata 25C, 0655 Oslo</p>
          <p class="font-bold my-8">52 m<span style="font-size: 10px; vertical-align: super;">2</span> Totalpris: 4 869 039 kr</p>
          <p class="text-14 text-gray-400 mb-0">Eier (Selveier) <span class="text-gray-200">•</span> Leilighet <span class="text-gray-200">•</span> 2 soverom</p>
        </div>
      </f-card>
      <f-card @click="selected = !selected" :selected="selected">
        <img class="h-128 w-full object-cover" src="https://source.unsplash.com/random/404x404" />
        <div class="p-16">
          <p class="text-12 text-gray-300">DNB Eiendom</p>
          <p>Stilfull og gjennomgående 3-roms m/balkong. Oppusset i 2019. Inkl. bl.a. vv/fyring.</p>
          <p class="text-14 text-gray-400 mb-4">Bøgata 25C, 0655 Oslo</p>
          <p class="font-bold my-8">52 m<span style="font-size: 10px; vertical-align: super;">2</span> Totalpris: 4 869 039 kr</p>
          <p class="text-14 text-gray-400 mb-0">Eier (Selveier) <span class="text-gray-200">•</span> Leilighet <span class="text-gray-200">•</span> 2 soverom</p>
        </div>
      </f-card>
    </div>

    <f-card :selected="checkModel" class="mt-32 w-max">
      <div class="p-24">
        <f-toggle class="in-card -mb-4" checkbox :toggles="[{ label: 'Check in a box', value: true }]" v-model="checkModel" />
      </div>
    </f-card>

    <div class="flex gap-32 mt-32">
      <f-card :selected="radioModel === 'foo'" class="w-max">
        <div class="p-24">
          <f-toggle class="in-card -mb-4" radio :toggles="[{ label: 'Radio in a box - A', value: 'foo', name: 'radio-group' }]" v-model="radioModel" />
        </div>
      </f-card>
      <f-card :selected="radioModel === 'bar'" class="w-max">
        <div class="p-24">
          <f-toggle class="in-card -mb-4" radio :toggles="[{ label: 'Radio in a box - B', value: 'bar', name: 'radio-group' }]" v-model="radioModel" />
        </div>
      </f-card>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import Setup from '../Setup.vue'
import { fCard, fToggle } from '#components'

export default {
  components: { Setup, fCard, fToggle },
  setup: () => ({
    selected: ref(false),
    checkModel: ref(false),
    radioModel: ref(''),
  })
}
</script>
