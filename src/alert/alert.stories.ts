import type { StoryObj } from '@storybook/web-components'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import './alert.js'

const ALERT_TEXT_CONTENT = "I'm an Alert Usage Example!"

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Alert',
  tags: ['autodocs'],
  render: (args: any) => html`
    <hwc-alert
      appearance=${args.appearance}
      .type=${args.type}
      .color=${args.color}
      ?dismissible=${args.dismissible}
    >${ALERT_TEXT_CONTENT}</hwc-alert>
  `,
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['filled', 'outlined', 'text'],
      description: 'Allows you to modify the appearance of the component. Currently the available values are the following: `filled`, `outlined` y `text`.'
    },
    color: {
      control: 'color',
      description: 'The color property allows you to modify the color of the component.'
    },
    dismissible: {
      control: 'boolean',
      description: 'Add a button that allows you to interactively close the component by clicking it.'
    },
    type: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Allows you to modify the intent of the component. Currently the available values are the following: `info`, `success`, `warning` y `error`.'
    }
  }
}

export default meta

// eslint-disable-next-line no-undef
type HWCAlert = HTMLElementTagNameMap['hwc-alert']

type Story = StoryObj<HWCAlert>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Filled: Story = {
  args: {
    appearance: 'filled'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $alert = canvas.getByText<HWCAlert>(ALERT_TEXT_CONTENT)

    const $button = $alert.shadowRoot?.querySelector('hwc-button')

    expect($alert).toBeInTheDocument()
    expect($button).toBeNull()
    expect($alert.appearance).toBe('filled')
    expect($alert.type).toBeUndefined()
    expect($alert.color).toBeUndefined()
    expect($alert.dismissible).toBeFalsy()
  }
}

export const Outlined: Story = {
  args: {
    appearance: 'outlined',
    type: 'warning'
  }
}

export const Text: Story = {
  args: {
    appearance: 'text',
    type: 'success'
  }
}

export const Dismissible: Story = {
  args: {
    type: 'error',
    dismissible: true
  }
}

export const Colored: Story = {
  args: {
    appearance: 'text',
    color: 'purple-darken-2',
    dismissible: true
  }
}
