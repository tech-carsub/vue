const getSuffix = () => Date.now().toString(36).slice(5, 8) + '-' + Math.random().toString(36).slice(2, 8)

export const id = { default: () => 'f-' + getSuffix() }
export const absentProp = Symbol()
export const installer = (components) => (app) => components.forEach(c => {
  if (!c.name) throw `Missing name property for ${c}`
  if (app.component(c.name)) return // we already registered the component - e.g. fClickable
  app.component(c.name, c)
})
