<template>
  <div>
    <setup title="Alert" compName="fAlert" />
    <div class="h-4" />
    <section class="space-y-32">
      <div>
        <f-alert v-model="showing" v-bind="alertProps[current]">
          <p>This is the message text that can be short or a little bit long</p>
          <div class="space-x-8">
            <f-button small>Primary CTA</f-button>
            <f-button small quiet>Secondary CTA</f-button>
          </div>
        </f-alert>
      </div>
      <div class="space-y-16">
        <f-button utility small @click="showing = !showing">Toggle show/hide</f-button>
        <f-select label="Alert type" v-model="current">
          <option value="negative">Negative</option>
          <option value="positive">Positive</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </f-select>
      </div>
    </section>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />
  </div>
</template>

<script setup>
import { fAlert, fButton, fSelect } from '#components'
import { ref } from 'vue'
const randomElementFrom = arr => arr[Math.floor(Math.random()*arr.length)]

const sentences = [
  `there are zombies in mah Cheerios`,
  `there is peanut butter on the ceiling`,
  `this lamp has a lot of cheese`,
  `there are tiny robots in my socks`
]
const sentence = randomElementFrom(sentences)
const alertProps = {
  negative: {
    negative: true,
    title: `Oh no ${sentence}!`
  },
  positive: {
    positive: true,
    title: `Hooray ${sentence}!`
  },
  warning: {
    warning: true,
    title: `Maybe ${sentence}?`
  },
  info: {
    info: true,
    title: `Just so you know, ${sentence}.`
  }
}
const current = ref('negative')
const showing = ref(true)
const token =
`<f-alert v-model="showAlert" negative title="I am a title">
  <p>I am an excellent message for the user.</p>
  <div class="space-x-8">
    <f-button small>Primary CTA</f-button>
    <f-button small quiet>Secondary CTA</f-button>
  </div>
</f-alert>`
</script>
