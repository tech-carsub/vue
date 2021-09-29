<template>
  <div>
    <h3 class="h1 mb-32">Icons</h3>

    <section-header label="Install" />
    <p class="bg-gray-100 p-16 rounded-4 text-12"><code>yarn add @fabric-ds/icons</code></p>

    <section-header label="Use" />

    <h5>List of icons</h5>
    <p class="text-14 mb-32">You can find the available icons <a href="http://fabric-icons.surge.sh">here</a></p>

    <h5>Simple image use</h5>
    <p class="text-14 mb-32">If you don't need to style the icon, you can simply bring it in as an image from the module. Using Rollup you'll either be able to bundle this into the final package, or exclude it from the build and upload it to Eik.</p>

    <h5>Icons as Vue components</h5>
    <p class="text-14">To style the icon, or if you otherwise need the SVG in the DOM, you can bring it in as a component. Only the icons imported will be brought into the bundle.</p>
    <p class="bg-gray-100 p-16 rounded-4 text-12">
      <code>
        import { IconWifi32 } from '@fabric-ds/icons/vue'<br/>
        ...<br/>
        export default { components: { IconWifi32 } }
      </code>
    </p>
    <p class="text-14 mt-16">Any props sent to the component will be used as attributes on the root SVG.</p>
    <p class="border-l-8 bg-green-50 border-green-700 p-16 rounded-4 my-16 text-12">The naming scheme for exports is <code>Icon+NAME+SIZE</code> - e.g. above this would be the 32px "wifi" icon.</p>
  </div>
</template>

<script>
import Setup from '../Setup.vue'

export default {
  components: { Setup }
}
</script>
