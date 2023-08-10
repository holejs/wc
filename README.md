# @holejs/wc

**Hole.js** provides a diverse suite of web components made in [TypeScript](https://www.typescriptlang.org/) and [Lit](https://lit.dev/) 🔌. These components are easy to configure and use 🧩, allowing you to modify the original design in a practical way. ✨ In addition, they can be seamlessly integrated into the most popular frameworks. 🚀

> If you want to interact with the components, we have prepared a [**Demo**](https://codesandbox.io/s/holejs-web-components-kzslns).

## Table of contents

- [@holejs/wc](#holejswc)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Alerts](#alerts)
    - [Usage](#usage)
    - [Type](#type)
    - [Appearance](#appearance)
    - [Colors](#colors)
    - [Dismissible](#dismissible)
    - [Methods](#methods)
      - [close](#close)
    - [Events](#events)
      - [close](#close-1)
    - [CSS Custom Properties](#css-custom-properties)
  - [Buttons](#buttons)
    - [Usage](#usage-1)
    - [Appearance](#appearance-1)
    - [Colors](#colors-1)
    - [Color gradient](#color-gradient)
    - [Uppercase, Lowercase \& Capitalize](#uppercase-lowercase--capitalize)
    - [Rounded](#rounded)
    - [Fullwidth](#fullwidth)
    - [Elevations](#elevations)
    - [Ripple](#ripple)
    - [CSS Custom Properties](#css-custom-properties-1)
  - [Ripple](#ripple-1)
    - [Usage](#usage-2)
    - [Color](#color)
    - [Duration](#duration)
    - [Opacity](#opacity)
    - [CSS Custom Properties](#css-custom-properties-2)
  - [Chip](#chip)
    - [Usage](#usage-3)
    - [Appearance](#appearance-2)
    - [Size](#size)
    - [Color](#color-1)
    - [Rounded](#rounded-1)
    - [Closable](#closable)
    - [Methods](#methods-1)
      - [close](#close-2)
    - [Events](#events-1)
      - [close](#close-3)
    - [CSS Custom Properties](#css-custom-properties-3)
  - [Card](#card)
    - [Usage](#usage-4)
    - [Header, Body \& Footer](#header-body--footer)
    - [Color](#color-2)
    - [Outlined](#outlined)
    - [Disabled](#disabled)
    - [CSS Custom Properties](#css-custom-properties-4)
  - [Text Fields](#text-fields)
    - [Basic usage](#basic-usage)
    - [Appearance](#appearance-3)
    - [Colors](#colors-2)
    - [Label](#label)
    - [Placeholder](#placeholder)
    - [Type](#type-1)
    - [Name](#name)
    - [Autofocus](#autofocus)
    - [Hint](#hint)
    - [Slots: prepend-inner \& append-inner](#slots-prepend-inner--append-inner)
    - [Validations](#validations)
    - [Error messages](#error-messages)
    - [Custom validations](#custom-validations)
    - [CSS Custom Properties](#css-custom-properties-5)
  - [Advance](#advance)
    - [Color palette](#color-palette)
      - [Customize color palette](#customize-color-palette)
    - [Dark mode](#dark-mode)

## Installation

To start using the suite of components it is necessary to install the package.

```bash
npm i @holejs/wc
```

## Setup

Import the component suite into your main input file. Generally the `index.ts` is used.

```ts
// Imports styles.
import '@holejs/wc/styles/elevations.css'
import '@holejs/wc/styles/colors.css'

// Import all components.
import '@holejs/wc'

// or import specific components.
import '@holejs/wc/button/button.js'
```

## Alerts

The `hwc-alert` component is to provide a simple way to display warning messages, success messages, error messages, or relevant information to the user, without having to worry about the complexity of the underlying logic or visual customization. With hwc-alert, developers can create compelling visual notifications quickly and efficiently.

### Usage

To use the `Alerts` component, you can include it in your HTML code using the following syntax:

**Typescript/Javascript**

```ts
import '@holejs/wc/alert/alert.js'
```

**HTML**

```html
<hwc-alert>Basic alert!</hwc-alert>
```

### Type

Allows you to modify the intent of the component. Currently the available values are the following: `info`, `success`, `warning` y `error`.

```html
<!-- It is not necessary to specify. -->
<hwc-alert type="info">Info alert!</hwc-alert>

<hwc-alert type="success">Success alert!</hwc-alert>

<hwc-alert type="warning">Warning alert!</hwc-alert>

<hwc-alert type="error">Error alert!</hwc-alert>
```

### Appearance

Allows you to modify the appearance of the component. Currently the available values are the following: `filled`, `outlined` y `text`.

```html
<!-- It is not necessary to specify. -->
<hwc-alert appearance="filled">Filled alert!</hwc-alert>

<hwc-alert appearance="outlined">Outlined alert!</hwc-alert>

<hwc-alert appearance="text">Text alert!</hwc-alert>
```

### Colors

The color property allows you to modify the color of the component.

```html
<hwc-alert color="green-darken-2">Color palette alert!</hwc-alert>

<hwc-alert color="#5963C3">Hexadecimal alert!</hwc-alert>

<hwc-alert appearance="rgb(187, 89, 195)">RGB alert!</hwc-alert>
```

> **NOTE**: You can see the color palette in the following link [Color palette](#color-palette)

### Dismissible

Add a button that allows you to interactively close the component by clicking it.

```html
<hwc-alert dismissible>Dismissible alert!</hwc-alert>
```

### Methods

#### close

> $el.close(): void

Method in charge of removing the component.

**Parameters**

None.

**Example**

```html
<hwc-alert closable>I'm Alert.</hwc-alert>

<script>
  // Capture element.
  const $alert = document.querySelector('hwc-alert')

  // Close element after 3 seconds.
  setTimeout(() => $alert.close(), 3000)
</script>
```

### Events

#### close

This event is fired when the `close()` method is executed.

**Using Lit**

```html
<hwc-alert @close=${() => console.log('Closed')} closable>Closable alert!</hwc-alert>
```

**Using Vanilla**

```html
<hwc-alert closable>Closable alert!</hwc-alert>

<script>
  const $alert = document.querySelector('hwc-alert')

  $alert.addEventListener('close', (ev) => {
    // You can prevent removal.
    // ev.preventDefault()

    console.log('Closed')
  })
</script>
```

### CSS Custom Properties

| Name                        | Description                              |
| --------------------------- | ---------------------------------------- |
| `--hwc-alert-color`         | Main color of the alert.                 |
| `--hwc-alert-bg`            | Background color of the alert.           |
| `--hwc-alert-text-color`    | Text color inside the alert.             |
| `--hwc-alert-padding`       | Internal spacing of the alert's content. |
| `--hwc-alert-font-family`   | Typography font used in the alert.       |
| `--hwc-alert-font-size`     | Font size of the text inside the alert.  |
| `--hwc-alert-border-radius` | Border radius of the alert's corners.    |
| `--hwc-alert-border-style`  | Border style of the alert.               |
| `--hwc-alert-border-color`  | Border color of the alert.               |
| `--hwc-alert-border-width`  | Border width of the alert.               |

## Buttons

The `Buttons` component provides a simple and flexible way to create interactive buttons in your web application. Buttons are essential elements that allow users to perform actions and interact with your website or web application.

### Usage

To use the `Buttons` component, you can include it in your HTML code using the following syntax:

**Typescript/Javascript**

```ts
import '@holejs/wc/button/button.js'
```

**HTML**

```html
<!-- Regular button -->
<hwc-button>Click me!</hwc-button>
```

### Appearance

This property allows you to modify the layout of the component. The possible values are: `outlined`, `text`, `fab` & `icon`

```html
<!-- Regular -->
<hwc-button>Click me!</hwc-button>

<!-- Outlined -->
<hwc-button appearance="outlined">Click me!</hwc-button>

<!-- Text -->
<hwc-button appearance="text">Click me!</hwc-button>

<!-- Fab -->
<!-- Icon taken from https://icons.getbootstrap.com/icons/star-fill/ -->
<hwc-button appearance="fab" color="orange-darken-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>
</hwc-button>

<!-- Icon -->
<hwc-button appearance="icon" color="orange-darken-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>
</hwc-button>
```

### Colors

The color property allows you to modify the color of the component.

```html
<hwc-button color="green-darken-2">Click me!</hwc-button>

<hwc-button color="purple-darken-2" appearance="outlined">Click me!</hwc-button>

<hwc-button color="#674A9C" appearance="text">Click me!</hwc-button>
```

> **NOTE**: You can see the color palette in the following link [Color palette](#color-palette)

### Color gradient

You can set gradient colors using a simple css class. Let's see the following example:

```html
<style>
  /* Step 1: Define your class. */
  /* Gradient taken from https://uigradients.com/#ElectricViolet */
  .electric-violet__bg {
    --hwc-button-bg: #4776E6;
    --hwc-button-bg: -webkit-linear-gradient(to right, #8E54E9, #4776E6);
    --hwc-button-bg: linear-gradient(to right, #8E54E9, #4776E6);
  }
</style>

<!-- Step 2: Adding class. -->
<hwc-button class="electric-violet__bg">Gradient button!</hwc-button>
```

### Uppercase, Lowercase & Capitalize

These options allow you to make simple transformations to the button text.

```html
<hwc-button uppercase color="red-darken-2">Click me!</hwc-button>

<hwc-button lowercase appearance="outlined">CLICK ME!</hwc-button>

<hwc-button capitalize appearance="text" color="pink-darken-2">click me!</hwc-button>
```

### Rounded

This property adds pronounced borders to the side of the component.

```html
<hwc-button rounded uppercase color="red-darken-2">Click me!</hwc-button>
```

### Fullwidth

Is an attribute that makes the button stretch to the full width of its parent container.

```html
<hwc-button fullwidth rounded color="orange-darken-2">Click me!</hwc-button>
```

### Elevations

This property allows you to apply a visual lift effect to the component, creating a sense of depth and making the button appear to be raised or floating above the surface.

```html
<hwc-button elevation="1" color="teal-darken-2">Click me!</hwc-button>

<hwc-button elevation="2" appearance="text" color="green-darken-2">Click me!</hwc-button>

<hwc-button elevation="3" color="yellow-darken-2">Click me!</hwc-button>

<hwc-button elevation="4" appearance="outlined" color="blue-darken-2">Click me!</hwc-button>

<hwc-button elevation="5" color="teal-darken-2">Click me!</hwc-button>
```

**Create your custom elevations**

```html
<style>
  .custom__elevation {
    --hwc-button-box-shadow: 3px 7px 15px rgba(103, 74, 156 , 0.65);
  }
</style>

<hwc-button class="custom__elevation" color="purple-darken-2">Custom elevation button!</hwc-button>
```

### Ripple

The **ripple** effect simulates waves that propagate from the point where the interaction was made, spreading across the button area, and then gradually fading out.

```html
<hwc-button elevation="1">
  <!-- Adding ripple effect -->
  <hwc-ripple></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

### CSS Custom Properties

| Name                          | Description                                                               |
| ----------------------------- | ------------------------------------------------------------------------- |
| `--hwc-button-font-family`    | Font family for the button text.                                          |
| `--hwc-button-font-size`      | Font size for the button text.                                            |
| `--hwc-button-font-weight`    | This property determines the font weight of the button text.              |
| `--hwc-button-letter-spacing` | This property controls the spacing between characters in the button text. |
| `--hwc-button-height`         | This property sets the height of the button.                              |
| `--hwc-button-width`          | This property defines the width of the button.                            |
| `--hwc-button-padding`        | Padding for the button content.                                           |
| `--hwc-button-border-radius`  | Border radius for the button.                                             |
| `--hwc-button-border-width`   | Border width for the button.                                              |
| `--hwc-button-border-color`   | Border color for the button.                                              |
| `--hwc-button-border-style`   | Border style for the button.                                              |
| `--hwc-button-bg`             | Background color for the button.                                          |
| `--hwc-button-color`          | Color for the button.                                                     |
| `--hwc-button-text-color`     | Text color for the button.                                                |
| `--hwc-button-cursor`         | Cursor style when hovering over the button.                               |
| `--hwc-button-hover-bg`       | Background color when hovering over the button.                           |
| `--hwc-button-box-shadow`     | Allow to set shadows to the component.                                    |
| `--hwc-button-hover-opacity`  | Set opacity to the hover background component.                            |

## Ripple

This component is used to create a ripple effect that extends from the point of user interaction, providing pleasing visual feedback and increasing the sense of interactivity.

### Usage

To add this effect to any component, just insert the following line of code.

**Typescript/Javascript**

```ts
import '@holejs/wc/ripple/ripple.js'
```

**HTML**

```html
<!-- Button with Ripple effect -->
<hwc-button>
  <hwc-ripple></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

### Color

Is used to define the background color of the ripple effect.

```html
<hwc-button>
  <hwc-ripple color="green-darken-4"></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

### Duration

Controls the duration of the animation for the ripple effect. It determines how long it takes for the ripple to expand and fade out after the user interacts with the element.

```html
<hwc-button>
  <hwc-ripple duration="1s" color="green-darken-4"></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

### Opacity

Controls the transparency level of the ripple effect. It determines how much of the underlying content is visible through the ripple animation.

```html
<hwc-button>
  <hwc-ripple opacity="0.5" color="red-darken-4"></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

### CSS Custom Properties

| Property                          | Description                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--hwc-ripple-bg`                 | Defines the background color of the ripple effect. For default: `currentColor`.                                                                               |
| `--hwc-ripple-opacity`            | Controls the opacity of the ripple effect. You can adjust this value to achieve different levels of opacity. For default is: `0.35`                           |
| `--hwc-ripple-animation-duration` | Determines the duration of the animation for the ripple effect. For default: `700ms`. You can change this value based on the desired speed for the animation. |

## Chip

The `<hwc-chip>` are elements known as tags or input labels, the chips are small visual representations of information or selections that allow efficient and friendly interaction with the user.

### Usage

To use the `<hwc-chip>` component, you can include it in your HTML code using the following syntax:

**Javascript/Typescript**

```ts
import '@holejs/wc/chip/chip.js'
```

**HTML**

```html
<hwc-chip>Default chip!</hwc-chip>
```

### Appearance

This property is useful when you want to modify the appearance of the component. Currently the available values are the following: `filled`, `outlined` y `text`

```html
<!-- It is not necessary to specify. -->
<hwc-chip appearance="regular">Regular chip!</hwc-chip>

<hwc-chip appearance="outlined" color="indigo-lighten-1">Outlined chip!</hwc-chip>

<hwc-chip appearance="text" color="orange-darken-2">Text chip!</hwc-chip>
```

### Size

This property is used when you want to change the size of the component. Currently the available values are the following: `x/small`, `small`, `regular`, `large` y `x-large`

```html
<hwc-chip size="x-small">x-small chip!</hwc-chip>

<hwc-chip size="small">small chip!</hwc-chip>

<!-- It is not necessary to specify. -->
<hwc-chip size="regular">regular chip!</hwc-chip>

<hwc-chip size="large">x-large chip!</hwc-chip>

<hwc-chip size="x-large">large chip!</hwc-chip>
```

### Color

The color property allows you to modify the color of the component.

```html
<hwc-chip color="indigo-darken-2">Colored chip!</hwc-chip>
```

> **NOTE**: You can see the color palette in the following link [Color palette](#color-palette)

### Rounded

This property allows you to add sharp edges to components.

```html
<hwc-chip rounded>I'm closable</hwc-chip>
```

### Closable

Allows the chip to be closed or removed by the user interactively. When the `closable` attribute is present, a close button or icon will be displayed within the chip, allowing users to remove or dismiss the chip with a simple click.

```html
<hwc-chip closable>I'm closable</hwc-chip>
```

### Methods


#### close

> $el.close(): void

Method in charge of removing the component.

**Parameters**

None.

**Example**

```html
<hwc-chip closable>I'm Chip.</hwc-chip>

<script>
  // Capture element.
  const $chip = document.querySelector('hwc-chip')

  // Close element after 3 seconds.
  setTimeout(() => $chip.close(), 3000)
</script>
```

### Events

#### close

This event is executed when the component's `close()` method is executed.

**Using Lit**

```html
<hwc-chip @close=${() => console.log('Closed')} closable>I'm Chip.</hwc-chip>
```

**Using Vanilla**

```html
<hwc-chip closable>I'm Chip.</hwc-chip>

<script>
  const $chip = document.querySelector('hwc-chip')

  $chip.addEventListener('close', () => {
    // You can prevent removal.
    // ev.preventDefault()

    console.log('Closed')
  })
</script>
```

### CSS Custom Properties

| Name                                | Description                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `--hwc-chip-font-family`            | Defines the font family used for the text inside the chip.       |
| `--hwc-chip-color`                  | Defines the main color of the chip.                              |
| `--hwc-chip-bg`                     | Defines the background color of the chip.                        |
| `--hwc-chip-text-color`             | Defines the text color inside the chip.                          |
| `--hwc-chip-font-size`              | Defines the font size used for the text inside the chip.         |
| `--hwc-chip-padding`                | Defines the padding of the content inside the chip.              |
| `--hwc-chip-border-width`           | Defines the border width of the chip.                            |
| `--hwc-chip-border-style`           | Defines the border style of the chip.                            |
| `--hwc-chip-border-color`           | Defines the border color of the chip.                            |
| `--hwc-chip-border-radius`          | Defines the border radius used to round the corners of the chip. |
| `--hwc-chip-opacity`                | Defines the opacity of the chip.                                 |
| `--hwc-chip-closable-button-height` | Defines the height of the closable button inside the chip.       |
| `--hwc-chip-closable-button-width`  | Defines the width of the closable button inside the chip.        |
| `--hwc-chip-closable-icon-height`   | Defines the height of the closable icon inside the chip.         |
| `--hwc-chip-closable-icon-width`    | Defines the width of the closable icon inside the chip.          |

## Card

The `<hwc-card>` component is a component that has been designed to provide a simple and flexible solution for displaying information in the form of cards within your web applications.

### Usage

To use the `<hwc-card>` component, you can include it in your HTML code using the following syntax:

**Javascript/Typescript**

```ts
import '@holejs/wc/card/card.js'
```

**HTML**

```html
<hwc-card>
  <h1>Card Component.</h1>
</hwc-card>
```

### Header, Body & Footer

The cards contain slots that allow you to set **header** and **footer**. See the following example:

```html
<hwc-card>
  <!-- Header -->
  <div slot="header"></div>

  <!-- Body (slot for default) -->
  <h1>Card Component.</h1>

  <!-- Footer -->
  <div slot="footer"></div>
</hwc-card>
```

### Color

Allows you to set the background color of the card.

> **NOTE**: To see all available colors, visit [Color palette](#color-palette)

```html
<hwc-card color="blue-darken-2">
  <h1>Card Component.</h1>
</hwc-card>
```

### Outlined

Allows you to set whether the card will have an outlined border.

```html
<hwc-card outlined>
  <h1>Card Component.</h1>
</hwc-card>
```

### Disabled

Allows you to disable the interaction with the card and apply a style to indicate that it is disabled.

```html
<hwc-card disabled>
  <h1>Card Component.</h1>
</hwc-card>
```

### CSS Custom Properties

| Name                        | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| `--hwc-card-color`          | Text color of the card element.                                                  |
| `--hwc-card-bg`             | Background color of the card element (uses `--hwc-card-color` if not specified). |
| `--hwc-card-text-color`     | Text color of the card element.                                                  |
| `--hwc-card-header-padding` | Padding of the header of the card element.                                       |
| `--hwc-card-body-padding`   | Padding of the body of the card element.                                         |
| `--hwc-card-footer-padding` | Padding of the footer of the card element.                                       |
| `--hwc-card-border-radius`  | Border radius of the card element.                                               |
| `--hwc-card-border-style`   | Border style of the card element.                                                |
| `--hwc-card-border-width`   | Border width of the card element.                                                |
| `--hwc-card-border-color`   | Border color of the card element (uses `--hwc-grey-lighten-1` if not specified). |
| `--hwc-card-box-shadow`     | Box shadow of the card element (currently commented out).                        |

## Text Fields

The `<hwc-text-field>` component is a highly customizable and reactive text input field, designed to make it easy to create interactive forms. It allows developers to create text fields to capture data such as **names**, **emails** and **passwords**, applying validation rules to ensure that the data entered is valid and secure.

This component is useful in any web application that requires the collection of user information through forms and seeks to simplify the validation process and error handling.

### Basic usage

**Typescript/Javascript**

```ts
import '@holejs/wc/text-field/text-field.js'
```

**HTML**

```html
<hwc-text-field
  appearance="outlined"
  name="fullname"
  label="Fullname"
  placeholder="Ivan Zaldivar"
></hwc-text-field>
```

### Appearance

Defines the visual style of the text field. The available values are: `outlined` y `underline`.

```html
<!-- It is not necessary to specify. -->
<hwc-text-field appearance="outlined"></hwc-text-field>

<hwc-text-field appearance="underline"></hwc-text-field>
```

### Colors

The color property allows you to modify the color of the component.

```html
<hwc-text-field color="blue-darken-2"></hwc-text-field>

<hwc-text-field color="#758D46"></hwc-text-field>

<hwc-text-field color="rgb(70, 141, 130)"></hwc-text-field>
```

> **NOTE**: You can see the color palette in the following link [Color palette](https://github.com/holejs/wc#color-palette)

### Label

Label that describes the purpose or content of the text field.

```html
<hwc-text-field label="Email"></hwc-text-field>
```

### Placeholder

Text that is displayed as a hint or guide within the text field before the user enters a value.

```html
<hwc-text-field placeholder="Exam: abc@domain.com"></hwc-text-field>
```

### Type

Type of the text field, for example, `text`, `email`, `password`, etc. Default value: `text`.

```html
<hwc-text-field type="password"></hwc-text-field>
```

### Name

Name of the text field that is used to identify the value entered in the form.

```html
<hwc-text-field name="fullname"></hwc-text-field>
```

### Autofocus

If this property is set, the text field will automatically get focus when the page loads.

```html
<hwc-text-field autofocus></hwc-text-field>
```

### Hint

Provides a hint or instruction to help the user complete the field.

```html
<hwc-text-field hint="Enter your email. For example: ivan@gmail.com"></hwc-text-field>
```

### Slots: prepend-inner & append-inner

The text fields allow adding slots to add graphic elements such as icons.

```html
<!-- Prepend -->
<hwc-text-field>
  <span style="display: flex;" slot="prepend-inner">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
  </span>
</hwc-text-field>

<!-- Append -->
<hwc-text-field>
  <span style="display: flex;" slot="append-inner">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
  </span>
</hwc-text-field>
```

### Validations

Validations are rules that are used to ensure that the value of the text field is valid. For example, a validation can ensure that the text field is not empty, that the value is an integer, or that it meets certain format criteria (for example, a valid email address). Below is a list of available rules:

- `required`: Specifies whether a form field needs to be completed before the form is submitted.
- `minlength` & `maxlength`: Specifies the minimum and maximum length of a text string.
- `min` & `max`: Specifies the minimum and maximum values for numeric input types.
- `email`: Specifies that the field will be valid when the text string matches the pattern of an email.
- `pattern`: Specifies a regular expression that defines a pattern that the input data should follow. For example: validate a password.

> The validations made to the text fields follow the guidelines by MDN. For more information visit the following link: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation

A more important consideration, is that when you use these custom text fields they will behave similarly to the native text fields (input). So when you submit the form, the typical tooltips will be shown along with the custom validations. If you do not want this behavior you will need to disable form validations.

```html
<form novalidate>
  <!-- ... -->
</form>

<script>
  document.querySelector('form').addEventListener('submit', (ev) => {
    ev.preventDefault()

    const $form = ev.target

    if (!$form.checkValidity()) {
      // ⛔ Invalid form.
      return;
    }

    // ✅ Valid form.
    // More code...
  })
</script>
```

Below are some examples:

**1. Validate a person's name.**

For this example, the field needs to be required, have at least 5 characters, and not exceed 50 characters.

```html
<hwc-text-field
  name="fullname"
  rules="required|minlength:5|maxlength:50"
></hwc-text-field>
```

**2. Validate email.**

For this example, the field needs to be required and to be a valid email.

```html
<hwc-text-field
  name="fullname"
  rules="required|email"
></hwc-text-field>
```

**3. Validate password.**

This example requires that the field be required and that the password meets the following criteria:

- Contain at least 8 characters.
- An uppercase letter
- A symbol
- A number.

```html
<hwc-text-field
  name="fullname"
  rules="required|pattern:^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
></hwc-text-field>
```

As you can see, it's that easy to add validations in real time (as the user types) by simply defining these rules. Surprising isn't it?

Now, you may need to customize these error messages. Don't worry, you can do it too. See the next section [Error messages.](#error-messages)

### Error messages

It is very likely that the default error messages will not meet your needs, but there is nothing to worry about, customizing the error messages is super easy. Let's see it in the following example:

```html
<hwc-text-field
  name="fullname"
  rules="required|minlength:5|maxlength:50"

  data-error-message-required="This field is required."
  data-error-message-minlength="Must contain at least 5 characters."
  data-error-message-maxlength="Must contain a maximum of 50 characters."
></hwc-text-field>
```

Excellent, by doing this you have already customized the error messages.

### Custom validations

Unlike default validations, such as **length validations** (`minlength` and `maxlength`) or **format validations** (`pattern`), custom validations allow developers to create specific validation rules that tailor to the needs of their application.

These rules can encompass anything from validating the format of a phone number to checking if an email address already exists in the database. If the entered data does not meet a custom validation rule, a feedback message is displayed to the user to inform them about the error and assist them in correcting it.

Creating our own validation rules is extremely easy. Let's see the following example.

**It validates that the name entered is of a man, since it only accepts names of men.**

```ts
const $fullname = document.querySelector('hwc-text-field')

// Set out validation.
$fullname.setValidation('gender', async ({ input }) => {
  const { value } = input

  const res = await fetch(`https://api.genderize.io/?name=${value}`)

  const data = await res.json()

  // Invalid. ⛔
  if (!data.gender || data.gender === 'female') {
    return { status: 'invalid', message: 'Only men are allowed.' }
  }

  // Valid. ✅
  return { status: 'complete' }
})
```

Ready, this way we can define our own validations with their feedback messages. 💪

### CSS Custom Properties

| Property Name                       | Description                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `--hwc-text-field-focused-color`      | Defines the color of the text field when it is in the focused state (focus). Default: **unset**                     |
| `--hwc-text-field-bg`                 | Defines the background color of the text field. Default: **unset**                                                  |
| `--hwc-text-field-font-family`        | Sets the font family for the text inside the text field. Default: **Poppins, sans-serif**                           |
| `--hwc-text-field-input-text-color`   | Defines the text color of the entered text in the text field. Default: **unset**                                    |
| `--hwc-text-field-input-font-size`    | Sets the font size of the text inside the text field. Default: **16px**                                             |
| `--hwc-text-field-label-font-size`    | Sets the font size for the label of the text field. Default: **14px**                                               |
| `--hwc-text-field-label-text-color`   | Defines the text color of the label in the text field. Default: **unset**                                           |
| `--hwc-text-field-details-font-size`  | Sets the font size for the details or help messages in the text field. Default: **12px**                            |
| `--hwc-text-field-details-text-color` | Defines the text color of the details or help messages in the text field. Default: **unset**                        |
| `--hwc-text-field-padding`            | Defines the internal padding of the text field. Default: **15px**                                                   |
| `--hwc-text-field-border-color`       | Defines the border color of the text field. Default: **unset**                                                      |
| `--hwc-text-field-border-width`       | Sets the border width of the text field. Default: **2px**                                                           |
| `--hwc-text-field-border-style`       | Defines the border style of the text field. Default: **solid**                                                      |
| `--hwc-text-field-border-radius`      | Sets the border radius of the text field, creating rounded borders. Default: **10px**                               |
| `--hwc-text-field-transition`         | Sets the duration and transition function for the animations applied to the text field. Default: **200ms all ease** |
| `--hwc-text-field-error-color`         | Defines the color used to highlight the error status in a text field. Default: **--hwc-red-darken-2** |
| `--hwc-text-field-inner-color`         | Defines the internal color (only applies to slots) of a text field. |

## Advance

In this section you will find detailed explanations of the library's features, making it easy for developers of all levels to take advantage of every aspect of the library effectively.

### Color palette

**Holejs** provides a wide variety of colors that you can use in your applications, currently there are more than 220 colors.

> **INFO**: If you want to see the entire color palette, we recommend that you visit the following link [Color Palette](https://github.com/holejs/wc/blob/main/src/assets/colors.css).

#### Customize color palette

Now, you may want to define your own color palette and use it in the components. Holejs is already prepared for this type of case. Let's see the following example.

**Step 1: Define your color palette.**

```css
:root {
  --hwc-awesome-color-1: #B319D2;
  --hwc-awesome-color-2: #D21976;
  --hwc-awesome-color-3: #D21919;
  --hwc-awesome-color-4: #CFD219;
  --hwc-awesome-color-5: #19D270;

  /* Or overwite color palette */
  --hwc-orange-darken-2: rgb(0, 255, 8);
}
```

**Step 2: Import your stylesheet.**

```ts
// Imports styles.
import '@holejs/wc/styles/colors.css'
import '@holejs/wc/styles/elevations.css'

// Import your stylesheet.
// It's important to add it after importing our styles, otherwise it won't overwrite the variables.
import './styles.css'

// ...
```

**Step 3: Use your color.**

```html
<hwc-button color="awesome-color-1">Click me!</hwc-button>
```

And there you have it, that way you can extend or modify the color palette to your liking.

### Dark mode

Adding dark mode to components is super easy. Let's see it with the following example:

```html
<html>
  <body>
    <style>
      body.dark {
        /* Customize CSS Custom props of the components */
        --hwc-card-bg: rgba(0, 0, 0, .8);
        --hwc-text-field-bg: rgba(0, 0, 0, .8);
        /* Adding more CSS Custom Props... */
      }
    </style>

    <!-- Define your toggle button. -->
    <button class="button">Change theme</button>

    <script>
      // Get button.
      const $button = document.querySelector('.button')

      // Capture event and change theme light/dark.
      $button.addEventListener('click', () => {
        document.body.classList.toggle('dark')
      })
    </script>
  </body>
</html>
```
