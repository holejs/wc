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
  render: (args: any) => html`
    <hwc-text-field
      appearance=${args.appearance || 'outlined'}
      color=${args.color || 'blue-darken-2'}
      label=${args.label || ''}
      placeholder=${args.placeholder || ''}
      type=${args.type || 'text'}
      name=${args.name || ''}
      ?autofocus=${args.autofocus || false}
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
