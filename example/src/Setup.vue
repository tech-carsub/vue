<template>
  <section>
    <h3 class="h1 mb-32">{{ title }}</h3>
    <section-header label="Setup" />
    <h5 class="mt-32 font-normal">Use in entire app</h5>
    <p class="bg-gray-100 p-16 rounded-4 text-12">
      <code class="block mb-4"
        >import { {{ title }} } from '@fabric-ds/vue'</code
      >
      <code>app.use({{ title }})</code>
    </p>
    <h5 class="mt-32 font-normal">Use in one component and special imports</h5>
    <p class="bg-gray-100 p-16 rounded-4 text-12">
      <code>import { {{ compName }} } from '@fabric-ds/vue'</code>
    </p>

    <example-header :label="title" />
  </section>
</template>

<script setup>
defineProps({ title: String, compName: String, })
</script>
