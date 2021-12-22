import fField from './f-field.vue'
import fInput from './f-input.vue'
import fSelect from './f-select.vue'
import fTextarea from './f-textarea.vue'
import fToggle from './f-toggle.vue'
import fForm from './f-form.vue'
import fSuffix from './f-suffix.vue'
import fAffix from './f-affix.vue'
import { installer } from '#util'

export const Forms = { install: installer([fField, fInput, fSelect, fTextarea, fToggle, fForm, fSuffix, fAffix]) }
export * from './validation'
export { fInput, fSelect, fTextarea, fToggle, fField, fForm, fSuffix, fAffix }
