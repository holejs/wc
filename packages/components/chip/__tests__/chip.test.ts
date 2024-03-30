import { fixture, html, expect } from '@open-wc/testing'

import type { HWCButton } from '@holejs/wc-button'
import type { HWCChip } from '../dist/index.js'
import '../dist/index.js'

describe('<hwc-chip>', () => {
  it('should render a chip', async () => {
    const $chip = await fixture<HWCChip>(html`<hwc-chip>Guns N' Roses</hwc-chip>`)

    expect($chip.appearance).to.be.equal('filled')
    expect($chip.size).to.be.equal('regular')
    expect($chip.color).to.be.undefined
    expect($chip.rounded).to.be.false
    expect($chip.closable).to.be.false
    expect($chip.shadowRoot?.querySelector('.chip')).to.exist
  })

  describe('when chip is closable', () => {
    it('should render a chip when is closable', async () => {
      const $chip = await fixture<HWCChip>(html`<hwc-chip closable>Guns N' Roses</hwc-chip>`)

      const $button = $chip.shadowRoot?.querySelector<HWCButton>('.chip-button__closable')

      expect($chip.closable).to.be.true
      expect($button).to.exist

      $button?.click()

      expect(document.body.contains($chip)).to.be.false
    })

    it('should not close chip when event is cancelled', async () => {
      const $chip = await fixture<HWCChip>(html`<hwc-chip closable>Guns N' Roses</hwc-chip>`)

      $chip.addEventListener('close', e => e.preventDefault())
      $chip.close()

      expect(document.body.contains($chip)).to.be.true
    })
  })
})
