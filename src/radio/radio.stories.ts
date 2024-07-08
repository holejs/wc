/* eslint-disable no-undef */
import { expect, userEvent, within } from '@storybook/test'
import type { StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '../button/button.js'
import './radio.js'

// eslint-disable-next-line no-undef
type HWCRadio = HTMLElementTagNameMap['hwc-radio']

type Story = StoryObj<HWCRadio>;

const values = [
  { value: 'dog', label: 'Dog. 🐶' },
  { value: 'cat', label: 'Cat. 🐱' },
  { value: 'bird', label: 'Bird. 🐦' },
  { value: 'fish', label: 'Fish. 🐠' },
  { value: 'hamster', label: 'Hamster. 🐹' }
]

const _handleSubmit = (event: Event) => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  const formData = new FormData(form)

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`)
  })
}

const _onHandleChange = (event: Event) => {
  const $radio = event.target as HWCRadio

  const value = $radio.checked ? $radio.value : null

  console.log('value: ', value)
}

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Radio',
  tags: ['autodocs'],
  render: ({ color }: any) => html`
    <main>
      <form @submit=${_handleSubmit}>
        ${values.map(({ value, label }) => html`
          <hwc-radio
            name="pet"
            color=${color}
            value=${value}
            rules="required"
            checked
            data-error-message-required="Select one of these pets"
            @change=${_onHandleChange}
          >${label}</hwc-radio>
        `)}

        <div style="margin-top: 10px">
          <hwc-button appearance="text" type="reset" color=${color}>Reset</hwc-button>
  
          <hwc-button type="submit" color=${color}>Submit</hwc-button>
        </div>
      </form>
    </main>
  `,
  argTypes: {
    color: {
      control: 'color',
      description: 'Color of the radio button'
    },
    name: {
      control: 'text',
      description: 'Name of the radio button'
    },
    value: {
      control: 'text',
      description: 'Value of the radio button'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked or not'
    }
  }
}

export default meta

export const Basic: Story = {
  args: {
    color: 'orange-darken-2',
    name: 'color'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const $form = document.querySelector('form') as HTMLFormElement
    const $reset = canvas.getByRole<HTMLElementTagNameMap['hwc-button']>('button', { name: 'Reset' })

    const $dog = canvas.getByRole<HWCRadio>('radio', { name: 'Dog. 🐶' })
    const $cat = canvas.getByRole<HWCRadio>('radio', { name: 'Cat. 🐱' })
    const $bird = canvas.getByRole<HWCRadio>('radio', { name: 'Bird. 🐦' })
    const $fish = canvas.getByRole<HWCRadio>('radio', { name: 'Fish. 🐠' })
    const $hamster = canvas.getByRole<HWCRadio>('radio', { name: 'Hamster. 🐹' })

    // Validate that the radio button are in the DOM
    await step('Validate that the radio button are in the DOM', () => {
      expect($dog).toBeInTheDocument()
      expect($cat).toBeInTheDocument()
      expect($bird).toBeInTheDocument()
      expect($fish).toBeInTheDocument()
      expect($hamster).toBeInTheDocument()
    })

    // Validate that the radio button are checked
    await step('Validate that the radio button are checked', () => {
      expect($dog).toBeChecked()
      expect($cat).not.toBeChecked()
      expect($bird).not.toBeChecked()
      expect($fish).not.toBeChecked()
      expect($hamster).not.toBeChecked()
    })

    // Validate that the form is valid
    await step('Validate that the form is valid', () => {
      expect($form).toBeValid()
      expect(new FormData($form).get('pet')).toBe('dog')
    })

    // Reset the form
    await userEvent.click($reset.shadowRoot?.querySelector('button') as HTMLButtonElement)

    await step('Reset the form', async () => {
      expect($form).toBeInvalid()
    })

    // Validate that the radio button are not checked
    await step('Validate that the radio button are not checked', () => {
      expect($dog).not.toBeChecked()
      expect($cat).not.toBeChecked()
      expect($bird).not.toBeChecked()
      expect($fish).not.toBeChecked()
      expect($hamster).not.toBeChecked()
    })

    // Make focus and blur in the radio button
    await step('Make focus and blur in the radio button', async () => {
      $dog.shadowRoot?.querySelector('input')?.focus()
      $dog.shadowRoot?.querySelector('input')?.blur()
    })

    // Validate that the radio button are displayed error message
    await step('Validate that the radio button are displayed error message', () => {
      expect($dog.shadowRoot?.querySelector('.radio__details span')?.textContent).toBe('Select one of these pets')
    })

    // Check the radio button
    await step('Check the radio button', async () => {
      await userEvent.click($cat.shadowRoot?.querySelector('input') as HTMLInputElement)

      expect($cat).toBeChecked()
    })

    // Validate that the radio button are not displayed error message
    await step('Validate that the radio button are not displayed error message', () => {
      expect($dog.shadowRoot?.querySelector('.radio__details span')).toBeFalsy()
    })

    // Validate that the form is valid
    await step('Validate that the form is valid', () => {
      expect($form).toBeValid()
      expect(new FormData($form).get('pet')).toBe('cat')
    })
  }
}
