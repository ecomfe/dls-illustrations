import { escapeHTML } from '../../../src/utils'

export function createSVG(name, { contents, attrs: {class: classAttr, ...attrs} }) {
  const component = ({ title, className, ...props }) => {
    const { tabIndex } = props
    const markup = {
      __html: (title ? `<title>${escapeHTML(title)}</title>` : '') + contents,
    }

    return (
      <svg
        className={[classAttr, className].filter(Boolean).join(' ') || null}
        {...attrs}
        focusable={tabIndex !== '0' ? false : null}
        dangerouslySetInnerHTML={markup}
        {...props}
      />
    )
  }

  component.displayName = name

  return component
}
