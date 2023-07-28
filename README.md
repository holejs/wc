## Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Setup](#setup)
- [Buttons](#buttons)
  - [Usage](#usage)
  - [Appearance](#appearance)
  - [Colors](#colors)
  - [Color gradient](#color-gradient)
  - [Uppercase, Lowercase \& Capitalize](#uppercase-lowercase--capitalize)
  - [Rounded](#rounded)
  - [Fullwidth](#fullwidth)
  - [Elevations](#elevations)
  - [Ripple](#ripple)
  - [CSS Custom Properties](#css-custom-properties)
- [Ripple](#ripple-1)
  - [Usage](#usage-1)
  - [Color](#color)
  - [Duration](#duration)
  - [Opacity](#opacity)
  - [CSS Custom Properties](#css-custom-properties-1)
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
import '@holejs/wc/styles/colors.css'
import '@holejs/wc/styles/elevations.css'

// Import all components.
import '@holejs/wc'

// or import specific components.
import '@holejs/wc/button/button'
```

## Buttons

The `Buttons` component provides a simple and flexible way to create interactive buttons in your web application. Buttons are essential elements that allow users to perform actions and interact with your website or web application.

### Usage

To use the `Buttons` component, you can include it in your HTML code using the following syntax:

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
