export const install = (components) => (app) => components.forEach(c => app.component(c.name, c)) }
