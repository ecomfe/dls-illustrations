import { escapeHTML, uid, updateId } from '../../../src/utils'

export function createSVG(
  name,
  { contents, attrs: { class: className, id, ...intrinsicAttrs } }
) {
  return {
    name,
    created () {
      this.instanceId = uid()
    },
    render(h, { data = {} }) {
      const {
        staticClass,
        class: dynamicClass,
        attrs: { title, ...attrs } = {},
        ...rest
      } = data
      const { tabindex } = attrs

      return h('svg', {
        class: [className, staticClass, dynamicClass],
        attrs: {
          ...intrinsicAttrs,
          focusable: tabindex !== '0' ? 'false' : null,
          ...attrs,
        },
        domProps: {
          innerHTML:
            (title ? `<title>${escapeHTML(title)}</title>` : '') +
            updateId(contents, id, this.instanceId),
        },
        ...rest,
      })
    },
  }
}
