import { fixture, html } from '@open-wc/testing'
import { expect } from '@esm-bundle/chai'
import sinon from 'sinon'

import '../dist/index.js'

type HWCAlert = HTMLElementTagNameMap['hwc-alert']

const _delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms))

describe('<hwc-alert>', () => {
  describe('when contain values for default attributes', () => {
    it('should render alert', async () => {
      const $alert = await fixture<HWCAlert>(html`<hwc-alert>Alert</hwc-alert>`)

      expect($alert.shadowRoot!.querySelector('.alert')).to.exist
      expect($alert.querySelector('.alert__icon')).not.to.exist
      expect($alert.type).to.equal(undefined)
      expect($alert.appearance).to.equal('filled')
      expect($alert.dismissible).to.equal(false)
      expect($alert.color).to.equal(undefined)
      expect($alert).to.be.accessible()
    })

    it('should render alert with type', async () => {
      const $alert = await fixture<HWCAlert>(html`<hwc-alert type="info">Alert</hwc-alert>`)

      expect($alert.shadowRoot!.querySelector('.alert')).to.exist
      expect($alert.shadowRoot!.querySelector('.alert__icon')).to.exist
    })
  })

  describe('when contain dismissible attribute', () => {
    it('should render alert with dismissible', async () => {
      const $alert = await fixture<HWCAlert>(html`<hwc-alert dismissible>Alert</hwc-alert>`)

      expect($alert.shadowRoot!.querySelector('.alert__actions')).to.exist
    })

    it('should close alert', async () => {
      const onclose = sinon.spy()

      const $alert = await fixture<HWCAlert>(html`<hwc-alert dismissible>Alert</hwc-alert>`)

      $alert.addEventListener('close', onclose)
      $alert.close()

      await _delay()

      expect(document.querySelector('hwc-alert')).to.be.null
      expect(onclose).to.have.been.calledOnce
    })

    it('should not close alert when event is cancelled', async () => {
      const $alert = await fixture<HWCAlert>(html`<hwc-alert dismissible>Alert</hwc-alert>`)

      $alert.addEventListener('close', e => e.preventDefault())
      $alert.close()

      await _delay()

      expect(document.querySelector('hwc-alert')).to.exist
    })
  })
})
