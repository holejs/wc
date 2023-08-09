/* eslint-disable no-undef */

import { test, expect, describe } from 'vitest'
import { fixture } from '@open-wc/testing'
import { html } from 'lit'

import '../../src/button/button'

type HWCButton = HTMLElementTagNameMap['hwc-button']

describe('Button', () => {
  test('Render default button', async () => {
    const $hwcbutton = await fixture<HWCButton>(
      html`<hwc-button>Click me!</hwc-button>`
    )

    const $button = $hwcbutton.shadowRoot?.querySelector('button')

    expect($button).not.toBe(null)
    expect($hwcbutton?.textContent).toContain('Click me!')
    expect($hwcbutton.type).toBe('button')
    expect($button?.type).toBe('button')
    expect($hwcbutton.lowercase).toBe(false)
    expect($hwcbutton.uppercase).toBe(false)
    expect($hwcbutton.capitalize).toBe(false)
    expect($hwcbutton.rounded).toBe(false)
    expect($hwcbutton.fullwidth).toBe(false)
  })
})
