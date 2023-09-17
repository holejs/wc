import { waitFor, within } from '@storybook/testing-library'
import type { StoryObj } from '@storybook/web-components'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import '../button/button.js'
import './text-field.js'

// eslint-disable-next-line no-undef
type HWCTextField = HTMLElementTagNameMap['hwc-text-field']

type Story = StoryObj<HWCTextField>;

const meta = {
  title: 'Example/TextFields',
  tags: ['autodocs'],
  render: (args: any) => html`
    <hwc-text-field
      appearance=${args.appearance || 'outlined'}
      color=${args.color || 'blue-darken-2'}
      label=${args.label || ''}
      placeholder=${args.placeholder || ''}
      type=${args.type || 'text'}
      name=${args.name || ''}
      ?autofocus=${args.autofocus || false}
      ?clearable=${args.clearable || false}
      .value=${args.value || ''}
      hint=${args.hint || ''}
      rules=${args.rules || ''}
      data-error-message-required=${args['data-error-message-required'] || ''}
      data-error-message-minlength=${args['data-error-message-minlength'] || ''}
      data-error-message-maxlength=${args['data-error-message-maxlength'] || ''}
      data-error-message-pattern=${args['data-error-message-pattern'] || ''}
      data-error-message-email=${args['data-error-message-email'] || ''}
    ></hwc-text-field>
  `,
  argTypes: {
    value: {
      control: 'text',
      description: 'Defines the value of the text field.'
    },
    appearance: {
      control: 'inline-radio',
      options: ['underline', 'outlined'],
      description: 'Defines the visual style of the text field. The available values are: `outlined` y `underline`.'
    },
    color: {
      control: 'color',
      description: 'modify the color of the component. You can set colors in different formats: `hex`, `rgb`, `rgba` and `hsl`. (also includes color palette).'
    },
    label: {
      control: 'text',
      description: 'Defines the label of the text field.'
    },
    placeholder: {
      control: 'text',
      description: 'Defines the placeholder of the text field.'
    },
    type: {
      control: 'inline-radio',
      options: [
        'date',
        'datetime',
        'datetime-local',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url'
      ],
      description: 'Defines the type of the text field.'
    },
    name: {
      control: 'text',
      description: 'Defines the name of the text field.'
    },
    autofocus: {
      control: 'boolean',
      description: 'Defines if the text field is focused when the page loads.'
    },
    hint: {
      control: 'text',
      description: 'Provides a hint or instruction to help the user complete the field.'
    },
    clearable: {
      control: 'boolean',
      description: 'Defines if the text field has a clear button.'
    },
    rules: {
      control: 'text',
      description: 'Defines the validation rules of the text field. The available rules are: `required`, `min`, `max`, `minlength`, `maxlength`, `pattern` and `email`.'
    },
    'data-error-message-required': {
      control: 'text',
      description: 'Defines the error message when the text field is required.'
    },
    'data-error-message-min': {
      control: 'text',
      description: 'Defines the error message when the text field does not meet the minimum value.'
    },
    'data-error-message-max': {
      control: 'text',
      description: 'Defines the error message when the text field exceeds the maximum value.'
    },
    'data-error-message-minlength': {
      control: 'text',
      description: 'Defines the error message when the text field does not meet the minimum length.'
    },
    'data-error-message-maxlength': {
      control: 'text',
      description: 'Defines the error message when the text field exceeds the maximum length.'
    },
    'data-error-message-pattern': {
      control: 'text',
      description: 'Defines the error message when the text field does not meet the pattern.'
    },
    'data-error-message-email': {
      control: 'text',
      description: 'Defines the error message when the text field does not meet the email pattern.'
    }
  }
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
  args: {
    label: 'Fullname',
    placeholder: 'Example: Ivan Guevara',
    name: 'fullname',
    hint: 'Enter your fullname'
  }
}

