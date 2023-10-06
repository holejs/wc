import type { StoryObj } from '@storybook/web-components'
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

const meta = {
  title: 'Example/Selects',
  tags: ['autodocs'],
  render: ({
    name,
    label,
    color,
    hint,
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
                    ?multiple=${multiple}
                    ?disabled=${disabled}
                    ?readonly=${readonly}
                  >
                    <hwc-select-option value="violet" selected>
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
    hint: 'Select your favorite color.'
  }
}

export const Multiple: Story = {
  args: {
    name: 'colors',
    label: 'Color',
    multiple: true,
    hint: 'Select your favorite color.'
  }
}
