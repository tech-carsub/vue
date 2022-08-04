import fBreadcrumbs, { fBreadcrumbSeparator } from './f-breadcrumbs.vue'
import { installer } from '#util'

export const Breadcrumbs = { install: installer([fBreadcrumbs]) }
export { fBreadcrumbs, fBreadcrumbSeparator }