export const Errors: Story = {
  args: {},
  render: (_args: any) => html`
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <form @submit=${_onHandleSubmit}>
          <div class="row">
            <div class="col-12 col-sm-6 py-2">
              <hwc-text-field
                name="first_name"
                label="First Name"
                placeholder="Example: Ivan"
                hint="Enter your first name"
                rules="required|minlength:3|maxlength:10"
                data-error-message-required="This field is required."
                data-error-message-minlength="The field must have at least 3 characters."
                data-error-message-maxlength="The field must have a maximum of 10 characters."
                autofocus
              >
                <span style="display: flex" slot="prepend-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg>
                </span>
              </hwc-text-field>
            </div>
  
            <div class="col-12 col-sm-6 py-2">
              <hwc-text-field
                name="last_name"
                label="Last Name"
                placeholder="Example: Guevara"
                hint="Enter your last name"
                rules="required|minlength:3|maxlength:10"
                data-error-message-required="This field is required."
                data-error-message-minlength="The field must have at least 3 characters."
                data-error-message-maxlength="The field must have a maximum of 10 characters."
              >
                <span style="display: flex" slot="prepend-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg>
                </span>
              </hwc-text-field>
            </div>

            <div class="col-12 py-2">
              <hwc-text-field
                type="email"
                name="email"
                label="Email"
                placeholder="Example: ivan.guevara@domain.com"
                hint="Enter your email"
                rules="required|email"
                data-error-message-required="This field is required."
                data-error-message-email="The email is not valid."
                clearable
              >
                <span style="display: flex" slot="prepend-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                </span>
              </hwc-text-field>
            </div>

            <div class="col-12 py-2">
              <hwc-text-field
                type="password"
                name="password"
                label="Password"
                hint="Enter your password"
                rules="required|pattern:^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
                data-error-message-required="This field is required."
                data-error-message-pattern="The password must have at least 8 characters, a capital letter, a symbol and a number."
                clearable
              >
                <span style="display: flex" slot="prepend-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                </span>
              </hwc-text-field>
            </div>

            <div class="col-12 py-2">
              <hwc-button type="reset" appearance="text" style="margin-right: 10px">Reset</hwc-button>
              <hwc-button type="submit">Submit</hwc-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $firstName = canvas.getByRole<HWCTextField>('textbox', { name: 'First Name' })
    const $lastName = canvas.getByRole<HWCTextField>('textbox', { name: 'Last Name' })
    const $email = canvas.getByRole<HWCTextField>('textbox', { name: 'Email' })
    const $password = canvas.getByRole<HWCTextField>('textbox', { name: 'Password' })

    // Verify that the text field is visible
    expect($firstName).toBeInTheDocument()
    expect($lastName).toBeInTheDocument()
    expect($email).toBeInTheDocument()
    expect($password).toBeInTheDocument()

    // Verify that the text field contains errors
    $firstName.value = 'Iv'
    $lastName.value = 'Gu'
    $email.value = 'ivan@'
    $password.value = '12345'

    await waitFor(() => {
      expect($firstName.shadowRoot?.querySelector('.text-field__details span')).toHaveTextContent('The field must have at least 3 characters.')
      expect($lastName.shadowRoot?.querySelector('.text-field__details span')).toHaveTextContent('The field must have at least 3 characters.')
      expect($email.shadowRoot?.querySelector('.text-field__details span')).toHaveTextContent('The email is not valid.')
      expect($password.shadowRoot?.querySelector('.text-field__details span')).toHaveTextContent('The password must have at least 8 characters, a capital letter, a symbol and a number.')
    })

    // Verify that the text field does not contain errors
    $firstName.value = 'Ivan'
    $lastName.value = 'Guevara'
    $email.value = 'ivan.guevara@domain.com'
    $password.value = 'Hello123@'

    await waitFor(() => {
      expect($firstName.shadowRoot?.querySelector('.text-field__details span')).not.toHaveTextContent('The field must have at least 3 characters.')
      expect($lastName.shadowRoot?.querySelector('.text-field__details span')).not.toHaveTextContent('The field must have at least 3 characters.')
      expect($email.shadowRoot?.querySelector('.text-field__details span')).not.toHaveTextContent('The email is not valid.')
      expect($password.shadowRoot?.querySelector('.text-field__details span')).not.toHaveTextContent('The password must have at least 8 characters, a capital letter, a symbol and a number.')
    })
  }
}
