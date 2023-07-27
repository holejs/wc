import { test, expect, describe } from 'vitest'
import { html } from 'lit'

import { _query, _render } from '../utils'

import '../../src/button/button'

describe('Button', () => {
  test('Render default button', async () => {
    _render(html`<hwc-button>Click me!</hwc-button>`)

    const $button = _query('hwc-button')

    expect($button?.textContent).toContain('Click me!')
  })
})
