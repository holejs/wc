import type { StoryObj } from '@storybook/web-components'
// import { within } from '@storybook/testing-library'
// import { when } from 'lit/directives/when.js'
// import { expect } from '@storybook/jest'
import { html } from 'lit'

import './radio.js'

// eslint-disable-next-line no-undef
type HWCRadio = HTMLElementTagNameMap['hwc-radio']

type Story = StoryObj<HWCRadio>;

// const BUTTON_TEXT_CONTENT = 'Click me!'

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Radio',
  tags: ['autodocs'],
  render: (args: any) => html`
    <hwc-radio
      color=${args.color}
    >
      <div>
        <p style="margin: 0">
          I'm radio button component. More information in: <a href="https://google.com">Github</a>
        </p>
      </div>
    </hwc-radio>
  `,
  argTypes: {
    color: {
      control: 'color',
      description: 'Color of the radio button'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {
    color: 'orange-darken-2'
  }
}
