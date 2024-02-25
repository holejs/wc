import type { StoryObj } from '@storybook/web-components'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { when } from 'lit/directives/when.js'
import { html } from 'lit'

import '@holejs/wc-ripple'
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
      href=${args.href}
      target=${args.target}
      rel=${args.rel}
      ?rounded=${args.rounded}
      ?fullwidth=${args.fullwidth}
      ?uppercase=${args.uppercase}
      ?lowercase=${args.lowercase}
      ?capitalize=${args.capitalize}
      ?disabled=${args.disabled}
    >
      ${when(args._ripple, () => html`<hwc-ripple></hwc-ripple>`)}

      ${
        when(
          args.appearance === 'icon' || args.appearance === 'fab',
          () => html`
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-telescope"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 21l6 -5l6 5"></path>
              <path d="M12 13v8"></path>
              <path d="M3.294 13.678l.166 .281c.52 .88 1.624 1.265 2.605 .91l14.242 -5.165a1.023 1.023 0 0 0 .565 -1.456l-2.62 -4.705a1.087 1.087 0 0 0 -1.447 -.42l-.056 .032l-12.694 7.618c-1.02 .613 -1.357 1.897 -.76 2.905z"></path>
              <path d="M14 5l3 5.5"></path>
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
    disabled: {
      control: 'boolean',
      description: 'This Boolean attribute prevents the user from interacting with the button: it cannot be pressed or focused.'
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
    },
    href: {
      control: 'text',
      description: 'The URL that the hyperlink points to.'
    },
    target: {
      control: 'text',
      description: 'Specifies where to display the linked URL.'
    },
    rel: {
      control: 'text',
      description: 'Specifies the relationship between the current document and the linked URL.'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $hwcbutton = canvas.getByRole<HWCButton>('button', { name: BUTTON_TEXT_CONTENT })

    expect($hwcbutton).toBeInTheDocument()
    expect($hwcbutton.appearance).toBe('raised')
    // expect($hwcbutton).toHaveAttribute('type', 'button')
    expect($hwcbutton).toHaveAttribute('role', 'button')
    expect($hwcbutton).toBeVisible()
    expect($hwcbutton.uppercase).toBeFalsy()
    expect($hwcbutton.lowercase).toBeFalsy()
    expect($hwcbutton.capitalize).toBeFalsy()
    expect($hwcbutton.color).toBeUndefined()
    expect($hwcbutton.elevation).toBeUndefined()
  }
}

export const Outlined: Story = {
  args: {
    appearance: 'outlined',
    color: 'orange-darken-2'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $hwcbutton = canvas.getByRole<HWCButton>('button', { name: BUTTON_TEXT_CONTENT })

    expect($hwcbutton).toBeInTheDocument()
    expect($hwcbutton).toHaveAttribute('appearance', 'outlined')
    // expect($hwcbutton).toHaveAttribute('type', 'button')
    expect($hwcbutton).toHaveAttribute('role', 'button')
    expect($hwcbutton).toBeVisible()

    const $button = $hwcbutton.shadowRoot?.querySelector('button')

    expect($button).toBeInTheDocument()
    expect($button).toHaveAttribute('type', 'button')
    expect($button).toHaveStyle({
      'background-color': 'rgba(0, 0, 0, 0)',
      color: 'rgb(245, 124, 0)',
      'border-width': '2px',
      'border-style': 'solid',
      'border-color': 'rgb(245, 124, 0)'
    })
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
    // expect($button).toHaveStyle({ 'background-color': 'rgb(211, 47, 47)' })
  }
}

export const Ripple: Story = {
  args: {
    color: 'pink-darken-2',
    rounded: true,
    _ripple: true
  } as any
}

export const Fab: Story = {
  args: {
    appearance: 'fab',
    color: 'orange-lighten-4'
  }
}

export const Icon: Story = {
  args: {
    appearance: 'icon',
    color: 'indigo-darken-2'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    color: 'brown-darken-2'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $hwcbutton = canvas.getByRole('button', { name: BUTTON_TEXT_CONTENT })

    expect($hwcbutton).toBeInTheDocument()
    expect($hwcbutton).toHaveAttribute('aria-disabled', 'true')
    expect($hwcbutton).toBeDisabled()
    expect($hwcbutton).toHaveStyle({
      opacity: '0.5',
      'pointer-events': 'none',
      'user-select': 'none'
    })

    const $button = $hwcbutton.shadowRoot?.querySelector('button')

    expect($button).toBeInTheDocument()
    expect($button).toHaveAttribute('disabled')
  }
}

export const Gradient: Story = {
  args: {
    elevation: '1',
    href: 'https://www.instagram.com',
    target: '_blank'
  },
  render: ({
    disabled,
    elevation,
    fullwidth,
    rounded,
    capitalize,
    lowercase,
    uppercase,
    href,
    target,
    rel
  }: HWCButton) => html`
    <style>
      .electric-violet__bg {
        --hwc-button-background: #833ab4;
        --hwc-button-background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);
        --hwc-button-background: linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);
      }
    </style>

    <hwc-button
      class="electric-violet__bg"
      elevation=${elevation}
      href=${href}
      target=${target}
      rel=${rel}
      ?capitalize=${capitalize}
      ?lowercase=${lowercase}
      ?uppercase=${uppercase}
      ?fullwidth=${fullwidth}
      ?rounded=${rounded}
      ?disabled=${disabled}
    >
      <hwc-ripple></hwc-ripple>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-brand-instagram"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M16.5 7.5l0 .01"></path>
      </svg>

      <span style="margin-left: 10px;">Instagram</span>
    </hwc-button>
  `
}
