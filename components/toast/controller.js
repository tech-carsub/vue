import { ref, computed } from 'vue'
import { id } from '#util'

const toasts = ref([])
export const shownToasts = computed(() => toasts.value.filter(e => e.value.showing))

const defaults = {
  text: '',
  showing: false,
  duration: 2400,
  timer: null,
  key: null
}

export const createToast = (t) => {
  const toast = ref(t)
  const hide = () => {
    toast.value.showing = false
    const idx = toasts.value.indexOf(toast)
    if (idx > -1) toasts.value.splice(idx, 1)
    clearTimeout(toast.value.timer)
  }
  const show = () => {
    toast.value.showing = true
    if (toast.value.duration) toast.timer = setTimeout(hide, toast.value.duration)
    toasts.value.push(toast)
  }
  toast.value = Object.assign({}, defaults, { hide, show, onClose: hide }, toast.value)
  toast.value.key = id.default()
  return toast
}

export const makeToast = (t) => {
  const toast = createToast(t)
  toast.value.show()
  return toast
}
