# @holejs/wc

**Hole.js** provides a diverse suite of web components made in [TypeScript](https://www.typescriptlang.org/) and [Lit](https://lit.dev/) 🔌. These components are easy to configure and use 🧩, allowing you to modify the original design in a practical way. ✨ In addition, they can be seamlessly integrated into the most popular frameworks. 🚀

> If you want to interact with the components, we have prepared a [**Demo**](https://codesandbox.io/s/holejs-web-components-kzslns).

> **Warning**
> This package is under development and is not suitable for production environments due to possible changes in future versions. Thanks for your understanding. ❤️

## Installation.

To start using the suite of components it is necessary to install the package.

```bash
npm i @holejs/wc
```

## Setup.

Import the component suite into your main input file. Generally the `index.ts` is used.

```ts
// Imports styles.
import '@holejs/wc/styles/elevations.css'
import '@holejs/wc/styles/colors.css'

// Import all components.
import '@holejs/wc'

// Import specific components.
import '@holejs/wc/button/button.js'

// Import via CDN's. (Not recommended for production environments)
import 'https://unpkg.com/@holejs/wc?module'
import 'https://unpkg.com/@holejs/wc@0.11.1/dist/button.js?module'
```

## Usage.

Once the components are imported, they can be used in the HTML file.

```html
<hwc-button>Click me!</hwc-button>

<hwc-button appearance="outlined" color="orange-darken-2">Click me!</hwc-button>

<hwc-button appearance="text" color="#468D5A">Click me!</hwc-button>
```

## Components.

Bellow you can see the list of components that are currently available.

- [Alerts](/docs/components/alerts.md)
- [Buttons](/docs/components/buttons.md)
- [Cards](/docs/components/cards.md)
- [Checkboxes](/docs/components/checkboxes.md)
- [Chips](/docs/components/chips.md)
- [Radios](/docs/components/radios.md)
- [Ripples](/docs/components/ripples.md)
- [Selects](/docs/components/selects.md)
- [TextFields](/docs/components/text-fields.md)

## Additional info.

- [Dark mode](/docs/advance/dark-mode.md)
- [Customize design](/docs/advance/customize-design.md)

## Stay in touch.

- [Creator](https://twitter.com/thebug404)

## License.

This project is licensed under the terms of the [MIT license](/LICENSE).
