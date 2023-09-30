import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '../button/button.js'
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
  render: (_args: any) => html`
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
                  <hwc-select name="users">
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
  argTypes: {}
}

export default meta

export const Basic: Story = {
  args: {}
}
