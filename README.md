## Table of contents

- [Table of contents](#table-of-contents)
- [Buttons](#buttons)
  - [Usage](#usage)
  - [Appearance](#appearance)
  - [Colors](#colors)
  - [Uppercase, Lowercase \& Capitalize](#uppercase-lowercase--capitalize)
  - [Rounded](#rounded)
  - [Fullwidth](#fullwidth)
  - [CSS Custom Properties](#css-custom-properties)


## Buttons

The `Buttons` component provides a simple and flexible way to create interactive buttons in your web application. Buttons are essential elements that allow users to perform actions and interact with your website or web application.

### Usage

To use the `Buttons` component, you can include it in your HTML code using the following syntax:

```html
<!-- Regular button -->
<hwc-button>Click me!</hwc-button>
```

### Appearance

This property allows you to modify the layout of the component. The possible values are: `outlined` & `text`

```html
<hwc-button>Click me!</hwc-button>

<hwc-button appearance="outlined">Click me!</hwc-button>

<hwc-button appearance="text">Click me!</hwc-button>
```

### Colors

The color property allows you to modify the color of the component.

```html
<hwc-button color="green-darken-2">Click me!</hwc-button>

<hwc-button color="purple-darken-2" appearance="outlined">Click me!</hwc-button>

<hwc-button color="#674A9C" appearance="text">Click me!</hwc-button>
```

> **NOTE**: You can see the color palette in the following link [Color palette](https://github.com/holejs/web-components/blob/main/src/assets/colors.css)

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

### CSS Custom Properties

| Name                              | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| `--hwc-button-font-family`            | Font family for the button text.                |
| `--hwc-button-font-size`              | Font size for the button text.                  |
| `--hwc-button-padding`                | Padding for the button content.                 |
| `--hwc-button-border-radius`          | Border radius for the button.                   |
| `--hwc-button-border-width`           | Border width for the button.                    |
| `--hwc-button-border-color`           | Border color for the button.                    |
| `--hwc-button-border-style`           | Border style for the button.                    |
| `--hwc-button-bg`       | Background color for the button.                |
| `--hwc-button-color`                  | Text color for the button.                      |
| `--hwc-button-cursor`                 | Cursor style when hovering over the button.     |
| `--hwc-button-hover-bg-color` | Background color when hovering over the button. |
