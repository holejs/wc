import { fixture, html, expect } from '@open-wc/testing'

import type { HWCCard } from '../dist/index.js'
import '../dist/index.js'

describe('<hwc-card>', () => {
  describe('when default values', () => {
    it('should render the card with the default values', async () => {
      const $card = await fixture<HWCCard>(html`<hwc-card></hwc-card>`)

      expect($card).to.be.accessible()
      expect($card.elevation).to.equal('1')
      expect($card.color).to.be.undefined
      expect($card.outlined).to.be.false
      expect($card.shadowRoot?.querySelector('.card')).to.be.exist
      expect($card.shadowRoot?.querySelector('.card__header')).to.be.not.exist
      expect($card.shadowRoot?.querySelector('.card__footer')).to.be.not.exist
    })
  })

  it('should render the card with the header slot', async () => {
    const $card = await fixture<HWCCard>(html`
      <hwc-card>
        <header slot="header">Header</header>
      </hwc-card>
    `)

    expect($card.shadowRoot?.querySelector('.card__header')).to.be.exist
  })

  it('should render the card with the footer slot', async () => {
    const $card = await fixture<HWCCard>(html`
      <hwc-card>
        <footer slot="footer">Footer</footer>
      </hwc-card>
    `)

    expect($card.shadowRoot?.querySelector('.card__footer')).to.be.exist
  })

  // Disabled
  it('should render the card with the disabled attribute', async () => {
    const $card = await fixture<HWCCard>(html`<hwc-card disabled></hwc-card>`)

    expect($card).to.be.accessible()
    expect($card.disabled).to.be.true
    expect($card.getAttribute('aria-disabled')).to.equal('true')
  })
})
