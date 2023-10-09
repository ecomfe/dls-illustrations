export function camelCase(str) {
  return str.replace(/[._-](\w|$)/g, (_, ch) => {
    return ch.toUpperCase()
  })
}

export function upperFirst(str) {
  return str.replace(/^\w/, (m) => m.toUpperCase())
}

export function decorateDeprecated(content, deprecated, html = false) {
  const [start, end] = html ? ['<s>', '</s>'] : ['~', '~']
  return `${deprecated ? start : ''}${content}${deprecated ? end : ''}`
}
