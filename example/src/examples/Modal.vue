<template>
  <div>
    <setup title="Modal" pkg-name="@fabric-ds/vue-modal" compName="fModal" />

    <section-header label="Example" />

    <button class="button button--utility" @click="model = true">Show modal</button>

    <f-modal title="Oh hello" :style="demoStyles" :left="show" :right="{ 'aria-label': 'Close' }" @dismiss="model = false" v-model="model" @right="model = false">
      <div class="space-x-8">
        <button @click="changeHeight" class="button button--utility button--small mb-32">Modify height</button>
        <button @click="show = !show" class="button button--utility button--small mb-32">Toggle the back-button</button>
      </div>
      <div>
        <h1 class="h4 mb-16">This is a title for the content area</h1>
        <p>Life as a shorty shouldn't be so rough. Behold the bold soldier control the globe slowly, proceeds to blow, swinging swords like Shinobi. The game of chess, is like a swordfight, you must think first before you move. My beats travel like a vortex through your spine, to the top of your cerebral cortex. I smoke on the mic like smoking Joe Frazier, the hell raiser, raising hell with the flavor.</p>
        <p>I breaks it down to the bone gristle, Ill speaking Scud missile heat seeking, Johnny Blazing. Protect Ya Neck, my sword still remain imperial before I blast the mic, RZA scratch off the serial. Shackling the masses with drastic rap tactics, graphic displays melt the steel like blacksmiths. Perpendicular to the square we stay in gold like Flair, escape from your dragon's lair in particular. Shame on you when you stepped through to The Ol Dirty Bastard straight from the Brooklyn Zoo. Protect Ya Neck, my sword still remain imperial before I blast the mic, RZA scratch off the serial.</p>
        <p>Life as a shorty shouldn't be so rough. Handcuffed in the back of a bus, forty of us. Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. My beats travel like a vortex through your spine, to the top of your cerebral cortex. Life as a shorty shouldn't be so rough. Well I'm a sire, I set the microphone on fire, rap styles vary and carry like Mariah.</p>
        <p>Life as a shorty shouldn't be so rough. Small change, they putting shame in the game. My beats travel like a vortex through your spine, to the top of your cerebral cortex. Shame on you when you stepped through to The Ol Dirty Bastard straight from the Brooklyn Zoo. I come rough, tough like an Elephant tusk. I bomb atomically Socrates' philosophies and hypothesis can't define how I be dropping these mockeries. The rebel, I make more noise than heavy metal. Cash rules everything around me, dollar dollar bill, ya'll. If what you say is true, the Shaolin and the Wu-Tang could be dangerous.</p>
        <p>Perpendicular to the square we stay in gold like Flair, escape from your dragon's lair in particular. The game of chess, is like a swordfight, you must think first before you move. Leave it up to me while I be livin' proof I smoke on the mic like smoking Joe Frazier, the hell raiser, raising hell with the flavor. Step through your section with the Force like Luke Skywalker, rhyme author, orchestrate mind torture. Feeling mad hostile, ran the apostle, flowing like Christ when I speak the gospel. Well I'm a sire, I set the microphone on fire, rap styles vary and carry like Mariah. I grew up on the crime side, the New York Times side, Stayin' alive was no jive.</p>
      </div>
      <template #footer>
        <button class="button button--cta" @click="model = false">Click me</button>
      </template>
    </f-modal>

    <section-header label="Documentation" />

    <h4>Token</h4>
    <show-token :token="token" />

    <h4 class="mt-64 mb-16">Props</h4>
    <docs-table>
      <tr>
        <td>v-model</td>
        <td>
          <div>boolean</div>
          <div class="annotation">Whether or not to show the modal</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>left</td>
        <td>
          <div>boolean | object</div>
          <div class="annotation">When truthy, will show the left button of the header. Object properties will be used as attributes on the button.</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>right</td>
        <td>
          <div>boolean | object</div>
          <div class="annotation">When truthy, will show the right button of the header. Object properties will be used as attributes on the button.</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>title</td>
        <td>
          <div>string</div>
          <div class="annotation"></div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>titleAttrs</td>
        <td>
          <div>Object</div>
          <div class="annotation">Properties will be set as attributes of the title in the header</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>headerClasses</td>
        <td>
          <div>string | object</div>
          <div class="annotation">Classes here will be set on the wrapper for the header</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>contentId</td>
        <td>
          <div>string</div>
          <div class="annotation">This id is useful if you need to programatically scroll content in the modal</div>
        </td>
        <td></td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Slots</h4>
    <p class="border-l-8 bg-green-50 border-green-700 p-16 rounded-4 mb-16 text-12">Note that to dynamically control the left/right slots, one must use the left/right props instead of showing and hiding the slot itself.</p>
    <docs-table>
      <template #titles>
        <th>name</th>
        <th>use</th>
      </template>
      <tr>
        <td>default</td>
        <td class="annotation">Content for the modal</td>
      </tr>
      <tr>
        <td>footer</td>
        <td class="annotation">Footer (button drawer) for the modal - the footer is sticky</td>
      </tr>
      <tr>
        <td>left</td>
        <td class="annotation">Overrides the default icon (a back arrow)</td>
      </tr>
      <tr>
        <td>right</td>
        <td class="annotation">Overrides the default icon (an X symbol)</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Events</h4>
    <docs-table>
      <template #titles>
        <th>name</th>
        <th>when</th>
      </template>
      <tr>
        <td>dismiss</td>
        <td class="annotation">A user presses ESC or clicks outside the dialog</td>
      </tr>
      <tr>
        <td>left</td>
        <td class="annotation">The left title-button has been clicked</td>
      </tr>
      <tr>
        <td>right</td>
        <td class="annotation">The right title-button has been clicked</td>
      </tr>
      <tr>
        <td>shown</td>
        <td class="annotation">Modal entrance transitions are complete and content has been mounted</td>
      </tr>
      <tr>
        <td>hidden</td>
        <td class="annotation">Modal exit transitions are complete and content has been torn down or hidden</td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Custom Properties</h4>
    <p class="border-l-8 bg-red-50 border-red-700 p-16 rounded-4 mb-16 text-12">Use percentage-based units as opposed to <code>vh</code> for adjusting heights. This ensures correct behavior on mobile devices when toolbars show/hide and cause changes to the inner height.</p>
    <docs-table>
      <template #titles>
        <th>name</th>
        <th>notes</th>
      </template>
      <tr>
        <td>--f-modal-max-height</td>
        <td class="annotation">The max-height of the modal dialog</td>
      </tr>
      <tr>
        <td>--f-modal-height</td>
        <td class="annotation">The height of the modal dialog</td>
      </tr>
      <tr>
        <td>--f-modal-width</td>
        <td class="annotation">The max-width of the modal dialog</td>
      </tr>
    </docs-table>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { fModal } from '#components'
import Setup from '../Setup.vue'

const heightToggle = ref(false)
const demoStyles = computed(() => ({
  '--f-modal-max-height': heightToggle.value ? '100%' : '64%',
  '--f-modal-height': '100%'
}))
const changeHeight = () => heightToggle.value = !heightToggle.value
const show = ref(false)
const model = ref(false)
const token =
`<f-modal @dismiss="modalIsOpen = false" v-model="modalIsOpen">
  <h1>Hello I am a modal</h1>
</f-modal>`
</script>
