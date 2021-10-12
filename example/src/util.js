import { h } from 'vue'

export const ShowToken = (props) => h('p', {
  class: 'token text-12 text-aqua-800 mt-16 p-16 bg-gray-100 rounded-4 overflow-scroll'
}, props.token)

export const VariantHeading = (props) => h('h4', {
  class: 'h4 inline-block text-aqua-600 mt-32 mb-12 py-4 px-8 border-aqua-500 border border-l-0 border-r-0'
}, props.label)

const headerClasses = { class: 'h3 mb-32 mt-64 border-b-2  pb-8' }
export const SectionHeader = (props) =>  h('h3', headerClasses, props.label)
export const ExampleHeader = (props) =>  h('h3', headerClasses,
  h('a', { class: 'text-gray-700', href: `https://github.com/fabric-ds/vue/tree/main/example/src/examples/${props.name}.vue` }, props.label)
)

export const PropsNotice = () => h('p', { class: 'text-12 mb-32' }, 'The props documented below have defaults set or are unique to this component, all typical HTML5 attributes are valid props. See Field for additional props.')
