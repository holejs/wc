import { expect, userEvent, within } from '@storybook/test'
import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '../text-field/text-field.js'
import '../select//select-option.js'
import '../select/select.js'
import '../button/button.js'
import './dialog.js'

// eslint-disable-next-line no-undef
type HWCDialog = HTMLElementTagNameMap['hwc-dialog']

type Story = StoryObj<HWCDialog>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Dialogs',
  tags: ['autodocs'],
  argTypes: {
    persistent: {
      control: 'boolean',
      description: 'If true, the dialog will not close when clicking outside it.'
    },
    fullscreen: {
      control: 'boolean',
      description: 'If true, the dialog will be fullscreen.'
    }
  }
}

export default meta

const _onOpenModal = () => {
  const dialog = document.querySelector('hwc-dialog')!
  dialog.open()
}

const _onCloseModal = () => {
  const dialog = document.querySelector('hwc-dialog')!
  dialog.close()
}

const _onHandleSubmit = (ev: Event) => {
  ev.preventDefault()

  const $form = ev.target as HTMLFormElement

  const formData = new FormData($form)

  const data = Object.fromEntries(formData.entries())

  alert(JSON.stringify(data))
}

export const Basic: Story = {
  args: {},
  render: ({ persistent, fullscreen }) => html`
    <style>
      h1, p {
        margin: 0;
        font-family: 'Nunito Sans', sans-serif;
      }

      h1 {
        margin-bottom: 10px;
      }

      p {
        color: var(--hwc-grey-darken-1);
      }
    </style>

    <div style="display: flex; justify-content: center;">
      <hwc-button @click=${_onOpenModal}>
        Open dialog
      </hwc-button>
    </div>

    <hwc-dialog ?persistent=${persistent} ?fullscreen=${fullscreen}>
      <h1>Dialog title</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam ultricies, urna id aliquet tincidunt, nisl justo
        lacinia massa, eu lacinia nunc nisi sed ex.
      </p>

      <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
        <hwc-button appearance="text" @click=${_onCloseModal}>Close</hwc-button>
        <hwc-button @click=${_onCloseModal}>Confirm</hwc-button>
      </div>
    </hwc-dialog>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const $hwcbutton = canvas.getByRole('button', { name: 'Open dialog' })

    const $button = $hwcbutton.shadowRoot!.querySelector('button')!

    await step('Open dialog', async () => {
      await userEvent.click($button)
    })

    const $hwcDialog = canvas.getByRole<HWCDialog>('dialog')

    const $dialog = $hwcDialog.shadowRoot!.querySelector('dialog')!

    // Check if dialog is open
    await step('Check if dialog is open', async () => {
      expect($dialog.open).toBeTruthy()
    })

    // Close dialog
    await step('Close dialog', async () => {
      const $closeButton = canvas.getByRole('button', { name: 'Close' })

      const $button = $closeButton.shadowRoot!.querySelector('button')!

      await userEvent.click($button)

      expect($dialog.open).toBeFalsy()
    })
  }
}

export const Forms: Story = {
  render: ({ persistent, fullscreen }) => html`
    <style>
      h1, p {
        margin: 0;
        font-family: 'Nunito Sans', sans-serif;
      }

      h1 {
        margin-bottom: 10px;
      }

      p {
        color: var(--hwc-grey-darken-1);
      }
    </style>

    <div style="display: flex; justify-content: center;">
      <hwc-button @click=${_onOpenModal}>
        Open dialog
      </hwc-button>
    </div>

    <hwc-dialog ?persistent=${persistent} ?fullscreen=${fullscreen}>
      <form @submit=${_onHandleSubmit}>
        <div class="row">
          <div class="col-12 col-md-6 py-2">
            <hwc-text-field
              label="First name"
              name="first_name"
              rules="required"
              autofocus
            ></hwc-text-field>
          </div>

          <div class="col-12 col-md-6 py-2">
            <hwc-text-field
              label="Last name"
              name="last_name"
              rules="required"
            ></hwc-text-field>
          </div>

          <div class="col-12 py-2">
            <hwc-text-field
              label="Email"
              name="email"
              rules="required|email"
            ></hwc-text-field>
          </div>

          <div class="col-12 py-2">
            <hwc-select
              label="Country"
              name="country"
              rules="required"
            >
              <hwc-select-option value="br">Brazil</hwc-select-option>
              <hwc-select-option value="us">United States</hwc-select-option>
              <hwc-select-option value="fr">France</hwc-select-option>
            </hwc-select>
          </div>

          <div class="col-12 py-2">
            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
              <hwc-button appearance="text" @click=${_onCloseModal}>Close</hwc-button>
              <hwc-button type="submit">Create</hwc-button>
            </div>
          </div>
        </div>
      </form>
    </hwc-dialog>
  `
}

export const Fullscreen: Story = {
  render: ({ persistent }) => html`
    <style>
      h1, p {
        margin: 0;
        font-family: 'Nunito Sans', sans-serif;
      }

      h1 {
        margin-bottom: 10px;
      }

      p {
        color: var(--hwc-grey-darken-1);
      }
    </style>

    <div style="display: flex; justify-content: center;">
      <hwc-button @click=${_onOpenModal}>
        Open dialog
      </hwc-button>
    </div>

    <hwc-dialog ?persistent=${persistent} fullscreen>
      <h1>Dialog title</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam ultricies, urna id aliquet tincidunt, nisl justo
        lacinia massa, eu lacinia nunc nisi sed ex.
      </p>

      <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
        <hwc-button appearance="text" @click=${_onCloseModal}>Close</hwc-button>
        <hwc-button @click=${_onCloseModal}>Confirm</hwc-button>
      </div>
    </hwc-dialog>
  `
}
