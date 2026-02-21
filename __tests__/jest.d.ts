import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toBeInvalid(): R
      toBeRequired(): R
      toBeValid(): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(html: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(className: string | string[]): R
      toHaveFocus(): R
      toHaveFormValues(values: Record<string, unknown>): R
      toHaveStyle(style: string | Record<string, unknown>): R
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R
      toHaveValue(value: string | number | string[]): R
      toHaveDisplayValue(value: string | string[]): R
      toBePartiallyChecked(): R
      toHaveErrorMessage(message: string): R
      toBeChecked(): R
    }
  }
}

export {}
