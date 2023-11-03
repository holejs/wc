import type { StoryObj } from '@storybook/web-components'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import U2Image from './fixtures/u2.png'

import '../button/button.js'
import './card.js'

// eslint-disable-next-line no-undef
type HWCCard = HTMLElementTagNameMap['hwc-card']

type Story = StoryObj<HWCCard>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Card',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Allows you to set the background color of the card.'
    },
    elevation: {
      control: 'inline-radio',
      options: ['0', '1', '2', '3', '4', '5'],
      description: 'This property allows you to apply a visual lift effect to the component, creating a sense of depth and making the button appear to be raised or floating above the surface.'
    },
    outlined: {
      control: 'boolean',
      description: 'Allows you to set whether the card will have an outlined border.'
    },
    disabled: {
      control: 'boolean',
      description: 'Allows you to disable the interaction with the card and apply a style to indicate that it is disabled.'
    }
  }
}

export default meta

export const Gradient: Story = {
  args: {
    elevation: '2'
  },
  render: (args: any) => html`
    <style>
      .card {
        --hwc-card-body-padding: 15px 15px 0px 15px;
        --hwc-card-font-color: white;
        --hwc-card-bg: #000000;
        --hwc-card-bg: -webkit-linear-gradient(to right, #434343, #000000);
        --hwc-card-bg: linear-gradient(to right, #434343, #000000);
      }

      .wrapper {
        width: 400px;
        font-family: 'Nunito Sans', sans-serif;
      }
      .card__body {
        display: flex;
        align-items: center;
      }
      .card__picture {
        display: inline-block;
        margin: 0;
      }
      .card__image {
        object-fit: cover;
        border-radius: 20px;
        width: 100px;
        height: 100px;
      }
      .card__content {
        margin-left: 20px;
      }
      .card__title {
        margin: 0;
        font-size: 25px;
        font-weight: 100;
      }
      .card__subtitle {
        margin: 0;
        font-size: 14px;
        color: var(--hwc-grey-lighten-1);
      }
      .card__footer {
        display: flex;
        justify-content: end;
      }
    </style>
    <div class="wrapper">
      <hwc-card
        .color=${args.color}
        class="card"
        elevation=${args.elevation}
        ?outlined=${args.outlined}
        ?disabled=${args.disabled}
      >
        <section class="card__body">
          <figure class="card__picture">
            <img
              src=${U2Image}
              class="card__image"
              alt="U2 Band"
            >
          </figure>
          <div class="card__content">
            <h1 class="card__title">U2</h1>
            <p class="card__subtitle">
              U2 is an alternative rock band originally from Dublin, formed in 1976.
            </p>
          </div>
        </section>

        <section slot="footer">
          <div class="card__footer">
            <a href="https://www.u2.com/" target="_blank">
              <hwc-button appearance="text" color="grey-darken-1" rounded>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                </svg>
                <span style="margin-left: 10px">Website</span>
              </hwc-button>
            </a>

            <a href="https://open.spotify.com/intl-es/artist/51Blml2LZPmy7TTiAg47vQ" target="_blank">
              <hwc-button appearance="text" color="green-darken-2" rounded>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                </svg>
                <span style="margin-left: 10px">Spotify</span>
              </hwc-button>
            </a>
          </div>
        </section>
      </hwc-card>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const $title = canvas.getByText('U2')

    expect($title).toBeInTheDocument()

    const $subtitle = canvas.getByText('U2 is an alternative rock band originally from Dublin, formed in 1976.')

    expect($subtitle).toBeInTheDocument()

    const $img = canvas.getByRole('img', { name: 'U2 Band' })

    expect($img).toBeInTheDocument()
    expect($img).toHaveAttribute('src', U2Image)
    expect($img).toHaveAttribute('alt', 'U2 Band')

    const $website = canvas.getByRole('link', { name: 'Website' })

    expect($website).toBeInTheDocument()
    expect($website).toHaveAttribute('href', 'https://www.u2.com/')
    expect($website).toHaveAttribute('target', '_blank')

    const $spotify = canvas.getByRole('link', { name: 'Spotify' })

    expect($spotify).toBeInTheDocument()
    expect($spotify).toHaveAttribute('href', 'https://open.spotify.com/intl-es/artist/51Blml2LZPmy7TTiAg47vQ')
    expect($spotify).toHaveAttribute('target', '_blank')
  }
}
