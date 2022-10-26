<template>
  <div>
    <h2 class="mb-16">Install</h2>
    <p class="bg-gray-100 p-16 rounded-4 text-12">
      <code class="block mb-4">yarn add @honk-ds/vue</code>
    </p>

    <h2 class="mt-32 mb-16">Using this package</h2>
    <p class="text-14">This package contains all the Vue components, and throughout these docs you'll see references to two ways of adding a component to your app.</p>

    <h4 class="mt-32">1. Using in the entire app</h4>
    <p class="text-14">This will typically look something like this:</p>
    <p class="bg-gray-100 mb-16 p-16 rounded-4 text-12">
      <code class="block mb-4">import { Box } from '@honk-ds/vue'</code>
      <code>app.use(Box)</code>
    </p>
    <p class="text-14">This code is bringing in <b>an installer</b> for the Box component, and any additional helper-components (in the case of Box, this would be the Clickable component). It will install the component app-wide, so you never need to import the component again.</p>

    <h4 class="mt-32">2. Using in one place, or special exports</h4>
    <p class="text-14">This will typically look something like this:</p>
    <p class="bg-gray-100 mb-16 p-16 rounded-4 text-12"><code>import { fBox, fClickable } from '@honk-ds/vue'</code></p>
    <p class="text-14">This code is bringing in the Box and Clickable components themselves, rather than an installer - this is denoted by the "<code>f</code>" prefix of the components. Some edge-case components may be available this way that don't make sense to globally install for everyone.</p>
  </div>
</template>
