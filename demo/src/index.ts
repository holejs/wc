import { customElement } from 'lit/decorators.js'
import { LitElement, css, html } from 'lit'

// Import styles.
import '../../src/assets/elevations.css'
import '../../src/assets/colors.css'

// Import components
import '../../src/button/button'
import '../../src/ripple/ripple'
import '../../src/alert/alert'
import '../../src/chip/chip'
import '../../src/card/card'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    .azure-pop__color {
      --hwc-button-bg: #bdc3c7;  /* fallback for old browsers */
      --hwc-button-bg: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
      --hwc-button-bg: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .gradient__card {
      --hwc-card-bg: #9D50BB;  /* fallback for old browsers */
      --hwc-card-bg: -webkit-linear-gradient(to right, #6E48AA, #9D50BB);  /* Chrome 10-25, Safari 5.1-6 */
      --hwc-card-bg: linear-gradient(to right, #6E48AA, #9D50BB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .gradient-card__shadow {
      --hwc-card-box-shadow: 3px 7px 15px rgba(103, 74, 156 , 0.65);
    }

    .azure-pop__color2 {
      --hwc-ripple-bg: #bdc3c7;  /* fallback for old browsers */
      --hwc-ripple-bg: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
      --hwc-ripple-bg: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .elevation-purple__gradient {
      --hwc-button-box-shadow: 3px 7px 15px rgba(103, 74, 156 , 0.65);
    }
  `

  render () {
    return html`
      <div>
        <section style="padding: 10px 0px">
          <hwc-alert>I'm an Alert Usage Example</hwc-alert>

          <hwc-alert type="info">I'm an Alert Usage Example</hwc-alert>

          <hwc-alert type="success">I'm an Alert Usage Example</hwc-alert>

          <hwc-alert type="warning">I'm an Alert Usage Example</hwc-alert>

          <hwc-alert type="error">I'm an Alert Usage Example</hwc-alert>

          <hwc-alert type="warning" appearance="outlined">I'm an Alert Usage Example</hwc-alert>

          <hwc-alert appearance="text" color="blue-darken-2">I'm an Alert Usage Example</hwc-alert>
        </section>

        <section style="padding: 10px 0px">
          <hwc-chip>Vicente Van Coco</hwc-chip>

          <hwc-chip appearance="outlined" color="purple-darken-1">Vicente Van Coco</hwc-chip>

          <hwc-chip closable appearance="text" color="indigo-darken-4">Vicente Van Coco</hwc-chip>

          <hwc-chip closable size="x-small" appearance="text" color="blue-darken-2">Vicente Van Coco</hwc-chip>

          <hwc-chip closable size="small" appearance="text" color="blue-darken-2">Vicente Van Coco</hwc-chip>

          <hwc-chip closable appearance="text" color="blue-darken-2">Vicente Van Coco</hwc-chip>

          <hwc-chip closable size="large" appearance="text" color="blue-darken-2">Vicente Van Coco</hwc-chip>

          <hwc-chip closable size="x-large" appearance="text" color="blue-darken-2">Vicente Van Coco</hwc-chip>
        </section>

        <section style="padding: 10px 0px">
          <hwc-card>
            <div slot="header">
              <h1 style="margin: 0">Header</h1>
            </div>

            <!-- <hwc-ripple color="blue-darken-2" opacity="0.15"></hwc-ripple> -->
            <h1 style="margin: 0">Body</h1>
            <form>
              <input name="email">
              <hwc-button type="submit">Submit</hwc-button>
            </form>

            <div slot="footer">
              <h1 style="margin: 0">Footer</h1>
            </div>
          </hwc-card>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button aria-label="Sybmit form" color="orange-darken-2" elevation="1">
            <hwc-ripple></hwc-ripple>
            Click me!
          </hwc-button>
  
          <hwc-button aria-label="Hello world" color="red-darken-2">
            Click me!
          </hwc-button>
  
          <hwc-button aria-label="Good bye">
            Click me!
          </hwc-button>
  
          <hwc-button aria-label="Amazing" color="purple-darken-2">
            Click me!
          </hwc-button>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button appearance="outlined" color="orange-darken-2" elevation="1">
            <hwc-ripple></hwc-ripple>
            Click me!
          </hwc-button>

          <hwc-button appearance="outlined" color="red-darken-2">
            Click me!
          </hwc-button>

          <hwc-button appearance="outlined">
            Click me!
          </hwc-button>

          <hwc-button appearance="outlined" color="purple-darken-2">
            Click me!
          </hwc-button>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button color="pink-darken-2" uppercase>
            Click me!
          </hwc-button>

          <hwc-button appearance="outlined" color="grey-darken-2" lowercase>
            Click me!
          </hwc-button>

          <hwc-button capitalize color="brown-darken-2">
            Click me!
          </hwc-button>

          <hwc-button appearance="outlined" color="green-darken-2" uppercase>
            Click me!
          </hwc-button>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button appearance="text" color="pink-darken-2" uppercase>
            Click me!
          </hwc-button>

          <hwc-button appearance="text" color="grey-darken-2" uppercase>
            Click me!
          </hwc-button>

          <hwc-button appearance="text" color="brown-darken-2" uppercase>
            Click me!
          </hwc-button>

          <hwc-button appearance="text" color="green-darken-2" uppercase>
            <hwc-ripple></hwc-ripple>
            Click me!
          </hwc-button>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button rounded color="blue-darken-2" uppercase>
            <hwc-ripple></hwc-ripple>
            Click me!
          </hwc-button>

          <hwc-button rounded appearance="text" color="grey-darken-2" uppercase>
            Click me!
          </hwc-button>

          <hwc-button rounded color="brown-darken-2" uppercase>
            Click me!
          </hwc-button>

          <hwc-button rounded appearance="text" color="green-darken-2" uppercase>
            <hwc-ripple></hwc-ripple>
            Click me!
          </hwc-button>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button fullwidth rounded uppercase color="purple-darken-2">
            <hwc-ripple></hwc-ripple>
            Click me!
          </hwc-button>
        </section>

        <section style="padding: 10px 0px">
          <hwc-button appearance="fab" color="purple-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
            </svg>
          </hwc-button>

          <hwc-button appearance="fab" color="green-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-android2" viewBox="0 0 16 16">
              <path d="m10.213 1.471.691-1.26c.046-.083.03-.147-.048-.192-.085-.038-.15-.019-.195.058l-.7 1.27A4.832 4.832 0 0 0 8.005.941c-.688 0-1.34.135-1.956.404l-.7-1.27C5.303 0 5.239-.018 5.154.02c-.078.046-.094.11-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.697 3.697 0 0 0 3.5 5.02h9c0-.75-.208-1.44-.623-2.072a4.266 4.266 0 0 0-1.664-1.476ZM6.22 3.303a.367.367 0 0 1-.267.11.35.35 0 0 1-.263-.11.366.366 0 0 1-.107-.264.37.37 0 0 1 .107-.265.351.351 0 0 1 .263-.11c.103 0 .193.037.267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264Zm4.101 0a.351.351 0 0 1-.262.11.366.366 0 0 1-.268-.11.358.358 0 0 1-.112-.264c0-.103.037-.191.112-.265a.367.367 0 0 1 .268-.11c.104 0 .19.037.262.11a.367.367 0 0 1 .107.265c0 .102-.035.19-.107.264ZM3.5 11.77c0 .294.104.544.311.75.208.204.46.307.76.307h.758l.01 2.182c0 .276.097.51.292.703a.961.961 0 0 0 .7.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182c0 .276.097.51.292.703a.972.972 0 0 0 .71.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76c.291 0 .54-.103.749-.308.207-.205.311-.455.311-.75V5.365h-9v6.404Zm10.495-6.587a.983.983 0 0 0-.702.278.91.91 0 0 0-.293.685v4.063c0 .271.098.501.293.69a.97.97 0 0 0 .702.284c.28 0 .517-.095.712-.284a.924.924 0 0 0 .293-.69V6.146a.91.91 0 0 0-.293-.685.995.995 0 0 0-.712-.278Zm-12.702.283a.985.985 0 0 1 .712-.283c.273 0 .507.094.702.283a.913.913 0 0 1 .293.68v4.063a.932.932 0 0 1-.288.69.97.97 0 0 1-.707.284.986.986 0 0 1-.712-.284.924.924 0 0 1-.293-.69V6.146c0-.264.098-.491.293-.68Z"/>
            </svg>
          </hwc-button>

          <hwc-button appearance="fab" color="brown-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
            </svg>
          </hwc-button>

          <hwc-button appearance="fab" color="orange-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </hwc-button>

          <hwc-button appearance="icon" color="purple-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
            </svg>
          </hwc-button>

          <hwc-button appearance="icon" color="green-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-android2" viewBox="0 0 16 16">
              <path d="m10.213 1.471.691-1.26c.046-.083.03-.147-.048-.192-.085-.038-.15-.019-.195.058l-.7 1.27A4.832 4.832 0 0 0 8.005.941c-.688 0-1.34.135-1.956.404l-.7-1.27C5.303 0 5.239-.018 5.154.02c-.078.046-.094.11-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.697 3.697 0 0 0 3.5 5.02h9c0-.75-.208-1.44-.623-2.072a4.266 4.266 0 0 0-1.664-1.476ZM6.22 3.303a.367.367 0 0 1-.267.11.35.35 0 0 1-.263-.11.366.366 0 0 1-.107-.264.37.37 0 0 1 .107-.265.351.351 0 0 1 .263-.11c.103 0 .193.037.267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264Zm4.101 0a.351.351 0 0 1-.262.11.366.366 0 0 1-.268-.11.358.358 0 0 1-.112-.264c0-.103.037-.191.112-.265a.367.367 0 0 1 .268-.11c.104 0 .19.037.262.11a.367.367 0 0 1 .107.265c0 .102-.035.19-.107.264ZM3.5 11.77c0 .294.104.544.311.75.208.204.46.307.76.307h.758l.01 2.182c0 .276.097.51.292.703a.961.961 0 0 0 .7.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182c0 .276.097.51.292.703a.972.972 0 0 0 .71.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76c.291 0 .54-.103.749-.308.207-.205.311-.455.311-.75V5.365h-9v6.404Zm10.495-6.587a.983.983 0 0 0-.702.278.91.91 0 0 0-.293.685v4.063c0 .271.098.501.293.69a.97.97 0 0 0 .702.284c.28 0 .517-.095.712-.284a.924.924 0 0 0 .293-.69V6.146a.91.91 0 0 0-.293-.685.995.995 0 0 0-.712-.278Zm-12.702.283a.985.985 0 0 1 .712-.283c.273 0 .507.094.702.283a.913.913 0 0 1 .293.68v4.063a.932.932 0 0 1-.288.69.97.97 0 0 1-.707.284.986.986 0 0 1-.712-.284.924.924 0 0 1-.293-.69V6.146c0-.264.098-.491.293-.68Z"/>
            </svg>
          </hwc-button>

          <hwc-button appearance="icon" color="brown-darken-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
            </svg>
          </hwc-button>

          <hwc-button role="button" aria-label="Cerrar ventana" aria-expanded="false" appearance="icon" color="orange-darken-2">
            <hwc-ripple></hwc-ripple>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </hwc-button>
        </section>
      </div>
    `
  }
}
