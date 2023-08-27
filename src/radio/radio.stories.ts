import type { StoryObj } from '@storybook/web-components'
// import { within } from '@storybook/testing-library'
// import { when } from 'lit/directives/when.js'
// import { expect } from '@storybook/jest'
import { html } from 'lit'

import '../button/button.js'
import './radio.js'

// eslint-disable-next-line no-undef
type HWCRadio = HTMLElementTagNameMap['hwc-radio']

type Story = StoryObj<HWCRadio>;

// const BUTTON_TEXT_CONTENT = 'Click me!'

const _handleSubmit = (event: Event) => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  console.log(form.checkValidity())

  const formData = new FormData(form)

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`)
  })
}

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Radio',
  tags: ['autodocs'],
  render: (args: any) => html`
    <main>
      <form @submit=${_handleSubmit}>
        <hwc-radio name="color" color=${args.color} value="green" rules="required">
          Green
        </hwc-radio>
  
        <hwc-radio name="color" color=${args.color} value="blue" rules="required">
          Blue
        </hwc-radio>
  
        <hwc-radio name="color" color=${args.color} value="yellow" rules="required">
          Yellow
        </hwc-radio>

        <hwc-button type="submit">Submit</hwc-button>
      </form>
    </main>
  `,
  argTypes: {
    color: {
      control: 'color',
      description: 'Color of the radio button'
    },
    name: {
      control: 'text',
      description: 'Name of the radio button'
    },
    value: {
      control: 'text',
      description: 'Value of the radio button'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked or not'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {
    color: 'orange-darken-2',
    name: 'color'
  }
}
