import { fixture, html, expect, elementUpdated } from '@open-wc/testing'

import type { HWCCheckbox } from '../dist/index.js'
import '../dist/index.js'

describe('<hwc-checkbox>', () => {
  describe('when default values', () => {
    it('should render the checkbox with any attributes', async () => {
      const $checkbox = await fixture<HWCCheckbox>(html`<hwc-checkbox></hwc-checkbox>`)

      expect($checkbox).to.be.accessible()
      expect($checkbox.value).to.be.equal('on')
      expect($checkbox.role).to.be.equal('checkbox')
      expect($checkbox.checked).to.be.false
      expect($checkbox.disabled).to.be.false
      expect($checkbox.color).to.be.undefined
      expect($checkbox.shadowRoot?.querySelector('input')).to.exist
    })
  })

  describe('when include validations', () => {
    it('should be invalid when empty & default error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-checkbox
            name="terms"
            rules="required"
          ></hwc-checkbox>
        </form>
      `)

      const $checkbox = $form.querySelector('hwc-checkbox') as HWCCheckbox

      expect($checkbox).to.be.accessible()
      expect($checkbox.validationMessage).to.be.equal('Please check this box if you want to proceed.')
      expect($form.checkValidity()).to.be.false

      $checkbox.checked = true

      await elementUpdated($checkbox)

      expect($checkbox.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true

      const formData = new FormData($form)

      expect(formData.get('terms')).to.be.equal('on')
    })

    it('should be invalid when empty & custom error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-checkbox
            name="terms"
            rules="required"
            data-error-message-required="Please check this box."
          ></hwc-checkbox>
        </form>
      `)

      const $checkbox = $form.querySelector('hwc-checkbox') as HWCCheckbox

      expect($checkbox).to.be.accessible()
      expect($checkbox.validationMessage).to.be.equal('Please check this box.')
      expect($form.checkValidity()).to.be.false

      $checkbox.checked = true

      await elementUpdated($checkbox)

      expect($checkbox.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true

      const formData = new FormData($form)

      expect(formData.get('terms')).to.be.equal('on')
    })
  })
})
