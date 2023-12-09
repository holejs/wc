import type { StoryObj } from '@storybook/web-components'
// import { within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'
import { html } from 'lit'

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

export const Basic: Story = {
  args: {},
  render: ({ persistent }: any) => html`
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

    <hwc-dialog ?persistent=${persistent}>
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
