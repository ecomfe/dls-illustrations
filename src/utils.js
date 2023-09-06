import { nanoid } from 'nanoid/non-secure'

const ESCAPE_MAP = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '&': '&amp;',
}

export function escapeHTML(html) {
  return html.replace(/[<>"&]/g, (c) => ESCAPE_MAP[c] || c)
}

export function uid() {
  return nanoid(5)
}

export function updateId(content, id, instanceId) {
  const re = new RegExp(`dls-${id}`, 'g')
  return content.replace(re, `dls-${id}-${instanceId}`)
}
