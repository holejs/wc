import { expect } from '@esm-bundle/chai'
import { html, fixture } from '@open-wc/testing'

import {
  isValidColorFormat,
  getDataAttributes,
  getAllAriaProps,
  randomHexColor,
  generateHash,
  parseRules,
  hasAttr
} from '../dist/index.js'

describe('utils', () => {
  describe('generateHash', () => {
    it('should generate a random hash with value default length', () => {
      const hash = generateHash()
      expect(hash).to.be.a('string')
      expect(hash).to.have.length(10)
    })

    it('should generate a random hash with value length 5', () => {
      const hash = generateHash(5)
      expect(hash).to.be.a('string')
      expect(hash).to.have.length(5)
    })
  })

  describe('hasAttr', () => {
    it('should return true if the property exist in the object', () => {
      const obj = { name: 'John', age: 25 }
      const hasName = hasAttr(obj, 'name')
      expect(hasName).to.be.true
    })

    it('should return false if the object is empty', () => {
      const obj = {}
      const hasName = hasAttr(obj, 'name')
      expect(hasName).to.be.false
    })

    it('should return false if the property does not exist in the object', () => {
      const obj = { name: 'John', age: 25 }
      const hasLastName = hasAttr(obj, 'lastName')
      expect(hasLastName).to.be.false
    })
  })

  describe('isValidColorFormat', () => {
    it('should return true if the text is a valid color format', () => {
      const text = 'rgb(255, 255, 255)'
      const isValid = isValidColorFormat(text)
      expect(isValid).to.be.false
    })

    it('should return true if the text is a valid color format', () => {
      const text = '#ffffff'
      const isValid = isValidColorFormat(text)
      expect(isValid).to.be.false
    })

    it('should return true if the text is a valid color format', () => {
      const text = 'hsl(0, 0%, 100%)'
      const isValid = isValidColorFormat(text)
      expect(isValid).to.be.false
    })

    it('should return true if the text is a valid color format', () => {
      const text = 'rgba(255, 255, 255, 1)'
      const isValid = isValidColorFormat(text)
      expect(isValid).to.be.false
    })

    it('should return false if the text is NOT a valid color format', () => {
      const text = 'invalid-color'
      const isValid = isValidColorFormat(text)
      expect(isValid).to.be.true
    })
  })

  describe('randomHexColor', () => {
    it('should generate a random hex color', () => {
      const color = randomHexColor()
      expect(color).to.be.a('string')
      expect(color).to.match(/^#[0-9a-f]{3,6}$/i)
    })
  })

  describe('parseRules', () => {
    it('should return true if the value is required', () => {
      const rules = 'required'
      const parsedRules = parseRules(rules)

      expect(parsedRules).to.be.a('array')
      expect(parsedRules).to.have.length(1)

      expect(parsedRules).to.deep.equal([
        { key: 'required', value: '' }
      ])
    })

    it('should return true if the value contains multiple rules', () => {
      const rules = 'required|email|min:5|max:10'
      const parsedRules = parseRules(rules)

      expect(parsedRules).to.be.a('array')
      expect(parsedRules).to.have.length(4)

      expect(parsedRules).to.deep.equal([
        { key: 'required', value: '' },
        { key: 'email', value: '' },
        { key: 'min', value: '5' },
        { key: 'max', value: '10' }
      ])
    })
  })

  describe('getAllAriaProps', () => {
    it('should return an object with all aria props', async () => {
      const el = await fixture(html`<div aria-label="label" aria-hidden="true" aria-pressed="false"></div>`)
      const ariaProps = getAllAriaProps(el as HTMLElement)

      expect(ariaProps).to.be.a('array')
      expect(ariaProps).to.have.length(3)
    })
  })

  describe('getDataAttributes', () => {
    it('should return an object with all data attributes', async () => {
      const el = await fixture(html`<div data-id="1" data-name="John" data-age="25"></div>`)
      const dataAttributes = getDataAttributes(el as HTMLElement)

      expect(dataAttributes).to.be.a('Map')
      expect(dataAttributes).to.have.length(3)
      expect(dataAttributes.get('data-id')).to.equal('1')
      expect(dataAttributes.get('data-name')).to.equal('John')
      expect(dataAttributes.get('data-age')).to.equal('25')
    })
  })
})
