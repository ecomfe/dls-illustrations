import { escapeHTML } from '../../../src/utils'

export function createSVG(
  name,
  { contents, attrs: { class: className, ...intrinsicAttrs } }
) {
  return {
    functional: true,
    name,
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
            (title ? `<title>${escapeHTML(title)}</title>` : '') + contents,
        },
        ...rest,
      })
    },
  }
}
