export const checkbox = true
export const radio = true
export const useIsActive = (state) => (name) => state.active === name
export const buildCheckboxState = ({ controls, active }) => controls.reduce((acc, e) => (acc[e.name] = e.name === active, acc), {})
