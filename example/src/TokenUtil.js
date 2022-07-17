const KEY_ESCAPE_REG = /[\s-.:|#@$£*%]/
const MAX_SINGLE_LINE_ARRAY_LENGTH = 3

export function serializeJs (value) {
  const seen = new Set()

  if (value === undefined) {
    return 'undefined'
  }
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
  if (Array.isArray(value)) {
    return printLines(arrayToSourceLines(value, seen))
  }
  if (typeof value === 'object') {
    return printLines(objectToSourceLines(value, seen))
  }
  if (value?.__autoBuildingObject) {
    return value
  }
  if (typeof value === 'function' && value.name) {
    return value.name
  }
  return value.toString()
}

function printLines (lines) {
  return lines.map(line => '  '.repeat(line.spaces) + line.line).join('\n')
}

function objectToSourceLines (object, seen, indentCount = 0) {
  if (seen.has(object)) {
    object = {}
  } else {
    seen.add(object)
  }

  return createLines(indentCount, lines => {
    lines.push('{')
    lines.push(...createLines(1, lines => {
      for (const key in object) {
        const value = object[key]

        let printedKey = key
        if (KEY_ESCAPE_REG.test(key)) {
          printedKey = `'${printedKey}'`
        }

        addLinesFromValue(lines, value, `${printedKey}: `, ',', seen)
      }
    }))
    lines.push('}')
  })
}

function arrayToSourceLines (array, seen, indentCount = 0) {
  if (seen.has(array)) {
    array = []
  } else {
    seen.add(array)
  }

  return createLines(indentCount, lines => {
    const contentLines = createLines(1, lines => {
      for (const value of array) {
        addLinesFromValue(lines, value, '', ',', seen)
      }
    })
    if (contentLines.length === 0) {
      lines.push('[]')
    } else if (contentLines.length <= MAX_SINGLE_LINE_ARRAY_LENGTH && !contentLines.some(line => line.spaces > 1)) {
      const [first] = contentLines
      first.line = contentLines.map(({ line }) => line.substring(0, line.length - 1)).join(', ')
      first.line = `[${first.line}]`
      first.spaces--
      lines.push(first)
    } else {
      lines.push('[', ...contentLines, ']')
    }
  })
}

function createLines (indentCount, handler) {
  const lines = []
  handler(lines)
  return lines.map(line => {
    if (line.spaces != null) {
      line.spaces += indentCount
      return line
    }
    return { spaces: indentCount, line }
  })
}

function addLinesFromValue (lines, value, before, after, seen) {
  let result
  if (Array.isArray(value)) {
    lines.push(...wrap(arrayToSourceLines(value, seen), before, after))
    return
  } else if (value && typeof value === 'object') {
    lines.push(...wrap(objectToSourceLines(value, seen), before, after))
    return
  } else if (typeof value === 'string') {
    result = value.includes('\'') ? `\`${value}\`` : `'${value}'`
  } else if (typeof value === 'undefined') {
    result = 'undefined'
  } else if (value === null) {
    result = 'null'
  } else if (typeof value === 'boolean') {
    result = value ? 'true' : 'false'
  } else {
    result = value
  }
  lines.push(before + result + after)
}

function wrap (lines, before, after) {
  lines[0].line = before + lines[0].line
  lines[lines.length - 1].line += after
  return lines
}

////////////////////////////////////////////////////

export const voidElements = [ 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr', ]

////////////////////////////////////////////////////

export function indent (lines, count = 1) {
  return lines.map(line => `${'  '.repeat(count)}${line}`)
}

export function unindent (code) {
  const lines = code.split('\n')
  let indentLevel = -1
  let indentText
  const linesToAnalyze = lines.filter(line => line.trim().length > 0)
  for (const line of linesToAnalyze) {
    const match = /^\s*/.exec(line)
    if (match && (indentLevel === -1 || indentLevel > match[0].length)) {
      indentLevel = match[0].length
      indentText = match[0]
    }
  }
  const result = []
  for (const line of lines) {
    result.push(line.replace(indentText, ''))
  }
  return result.join('\n').trim()
}

export function createAutoBuildingObject (format, specialKeysHandler, key = '', depth = 0) {
  const cache = {}
  if (depth > 32) return { key, cache, target: {}, proxy: () => key }
  const target = () => {
    const k = key + '()'
    return format ? format(k) : k
  }
  const proxy = new Proxy(target, {
    get (_, p) {
      if (p === '__autoBuildingObject') {
        return true
      }
      if (p === '__autoBuildingObjectGetKey') {
        return key
      }
      if (specialKeysHandler) {
        const fn = specialKeysHandler(target, p)
        if (fn) {
          return fn()
        }
      }
      if (p === 'toString') {
        const k = key + '.toString()'
        return () => format ? format(k) : k
      }
      if (p === Symbol.toPrimitive) {
        return () => format ? format(key) : key
      }
      if (!cache[p]) {
        const childKey = key ? `${key}.${p.toString()}` : p.toString()
        const child = createAutoBuildingObject(format, specialKeysHandler, childKey, depth + 1)
        cache[p] = { key: childKey, ...child }
      }
      return cache[p].proxy
    },
    apply (_, thisArg, args) {
      const k = `${key}(${args.join(', ')})`
      return format ? format(k) : k
    },
  })
  return {
    key,
    cache,
    target,
    proxy,
  }
}
