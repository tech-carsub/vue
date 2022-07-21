<template>
  <div>
    <setup title="Attention" comp-name="fAttention" />
    <div>
      <h1 class="w-max mb-0" ref="target" @mouseenter="showing = true" @mouseleave="showing = false">hover this for useless info</h1>
      <f-attention tooltip bottom :target-el="target" v-model="showing">
        <p>lol i am a popover</p>
      </f-attention>
    </div>
    <div class="flex items-center">
      <f-box info>
        <h1>I am a box full of info</h1>
      </f-box>
      <f-attention callout right>
        <p>I'm a callout because that box over there is new or something</p>
      </f-attention>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fAttention, fBox } from '#components'

const target = ref(null)
const showing = ref(false)
</script>
