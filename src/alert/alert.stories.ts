import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import './alert.js'

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Alert',
  tags: ['autodocs'],
  render: (args: any) => html`
    <hwc-alert
      appearance=${args.appearance}
      type=${args.type}
      .color=${args.color}
      ?dismissible=${args.dismissible}
    >
      I'm an Alert Usage Example!
    </hwc-alert>
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
type Story = StoryObj<HTMLElementTagNameMap['hwc-alert']>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Filled: Story = {
  args: {}
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
