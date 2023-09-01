import { escapeHTML, uid, updateId } from '../../../src/utils'

export function createSVG(
  name,
  { contents, attrs: { class: className, id, ...intrinsicAttrs } }
) {
  return {
    name,
    inheritAttrs: false,
    created() {
      this.instanceId = uid()
    },
    render(h) {
      const { title, ...attrs } = this.$attrs
      const { tabindex } = attrs

      return h('svg', {
        class: className,
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
        on: this.$listeners,
      })
    },
  }
}
