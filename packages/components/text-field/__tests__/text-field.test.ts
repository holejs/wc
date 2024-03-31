import { expect, html, fixture, elementUpdated } from '@open-wc/testing'

import type { HWCButton } from '@holejs/wc-button'
import type { HWCTextField } from '../dist/index.js'
import '../dist/index.js'

const _delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms))

export const _stripExpressionComments = (html: string) => {
  return _removeWhitespace(html.replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, ''))
}

export const _removeWhitespace = (html: string) => html.replace(/\s/g, '')

describe('<hwc-text-field>', () => {
  describe('when default values', () => {
    it('should render the textfield with any attributes', async () => {
      const $textfield = await fixture<HWCTextField>(html`<hwc-text-field></hwc-text-field>`)

      expect($textfield).to.be.accessible()
      expect($textfield.type).to.equal('text')
      expect($textfield.label).to.be.undefined
      expect($textfield.name).to.be.undefined
      expect($textfield.value).to.equal('')
      expect($textfield.placeholder).to.be.undefined
      expect($textfield.autocomplete).to.be.equal('on')
      expect($textfield.autofocus).to.be.false
      expect($textfield.disabled).to.be.false
      expect($textfield.readonly).to.be.false
      expect($textfield.clearable).to.be.false
      expect($textfield.rules).to.be.undefined
      expect($textfield.mask).to.be.undefined
      expect($textfield.hint).to.be.undefined
      expect($textfield.color).to.be.undefined
    })

    it('should render the textfield with a label', async () => {
      const $textfield = await fixture<HWCTextField>(html`<hwc-text-field label="Name"></hwc-text-field>`)

      const $label = $textfield.shadowRoot?.querySelector('.text-field__label')!

      expect($label).to.not.be.null
      expect(_stripExpressionComments($label.innerHTML)).to.equal('Name')
      expect($textfield.label).to.equal('Name')
    })

    it('should render the textfield with a hint', async () => {
      const $textfield = await fixture<HWCTextField>(html`<hwc-text-field hint="Enter your name"></hwc-text-field>`)

      const $hint = $textfield.shadowRoot?.querySelector('.text-field__details')!

      expect($hint).to.not.be.null
      expect($hint.textContent).to.match(/Enter your name/)
      expect($textfield.hint).to.equal('Enter your name')
    })
  })

  describe('when clearable', () => {
    it('should clear the value when click on clear button', async () => {
      const $textfield = await fixture<HWCTextField>(html`
        <hwc-text-field
          label="Name"
          name="name"
          clearable
          value="Ivan"
        ></hwc-text-field>
      `)

      const $clearable = $textfield.shadowRoot?.querySelector('.text-field__clearable')! as HWCButton

      expect($clearable).to.not.be.null
      expect($textfield.value).to.equal('Ivan')

      $clearable.click()

      await elementUpdated($textfield)

      expect($textfield.value).to.equal('')
    })
  })

  describe('when include validations', () => {
    it('should be invalid when empty & default error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Name"
            name="name"
            rules="required"
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!

      expect($textfield.validationMessage).to.equal('Please fill out this field.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Ivan'

      await elementUpdated($textfield)

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })

    it('should be invalid when empty & custom error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Name"
            name="name"
            rules="required"
            data-error-message-required="This field is required."
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!

      expect($textfield.validationMessage).to.equal('This field is required.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Ivan'

      await elementUpdated($textfield)

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })

    it('should be invalid when empty & email with default error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Email"
            type="email"
            name="email"
            rules="required|email"
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!
      $textfield.value = ''

      expect($textfield.validationMessage).to.equal('Please fill out this field.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'ivan'

      await _delay()

      expect($textfield.validationMessage).to.equal('Please include an \'@\' in the email address. \'ivan\' is missing an \'@\'.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'ivan@domain.com'

      await _delay()

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })

    it('should be invalid when empty & email with custom error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Email"
            type="email"
            name="email"
            rules="required|email"
            data-error-message-required="This field is required."
            data-error-message-email="This is not a valid email."
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!
      $textfield.value = ''

      expect($textfield.validationMessage).to.equal('This field is required.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'ivan'

      await _delay()

      expect($textfield.validationMessage).to.equal('This is not a valid email.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'ivan@domain.com'

      await _delay()

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })

    it('should be invalid when empty & minlength & maxlength with default error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Name"
            name="name"
            rules="required|minlength:3|maxlength:10"
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!
      $textfield.value = ''

      expect($textfield.validationMessage).to.equal('Please fill out this field.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'I'

      await _delay()

      expect($textfield.validationMessage).to.equal('It must contain at least 3 characters.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Ivan Zaldivar'

      await _delay()

      expect($textfield.validationMessage).to.equal('It must contain a maximum of 10 characters.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Ivan'

      await _delay()

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })

    it('should be invalid when empty & minlength & maxlength with custom error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Name"
            name="name"
            rules="required|minlength:3|maxlength:10"
            data-error-message-required="This field is required."
            data-error-message-minlength="It must contain at least 3 characters."
            data-error-message-maxlength="It must contain a maximum of 10 characters."
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!
      $textfield.value = ''

      expect($textfield.validationMessage).to.equal('This field is required.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'I'

      await _delay()

      expect($textfield.validationMessage).to.equal('It must contain at least 3 characters.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Ivan Zaldivar'

      await _delay()

      expect($textfield.validationMessage).to.equal('It must contain a maximum of 10 characters.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Ivan'

      await _delay()

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })

    it('should be invalid when empty & pattern with custom error message', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Password"
            type="password"
            name="password"
            rules="required|pattern:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            data-error-message-pattern="It must contain at least one uppercase letter, one lowercase letter, one number and at least 8 characters."
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!
      $textfield.value = ''

      expect($textfield.validationMessage).to.equal('Please fill out this field.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = '123456'

      await _delay()

      expect($textfield.validationMessage).to.equal('It must contain at least one uppercase letter, one lowercase letter, one number and at least 8 characters.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'Password123@'

      await _delay()

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })
  })

  // when custom validations
  describe('when include custom validations', () => {
    it('should be invalid when empty & custom validation', async () => {
      const $form = await fixture<HTMLFormElement>(html`
        <form>
          <hwc-text-field
            label="Email"
            type="email"
            name="email"
            rules="required"
          ></hwc-text-field>
        </form>
      `)

      const $textfield = $form?.querySelector('hwc-text-field')!

      $textfield.addRule({
        name: 'custom',
        handler: async ({ input }) => {
          const value = input.value

          // Regex for validate gmail.
          const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

          if (!regex.test(value)) {
            return { status: 'invalid', message: 'The email is not valid. You must use a gmail account.' }
          }

          return { status: 'complete' }
        }
      })

      $textfield.value = 'abc@domain.com'

      await _delay()

      expect($textfield.validationMessage).to.equal('The email is not valid. You must use a gmail account.')
      expect($form.checkValidity()).to.be.false

      $textfield.value = 'ivan123@gmail.com'

      await _delay()

      expect($textfield.validationMessage).to.be.null
      expect($form.checkValidity()).to.be.true
    })
  })
})
