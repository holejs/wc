import type { StoryObj } from '@storybook/web-components'
import { within } from '@storybook/testing-library'
import { when } from 'lit/directives/when.js'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import '../ripple/ripple.js'
import './button.js'

// eslint-disable-next-line no-undef
type HWCButton = HTMLElementTagNameMap['hwc-button']

type Story = StoryObj<HWCButton>;

const BUTTON_TEXT_CONTENT = 'Click me!'

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args: any) => html`
    <hwc-button
      appearance=${args.appearance || 'raised'}
      .type=${args.type || 'button'}
      .color=${args.color}
      .elevation=${args.elevation}
      ?rounded=${args.rounded}
      ?fullwidth=${args.fullwidth}
      ?uppercase=${args.uppercase}
      ?lowercase=${args.lowercase}
      ?capitalize=${args.capitalize}
    >
      ${when(args._ripple, () => html`<hwc-ripple></hwc-ripple>`)}

      ${
        when(
          args.appearance === 'icon' || args.appearance === 'fab',
          () => html`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
              <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
            </svg>
          `,
          () => BUTTON_TEXT_CONTENT
        )
      }
    </hwc-button>
  `,
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['raised', 'outlined', 'text', 'fab', 'icon'],
      description: 'This property allows you to modify the layout of the component. The possible values are: `outlined`, `text`, `fab` & `icon`'
    },
    color: {
      control: 'color',
      description: 'The color property allows you to modify the color of the component.'
    },
    elevation: {
      control: 'inline-radio',
      options: ['0', '1', '2', '3', '4', '5'],
      description: 'This property allows you to apply a visual lift effect to the component, creating a sense of depth and making the button appear to be raised or floating above the surface.'
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset', 'menu']
    },
    fullwidth: {
      control: 'boolean',
      description: 'Is an attribute that makes the button stretch to the full width of its parent container.'
    },
    rounded: {
      control: 'boolean',
      description: 'This property adds pronounced borders to the side of the component.'
    },
    uppercase: {
      control: 'boolean',
      description: 'Shows all text in uppercase.'
    },
    lowercase: {
      control: 'boolean',
      description: 'Displays all text in lowercase.'
    },
    capitalize: {
      control: 'boolean',
      description: 'Displays the first letter of each word in uppercase.'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $hwcbutton = canvas.getByText<HWCButton>(BUTTON_TEXT_CONTENT)

    expect($hwcbutton).toBeInTheDocument()
    expect($hwcbutton.textContent?.trim()).toBe(BUTTON_TEXT_CONTENT)
    expect($hwcbutton.appearance).toBe('raised')
    expect($hwcbutton.type).toBe('button')
    expect($hwcbutton.uppercase).toBeFalsy()
    expect($hwcbutton.lowercase).toBeFalsy()
    expect($hwcbutton.capitalize).toBeFalsy()
    expect($hwcbutton.color).toBeUndefined()
    expect($hwcbutton.elevation).toBeUndefined()

    const $button = $hwcbutton.shadowRoot?.querySelector('button')

    expect($button).toBeInTheDocument()
    expect($button?.type).toBe('button')
  }
}

export const Outlined: Story = {
  args: {
    appearance: 'outlined',
    color: 'orange-darken-2'
  }
}

export const Text: Story = {
  args: {
    appearance: 'text',
    color: 'green-darken-2'
  }
}

export const Rounded: Story = {
  args: {
    rounded: true,
    color: 'teal-darken-2'
  }
}

export const Fullwidth: Story = {
  args: {
    color: 'red-darken-2',
    fullwidth: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $hwcbutton = canvas.getByText<HWCButton>(BUTTON_TEXT_CONTENT)

    expect($hwcbutton).toBeInTheDocument()
    expect($hwcbutton.color).toBe('red-darken-2')
    expect($hwcbutton).toHaveStyle({ display: 'block' })

    const $button = $hwcbutton.shadowRoot?.querySelector('button')

    expect($button).toBeInTheDocument()
    expect($button).toHaveStyle({ 'background-color': 'rgb(211, 47, 47)' })
  }
}

export const Fab: Story = {
  args: {
    appearance: 'fab',
    color: 'purple-darken-4'
  }
}

export const Icon: Story = {
  args: {
    appearance: 'icon',
    color: 'indigo-darken-2'
  }
}
