import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import { HWCAvatar } from './avatar.js'
import './avatar.js'

type Story = StoryObj<HWCAvatar>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Avatar',
  tags: ['autodocs'],
  render: ({ appearance, name, size }: any) => html`
    <hwc-avatar
      appearance=${appearance}
      name=${name}
      size=${size}
    ></hwc-avatar>
  `,
  argTypes: {
    name: {
      control: 'text',
      description: 'The name to be displayed in the avatar. Only the first two initials will be displayed.'
    },
    appearance: {
      control: 'inline-radio',
      options: ['circle', 'square'],
      description: 'The appearance of the avatar. The default value is `circle`.'
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'The size of the avatar. The default value is `medium`.'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {
    name: 'Ivan Guevara',
    appearance: 'circle'
  }
}
