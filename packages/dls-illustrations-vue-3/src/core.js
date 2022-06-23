import { escapeHTML } from '../../../src/utils'
import { mergeProps, h } from 'vue'

export function createSVG(name, { contents, attrs: intrinsicAttrs }) {
  return {
    name,
    inheritAttrs: false,
    setup(_, { attrs: { title, ...attrs } }) {
      return () =>
        h(
          'svg',
          mergeProps(
            {
              ...intrinsicAttrs,
              focusable: attrs.tabindex !== '0' ? 'false' : null,
              innerHTML:
                (title ? `<title>${escapeHTML(title)}</title>` : '') + contents,
            },
            attrs
          )
        )
    },
  }
}
