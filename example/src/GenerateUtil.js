export const cleanupExpression = (expr) => expr.replace(/\$setup\./g, '')
function kebabCase(str) {
  return str
    .replace(/_/gu, '-')
    .replace(/\B([A-Z])/gu, '-$1')
    .toLowerCase()
}
export const getTagName = (vnode) => kebabCase(_getTagName(vnode))
function _getTagName(vnode) {
  if (typeof vnode.type === 'string') {
    return vnode.type
  } else if (vnode.type?.__asyncResolved) {
    const asyncComp = vnode.type?.__asyncResolved
    return asyncComp.name ?? getNameFromFile(asyncComp.__file)
  } else if (vnode.type?.name) {
    return vnode.type.name
  } else if (vnode.type?.__file) {
    return getNameFromFile(vnode.type.__file)
  }
  return 'anonymous'
}

function getNameFromFile (file) {
  const parts = /([^/]+)\.vue$/.exec(file)
  return parts
    ? pascalCase(parts[1])
    : 'anonymous'
}

export function serializeAndCleanJs (value) {
  const isAutoBuildingObject = !!value?.__autoBuildingObject
  const result = serializeJs(value)
  return isAutoBuildingObject
    ? [cleanupExpression(result.__autoBuildingObjectGetKey)]
    : cleanupExpression(result).split('\n')
}

export const useGenerateDirective = ({ attrs, multilineAttrs }) => (dirName, dir, valueCode) => {
  let modifiers = ''
  for (const key in dir.modifiers) if (dir.modifiers[key]) modifiers += `.${key}`
  let arg = ''
  if (dir.arg) arg = `:${dir.arg}`
  // Cleanup render code
  if (valueCode) valueCode = valueCode.replace(/^\$(setup|props|data)\./g, '')
  const valueLines = valueCode ? [valueCode] : serializeAndCleanJs(dir.value)
  const attr = []
  const dirAttr = `v-${dirName}${arg}${modifiers}="`
  if (valueLines.length > 1) {
    attr.push(`${dirAttr}${valueLines[0]}`)
    attr.push(...valueLines.slice(1, valueLines.length - 1))
    attr.push(`${valueLines[valueLines.length - 1]}"`)
    multilineAttrs = true
  } else {
    attr.push(`${dirAttr}${valueLines[0] ?? ''}"`)
  }
  attrs.push(attr)
}

// Attributes
export const useAddAttr = ({ attrs, skipProps, multilineAttrs, vnode }) => (prop, value) => {
  if (typeof value !== 'string' || vnode.dynamicProps?.includes(prop)) {
    let directive = ':'
    if (prop.startsWith('on')) directive = '@'
    const arg = directive === '@' ? `${prop[2].toLowerCase()}${prop.slice(3)}` : prop

    // v-model on component
    const vmodelListener = `onUpdate:${prop}`
    if (directive === ':' && vnode.dynamicProps?.includes(vmodelListener)) {
      // Listener
      skipProps.push(vmodelListener)
      const listener = vnode.props[vmodelListener]
      const listenerSource = listener.toString()
      let valueCode
      const result = /\(\$event\) => (.*?) = \$event/.exec(listenerSource)
      if (result) valueCode = result[1]

      // Modifiers
      const modifiersKey = `${prop === 'modelValue' ? 'model' : prop}Modifiers`
      const modifiers = vnode.props[modifiersKey] ?? {}
      skipProps.push(modifiersKey)

      // Directive
      const generateDirective = useGenerateDirective(attrs)
      generateDirective('model', { arg: prop === 'modelValue' ? null : prop, modifiers, value, }, valueCode)
      return
    }

    let serialized
    if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
      // It was formatted from auto building object (slot props)
      serialized = cleanupExpression(value.substring(2, value.length - 2).trim()).split('\n')
    } else if (typeof value === 'function') {
      let code = cleanupExpression(value.toString().replace(/'/g, '\\\'').replace(/"/g, '\''))
      const testResult = /function ([^\s]+)\(/.exec(code)
      if (testResult) {
        // Function name only
        serialized = [testResult[1]]
      } else {
        if (code.startsWith('($event) => ')) {
          // Remove unnecessary `($event) => `
          code = code.substring('($event) => '.length)
        }
        serialized = code.split('\n')
      }
    } else {
      serialized = serializeAndCleanJs(value)
    }
    if (serialized.length > 1) {
      multilineAttrs = true
      const indented = [`${directive}${arg}="${serialized[0]}`]
      indented.push(...serialized.slice(1, serialized.length - 1))
      indented.push(`${serialized[serialized.length - 1]}"`)
      attrs.push(indented)
    } else {
      attrs.push([`${directive}${arg}="${serialized[0]}"`])
    }
  } else if ([vnode?.type?.props?.[prop]?.type?.name, vnode?.type?.props?.[prop]?.name].includes(Boolean.name)) {
    attrs.push([prop])
  } else {
    attrs.push([`${prop}="${value}"`])
  }
}
