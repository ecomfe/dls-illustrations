import { escapeHTML } from '../../../src/utils'

export function createSVG(name, { contents, attrs }) {
  const component = ({ title, ...props }) => {
    const { tabIndex } = props
    const markup = {
      __html: (title ? `<title>${escapeHTML(title)}</title>` : '') + contents,
    }

    return (
      <svg
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
