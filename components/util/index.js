const prefix = Date.now().toString(36).slice(5, 7) + Math.random().toString(36).slice(2, 5)
let _id = 0

export const id = { default: () => 'f-' + prefix + _id++ }
export const absentProp = Symbol()
export { default as fClickable } from './f-clickable'
