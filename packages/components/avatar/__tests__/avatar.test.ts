import { fixture, html, expect } from '@open-wc/testing'

import '../dist/index.js'

const _stripExpressionComments = (html: string) =>
  html.replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '')

const _removeWhitespace = (text: string | undefined | null) => (text || '').replace(/\s/g, '')

describe('<hwc-avatar>', () => {
  it('should renders an avatar with initials when no src is provided', async () => {
    const $avatar = await fixture(html`
      <hwc-avatar name="Ivan Guevara"></hwc-avatar>
    `)

    expect($avatar.shadowRoot?.querySelector('.avatar__text')).to.be.ok
    expect(
      _removeWhitespace(
        _stripExpressionComments($avatar.shadowRoot?.querySelector('.avatar__text')?.textContent || '')
      )
    ).to.be.equal('IG')
  })

  it('should renders an avatar with image when src is provided', async () => {
    const $avatar = await fixture(html`
      <hwc-avatar name="Ivan Guevara" src="https://avatars.githubusercontent.com/u/2918581"></hwc-avatar>
    `)

    expect($avatar.shadowRoot?.querySelector('.avatar__image')).to.be.ok
  })

  it('should sets correct color to the avatar', async () => {
    const $avatar = await fixture(html`
      <hwc-avatar name="Ivan Guevara" color="#27ae60"></hwc-avatar>
    `)

    expect($avatar.shadowRoot?.querySelector('.avatar__text')).to.be.ok
    expect(getComputedStyle($avatar.shadowRoot?.querySelector('.avatar') as Element).backgroundColor).to.be.equal('rgb(39, 174, 96)')
  })
})
