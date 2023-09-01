import { escapeHTML, uid, updateId } from '../../../src/utils'
import { mergeProps, h } from 'vue'

export function createSVG(
  name,
  { contents, attrs: { id, ...intrinsicAttrs } }
) {
  return {
    name,
    inheritAttrs: false,
    setup(_, { attrs: { title, ...attrs } }) {
      const instanceId = uid()

      return () =>
        h(
          'svg',
          mergeProps(
            {
              ...intrinsicAttrs,
              focusable: attrs.tabindex !== '0' ? 'false' : null,
              innerHTML:
                (title ? `<title>${escapeHTML(title)}</title>` : '') +
                updateId(contents, id, instanceId),
            },
            attrs
          )
        )
    },
  }
}
