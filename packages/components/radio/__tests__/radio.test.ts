import { fixture, html, expect, elementUpdated } from '@open-wc/testing'

import type { HWCRadio } from '../dist/index.js'
import '../dist/index.js'

describe('<hwc-radio>', () => {
  describe('when default values', () => {
    it('should render the radio with any attributes', async () => {
      const $radio = await fixture<HWCRadio>(html`<hwc-radio></hwc-radio>`)

      expect($radio).to.be.accessible()
      expect($radio.value).to.be.equal('on')
      expect($radio.role).to.be.equal('radio')
      expect($radio.color).to.be.undefined
      expect($radio.checked).to.be.false
      expect($radio.shadowRoot?.querySelector('.radio__wrapper')).to.be.ok
    })
  })

  describe('when include validations', () => {
    it('should be invalid when not checked & default error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-radio
            name="pet"
            value="dog"
            rules="required"
          >Dog. 🐶</hwc-radio>
        </form>
      `)

      const $radio = $form.querySelector('hwc-radio') as HWCRadio

      expect($radio).to.be.accessible()
      expect($radio.validationMessage).to.be.equal('Please select one of these options.')
      expect($form.checkValidity()).to.be.false

      $radio.checked = true

      await elementUpdated($radio)

      expect($radio.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true

      const formData = new FormData($form)

      expect(formData.get('pet')).to.be.equal('dog')
    })
  })
})
