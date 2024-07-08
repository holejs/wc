import { expect, userEvent, within } from '@storybook/test'
import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import './chip.js'

// eslint-disable-next-line no-undef
type HWCChip = HTMLElementTagNameMap['hwc-chip']

type Story = StoryObj<HWCChip>;

const CHIP_TEXT_CONTENT = "Guns N' Roses" as const

const meta = {
  title: 'Example/Chip',
  tags: ['autodocs'],
  render: (args: any) => html`
    <hwc-chip
      appearance=${args.appearance || 'filled'}
      size=${args.size}
      .color=${args.color}
      ?rounded=${args.rounded}
      ?closable=${args.closable}
    >${CHIP_TEXT_CONTENT}</hwc-chip>
  `,
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['filled', 'outlined', 'text'],
      description: 'This property is useful when you want to modify the appearance of the component. Currently the available values are the following: `filled`, `outlined` y `text`.'
    },
    size: {
      control: 'inline-radio',
      options: ['x-small', 'small', 'regular', 'large', 'x-large'],
      description: 'This property is used when you want to change the size of the component. Currently the available values are the following: `x-small`, `small`, `regular`, `large` y `x-large`.'
    },
    color: {
      control: 'color',
      description: 'The color property allows you to modify the color of the component.'
    },
    rounded: {
      control: 'boolean',
      description: 'This property allows you to add sharp edges to components.'
    },
    closable: {
      control: 'boolean',
      description: 'If true, the chip will be closable.'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $chip = canvas.getByText<HWCChip>(CHIP_TEXT_CONTENT)

    expect($chip).toBeInTheDocument()
    expect($chip.appearance).toBe('filled')
    expect($chip.rounded).toBeFalsy()
    expect($chip.closable).toBeFalsy()
    expect($chip.color).toBeUndefined()
  }
}

export const Outlined: Story = {
  args: {
    appearance: 'outlined',
    color: 'green-darken-1'
  }
}

export const Rounded: Story = {
  args: {
    appearance: 'text',
    rounded: true,
    color: 'orange-darken-1'
  }
}

export const Closable: Story = {
  args: {
    rounded: true,
    closable: true,
    color: 'purple-darken-2'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $chip = canvas.getByText<HWCChip>(CHIP_TEXT_CONTENT)

    expect($chip).toBeInTheDocument()
    expect($chip.appearance).toBe('filled')
    expect($chip.color).toBe('purple-darken-2')
    expect($chip.rounded).toBeTruthy()
    expect($chip.closable).toBeTruthy()

    const $hwcbutton = $chip.shadowRoot?.querySelector('hwc-button')
    const $svg = $hwcbutton?.querySelector('svg')

    expect($hwcbutton).toBeInTheDocument()
    expect($svg).toBeInTheDocument()

    await userEvent.click($hwcbutton!)

    expect($chip).not.toBeInTheDocument()
  }
}
