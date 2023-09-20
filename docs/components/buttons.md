# Buttons

The `Buttons` component provides a simple and flexible way to create interactive buttons in your web application. Buttons are essential elements that allow users to perform actions and interact with your website or web application.

## Usage

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

## Appearance

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

## Colors

The color property allows you to modify the color of the component.

```html
<hwc-button color="green-darken-2">Click me!</hwc-button>

<hwc-button color="purple-darken-2" appearance="outlined">Click me!</hwc-button>

<hwc-button color="#674A9C" appearance="text">Click me!</hwc-button>
```

> **NOTE**: You can see the color palette in the following link [Color palette](#color-palette)

## Color gradient

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

## Uppercase, Lowercase & Capitalize

These options allow you to make simple transformations to the button text.

```html
<hwc-button uppercase color="red-darken-2">Click me!</hwc-button>

<hwc-button lowercase appearance="outlined">CLICK ME!</hwc-button>

<hwc-button capitalize appearance="text" color="pink-darken-2">click me!</hwc-button>
```

## Rounded

This property adds pronounced borders to the side of the component.

```html
<hwc-button rounded uppercase color="red-darken-2">Click me!</hwc-button>
```

## Fullwidth

Is an attribute that makes the button stretch to the full width of its parent container.

```html
<hwc-button fullwidth rounded color="orange-darken-2">Click me!</hwc-button>
```

## Elevations

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

## Ripple

The **ripple** effect simulates waves that propagate from the point where the interaction was made, spreading across the button area, and then gradually fading out.

```html
<hwc-button elevation="1">
  <!-- Adding ripple effect -->
  <hwc-ripple></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

## CSS Custom Properties

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
