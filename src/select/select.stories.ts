import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import './select.js'

// eslint-disable-next-line no-undef
type HWCSelect = HTMLElementTagNameMap['hwc-select']

type Story = StoryObj<HWCSelect>;

const meta = {
  title: 'Example/Selects',
  tags: ['autodocs'],
  render: (_args: any) => html`
    <hwc-select></hwc-select>
  `,
  argTypes: {}
}

export default meta

export const Basic: Story = {
  args: {}
}
