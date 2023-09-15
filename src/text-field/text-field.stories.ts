import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '../button/button.js'
import './text-field.js'

// eslint-disable-next-line no-undef
type HWCTextField = HTMLElementTagNameMap['hwc-text-field']

type Story = StoryObj<HWCTextField>;

const meta = {
  title: 'Example/TextFields',
  tags: ['autodocs'],
  render: (_args: any) => html`
    <hwc-text-field></hwc-text-field>
  `,
  argTypes: {}
}

export default meta

const _onHandleSubmit = (e: Event) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement

  const formData = new FormData(form)

  const data = Object.fromEntries(formData.entries())

  console.log(data)
}

export const Basic: Story = {
  args: {}
}

export const Errors: Story = {
  args: {},
  render: (_args: any) => html`
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <form @submit=${_onHandleSubmit}>
          <div class="row">
            <div class="col-12 col-md-6 py-2">
              <hwc-text-field
                name="first_name"
                label="First Name"
                rules="required|minlength:3|maxlength:10"
                autofocus
              ></hwc-text-field>
            </div>
  
            <div class="col-12 col-md-6 py-2">
              <hwc-text-field
                name="last_name"
                label="Last Name"
                rules="required|minlength:3|maxlength:10"
              ></hwc-text-field>
            </div>

            <div class="col-12 py-2">
              <hwc-text-field
                type="email"
                name="email"
                label="Email"
                rules="required|email"
              ></hwc-text-field>
            </div>

            <div class="col-12 py-2">
              <hwc-text-field
                type="password"
                name="password"
                label="Password"
                rules="required|pattern:^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
                data-error-message-pattern="The password must have at least 8 characters, a capital letter, a symbol and a number."
              ></hwc-text-field>
            </div>

            <div class="col-12 py-2">
              <hwc-button type="reset" appearance="text" style="margin-right: 10px">Reset</hwc-button>
              <hwc-button type="submit">Submit</hwc-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
}
