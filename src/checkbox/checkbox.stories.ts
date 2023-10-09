import { within, fireEvent } from '@storybook/testing-library'
import type { StoryObj } from '@storybook/web-components'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import '../button/button.js'
import './checkbox.js'

// eslint-disable-next-line no-undef
type HWCCheckbox = HTMLElementTagNameMap['hwc-checkbox']

type Story = StoryObj<HWCCheckbox>;

const _onHandleSubmit = (event: Event): void => {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  formData.forEach((value, key) => {
    console.log(key, value)
  })
}

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Checkboxes',
  tags: ['autodocs'],
  render: ({
    name,
    rules,
    color,
    disabled,
    'data-error-message-required': errorMessageRequired
  }: any) => html`
    <form @submit=${_onHandleSubmit}>
      <hwc-checkbox
        name=${name}
        rules=${rules}
        color=${color}
        ?disabled=${disabled}
        data-error-message-required=${errorMessageRequired}
      >
        Accept terms and conditions.
      </hwc-checkbox>

      <div style="margin-top: 20px">
        <hwc-button type="reset" appearance="text">Reset</hwc-button>
        <hwc-button type="submit">Submit</hwc-button>
      </div>
    </form>
  `,
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the field.'
    },
    rules: {
      control: 'text',
      description: 'The rules to validate the field.'
    },
    color: {
      control: 'color',
      description: 'The color of the checkbox.'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {
    name: 'terms',
    rules: 'required',
    color: 'blue-darken-2',
    'data-error-message-required': 'Accept the terms and conditions to advance.'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const $form = document.querySelector('form') as HTMLFormElement

    const $checkbox = canvas.getByRole<HWCCheckbox>('checkbox', { name: 'Accept terms and conditions.' })

    // Validate the checkbox is in the document and is visible.
    await step('Checkbox is in the DOM', () => {
      expect($checkbox).toBeInTheDocument()
      expect($checkbox).toBeVisible()
      expect($checkbox).toHaveAttribute('aria-invalid', 'false')
      expect($checkbox).toHaveAttribute('aria-disabled', 'false')
    })

    // Validate the form is invalid.
    await step('Form is invalid', () => {
      expect($form).toBeInvalid()
    })

    // Make focus and blur on the checkbox.
    await step('Focus and blur on the checkbox', async () => {
      fireEvent.focus($checkbox.shadowRoot?.querySelector('input') as HTMLInputElement)
      fireEvent.blur($checkbox.shadowRoot?.querySelector('input') as HTMLInputElement)
    })

    // Validate the checkbox displays an error message.
    await step('Checkbox displays an error message', () => {
      expect($checkbox).toHaveAttribute('aria-invalid', 'true')
      expect($checkbox).toHaveAttribute('aria-checked', 'false')
      expect($checkbox.shadowRoot?.querySelector('.checkbox__details span')).toHaveTextContent('Accept the terms and conditions to advance.')
    })

    // Reset the form.
    await step('Reset the form', async () => {
      fireEvent.reset($form)
    })

    // Validate the checkbox is not displaying an error message.
    await step('Checkbox is not displaying an error message', () => {
      expect($checkbox).toHaveAttribute('aria-invalid', 'false')
      expect($checkbox).toHaveAttribute('aria-checked', 'false')
      expect($checkbox.shadowRoot?.querySelector('.checkbox__details span')).not.toBeInTheDocument()
    })

    // Check the checkbox.
    await step('Check the checkbox', async () => {
      fireEvent.click($checkbox.shadowRoot?.querySelector('input') as HTMLInputElement)
    })

    // Validate the form is valid.
    await step('Form is valid', () => {
      expect($form).toBeValid()
      expect(new FormData($form).get('terms')).toBe('on')
      expect($checkbox).toHaveAttribute('aria-invalid', 'false')
      expect($checkbox).toHaveAttribute('aria-checked', 'true')
    })
  }
}
