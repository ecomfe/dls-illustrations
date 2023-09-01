import { forwardRef, useState } from 'react'
import { escapeHTML, uid, updateId } from '../../../src/utils'

export function createSVG(
  name,
  { contents, attrs: { class: classAttr, id, ...attrs } }
) {
  const Illustration = forwardRef(({ title, className, ...props }, ref) => {
    const { tabIndex } = props
    const [instanceId] = useState(uid())
    const markup = {
      __html:
        (title ? `<title>${escapeHTML(title)}</title>` : '') +
        updateId(contents, id, instanceId),
    }

    return (
      <svg
        className={[classAttr, className].filter(Boolean).join(' ') || null}
        {...attrs}
        focusable={tabIndex !== '0' ? false : null}
        dangerouslySetInnerHTML={markup}
        ref={ref}
        {...props}
      />
    )
  })

  Illustration.displayName = name

  return Illustration
}
