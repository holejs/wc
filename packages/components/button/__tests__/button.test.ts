import { fixture, html, expect } from '@open-wc/testing'
import sinon from 'sinon'

import type { HWCButton } from '../dist/index.js'
import '../dist/index.js'

describe('<hwc-button>', () => {
  describe('when contain values for default attributes', () => {
    it('should render button', async () => {
      const $button = await fixture(html`<hwc-button>Button</hwc-button>`)

      expect($button.shadowRoot!.querySelector('button')).to.exist
      expect($button.shadowRoot!.querySelector('a')).to.not.exist
      expect($button).to.be.accessible()
    })

    it('should show default values', async () => {
      const $button = await fixture(html`<hwc-button>Button</hwc-button>`) as HWCButton

      expect($button.type).to.equal('button')
      expect($button.disabled).to.be.false
      expect($button.appearance).to.equal('raised')
      expect($button.elevation).to.undefined
      expect($button.lowercase).to.be.false
      expect($button.uppercase).to.be.false
      expect($button.capitalize).to.be.false
    })

    it('should render anchor', async () => {
      const $button = await fixture(html`<hwc-button href="#">Button</hwc-button>`)

      expect($button.shadowRoot!.querySelector('a')).to.exist
      expect($button.shadowRoot!.querySelector('button')).to.not.exist
      expect($button).to.be.accessible()
    })
  })

  describe('when disabled', () => {
    it('should render anchor', async () => {
      const $button = await fixture(html`<hwc-button href="#" disabled>Button</hwc-button>`)

      expect($button.shadowRoot!.querySelector('a')).to.exist
      expect($button.shadowRoot!.querySelector('button')).to.not.exist
      expect($button).to.be.accessible()
    })

    it('should render button', async () => {
      const $button = await fixture(html`<hwc-button disabled>Button</hwc-button>`)

      expect($button.shadowRoot!.querySelector('button')).to.exist
      expect($button.shadowRoot!.querySelector('a')).to.not.exist
      expect($button).to.be.accessible()
    })
  })

  describe('when submitting form', () => {
    it('should submit form', async () => {
      const $form = await fixture(html`
        <form action="" method="post">
          <hwc-button type="submit">Submit</hwc-button>
        </form>
      `)

      const $button = $form.querySelector('hwc-button')!
      const _onSubmit = sinon.spy((e: Event) => e.preventDefault())

      $form.addEventListener('submit', _onSubmit)
      $button.shadowRoot!.querySelector('button')!.click()

      expect(_onSubmit).to.have.been.calledOnce
    })

    it('should reset form', async () => {
      const $form = await fixture(html`
        <form action="" method="post">
          <hwc-button type="reset">Reset</hwc-button>
        </form>
      `)

      const $button = $form.querySelector('hwc-button')!
      const _onReset = sinon.spy((e: Event) => e.preventDefault())

      $form.addEventListener('reset', _onReset)
      $button.shadowRoot!.querySelector('button')!.click()

      expect(_onReset).to.have.been.calledOnce
    })
  })
})
