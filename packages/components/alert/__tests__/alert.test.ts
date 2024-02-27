import { describe, test, expect } from 'vitest'
import { html, render } from 'lit'

import '../src/alert.js'

export const _delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('<hwc-alert>', () => {
  test('should render alert', async () => {
    const $el = html`<hwc-alert>I'm Alert Component!</hwc-alert>`
    render($el, document.body)
  
    const $hwcalert = document.querySelector('hwc-alert')
  
    expect($hwcalert).not.toBeNull()
    expect($hwcalert?.appearance).toBe('filled')
    expect($hwcalert?.textContent).toBe("I'm Alert Component!")
  })
  
  test('should render alert with type', async () => {
    const $el = html`<hwc-alert type="success">I'm Alert Component!</hwc-alert>`
    render($el, document.body)
  
    await _delay(150)
  
    const $hwcalert = document.querySelector('hwc-alert')
  
    expect($hwcalert).not.toBeNull()
    expect($hwcalert?.type).toBe('success')
    expect($hwcalert?.shadowRoot?.querySelector('.alert__icon')).not.toBeNull()
  })
  
  test('should dismissible alert', async () => {
    const $el = html`<hwc-alert dismissible>I'm Alert Component!</hwc-alert>`
    render($el, document.body)
  
    await _delay(150)
  
    const $hwcalert = document.querySelector('hwc-alert')
  
    expect($hwcalert).not.toBeNull()
    expect($hwcalert?.hasAttribute('dismissible')).toBe(true)
    expect($hwcalert?.shadowRoot?.querySelector('.alert-button__close')).not.toBeNull()
  
    // Close alert
    $hwcalert?.close()
  
    expect(document.querySelector('hwc-alert')).toBeNull()
  })
})
