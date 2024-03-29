import { fixture, html, expect } from '@open-wc/testing'

import type { HWCSelect } from '../dist/index.js'
import '../dist/index.js'

describe('<hwc-select>', () => {
  describe('when default values', () => {
    it('should render the select with the default values', async () => {
      const $select = await fixture<HWCSelect>(html`<hwc-select></hwc-select>`)

      expect($select).to.be.accessible()
      expect($select.label).to.be.undefined
      expect($select.hint).to.be.undefined
      expect($select.color).to.be.undefined
      expect($select.multiple).to.be.false
      expect($select.value).to.be.null
      expect($select.disabled).to.be.false
      expect($select.shadowRoot?.querySelector('.select')).to.be.exist
    })
  })
})
