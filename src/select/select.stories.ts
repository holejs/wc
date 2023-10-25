import { userEvent, within, fireEvent } from '@storybook/testing-library'
import type { StoryObj } from '@storybook/web-components'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import '../button/button.js'

import './select-option.js'
import './select.js'

// eslint-disable-next-line no-undef
type HWCSelect = HTMLElementTagNameMap['hwc-select']

type Story = StoryObj<HWCSelect>;

const _onHandleSubmit = (ev: Event): void => {
  ev.preventDefault()

  const formData = new FormData(ev.target as HTMLFormElement)

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`)
  })
}

const _onHandleChange = (ev: Event): void => {
  const $select = ev.target as HWCSelect

  const value = $select.value

  console.log('value: ', value)
}

const meta = {
  title: 'Example/Selects',
  tags: ['autodocs'],
  render: ({
    name,
    label,
    color,
    hint,
    rules,
    multiple = false,
    disabled = false,
    readonly = false
  }: any) => html`
    <div>
      <style>
        .container__option {
          display: flex;
          align-items: center;
        }
        .container__option span {
          height: 15px;
          width: 15px;
          border-radius: 3px;
        }
        .container__option p {
          margin: 0;
          margin-left: 10px;
        }
      </style>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8">
            <form @submit=${_onHandleSubmit}>
              <div class="row">
                <div class="col-12 py-3">
                  <hwc-select
                    name=${name}
                    label=${label}
                    color=${color}
                    hint=${hint}
                    rules=${rules}
                    ?multiple=${multiple}
                    ?disabled=${disabled}
                    ?readonly=${readonly}
                    data-error-message-required="The field is required."
                    @change=${_onHandleChange}
                  >
                    <hwc-select-option value="violet">
                      <div class="container__option">
                        <span style="background: #963ec5;"></span>
                        <p>Chinese Violet</p>
                      </div>
                    </hwc-select-option>
                    <hwc-select-option value="blue">
                      <div class="container__option">
                        <span style="background: #493ec5;"></span>
                        <p>Doguer Blue</p>
                      </div>
                    </hwc-select-option>
                    <hwc-select-option value="turquoise">
                      <div class="container__option">
                        <span style="background: #3ec5c5;"></span>
                        <p>Turquoise</p>
                      </div>
                    </hwc-select-option>
                    <hwc-select-option value="red">
                      <div class="container__option">
                        <span style="background: #c53e43;"></span>
                        <p>Redsunset</p>
                      </div>
                    </hwc-select-option>
                  </hwc-select>
                </div>

                <div class="col-12">
                  <hwc-button type="reset" appearance="text">Reset</hwc-button>
                  <hwc-button type="submit">Submit</hwc-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the select.'
    },
    label: {
      control: 'text',
      description: 'The label of the select.'
    },
    hint: {
      control: 'text',
      description: 'Provides a hint or instruction to help the user complete the field.'
    },
    color: {
      control: 'color',
      description: 'The color of the select.'
    },
    multiple: {
      control: 'boolean',
      description: 'If true, the user can select multiple options.'
    },
    rules: {
      control: 'string',
      description: 'The validation rules to apply to the select.'
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the select is disabled.'
    },
    readonly: {
      control: 'boolean',
      description: 'If true, the select is readonly.'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {
    name: 'colors',
    label: 'Color',
    hint: 'Select your favorite color.',
    rules: 'required'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const $form = document.querySelector('form') as HTMLFormElement
    const $reset = canvas.getByRole('button', { name: 'Reset' })

    const $select = canvas.getByRole('combobox', { name: 'Color' })

    const $options = canvas.getAllByRole('option')

    // Validate the select exist and is visible.
    await step('Validate the select exist and is visible.', () => {
      expect($select).toBeInTheDocument()
      expect($select).toBeVisible()
      expect($select).toHaveAttribute('aria-expanded', 'false')
      expect($select).toHaveAttribute('aria-invalid', 'false')
      expect($select).toHaveAttribute('aria-disabled', 'false')
    })

    // Validate the form is invalid.
    await step('Validate the form is invalid.', () => {
      expect($form.checkValidity()).toBeFalsy()
    })

    // Expand the select.
    await step('Expand the select.', async () => {
      await userEvent.click($select.shadowRoot?.querySelector('button') as HTMLButtonElement)
      expect($select).toHaveAttribute('aria-expanded', 'true')
    })

    // Choose the first option.
    await step('Choose the first option.', async () => {
      await userEvent.click($options[0].shadowRoot?.querySelector('button') as HTMLButtonElement)
      expect($select).toHaveAttribute('aria-expanded', 'false')
      expect($select).toHaveAttribute('aria-invalid', 'false')
    })

    // Validate the form is valid.
    await step('Validate the form is valid.', () => {
      expect($form.checkValidity()).toBeTruthy()
      expect(new FormData($form).get('colors')).toEqual('violet')
    })

    // Reset the form
    await step('Reset the form.', async () => {
      await userEvent.click($reset.shadowRoot?.querySelector('button') as HTMLButtonElement)
      expect($select).toHaveAttribute('aria-expanded', 'false')
      expect($select).toHaveAttribute('aria-invalid', 'false')
    })

    // Expand and close the select.
    await step('Expand and close the select.', async () => {
      await userEvent.click($select.shadowRoot?.querySelector('button') as HTMLButtonElement)
      expect($select).toHaveAttribute('aria-expanded', 'true')

      await userEvent.click($select.shadowRoot?.querySelector('button') as HTMLButtonElement)
      fireEvent.blur($select.shadowRoot?.querySelector('button') as HTMLButtonElement)

      expect($select).toHaveAttribute('aria-expanded', 'false')
    })

    // Validate the select is displayed error message.
    await step('Validate the select is displayed error message.', () => {
      expect($select).toHaveAttribute('aria-invalid', 'true')

      expect($select.shadowRoot?.querySelector('.select__details span')).toHaveTextContent('The field is required.')
    })

    // Expand and select the first option.
    await step('Expand and select the first option.', async () => {
      await userEvent.click($select.shadowRoot?.querySelector('button') as HTMLButtonElement)
      expect($select).toHaveAttribute('aria-expanded', 'true')

      await userEvent.click($options[0].shadowRoot?.querySelector('button') as HTMLButtonElement)
      expect($select).toHaveAttribute('aria-expanded', 'false')
      expect($select).toHaveAttribute('aria-invalid', 'false')
    })

    // Validate the form is valid.
    await step('Validate the form is valid.', () => {
      expect($form.checkValidity()).toBeTruthy()
      expect(new FormData($form).get('colors')).toEqual('violet')
    })
  }
}

export const Multiple: Story = {
  args: {
    name: 'colors',
    label: 'Color',
    multiple: true,
    hint: 'Select your favorite color.',
    rules: 'required|min:2|max:3'
  }
}
