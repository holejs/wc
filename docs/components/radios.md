# Radio Buttons

The `<hwc-radio-button>` component is a custom component for creating stylized radio buttons. This component offers a series of properties that allow you to customize its appearance and behavior to suit different use cases.

## Usage

To use the `<hwc-radio-button>` component, simply include tag in your HTML. You can adjust the properties to customize the appearance and behavior of the radio button.

**Javacript7Typescript**

```ts
import '@holejs/wc/radio/radio.js'
```

**HTML**

```html
<hwc-radio
  name="color"
  color="green-darken-2"
  value="green"
  rules="required"
>Green</hwc-radio>
```

## Color

The color property allows you to modify the color of the component.

```html
<hwc-radio color="orange-darken-2"></hwc-radio>

<hwc-radio name="#6D214F"></hwc-radio>

<hwc-radio color="rgba(85, 230, 193,1.0)"></hwc-radio>
```

> **NOTE**
> You can see the color palette in the following link [Color palette](#color-palette)

## Name

Specifies the name that the radio button will have.

```html
<hwc-radio name="color"></hwc-radio>
```

## Value

Defines the value associated with the radio button when it is checked. For default is: `on`

```html
<!-- For default -->
<hwc-radio value="on"></hwc-radio>

<hwc-radio name="color" value="green"></hwc-radio>
```

## Checked

Indicates whether the radio button is initially checked.

```html
<hwc-radio checked></hwc-radio>
```

## Disabled

Determines whether the radio button is disabled, which prevents the user from interacting with it.

```html
<hwc-radio disabled></hwc-radio>
```

## Validations & Error Messages

Unlike the validations of the `<hwc-text-field>`, the radio button only presents one type of validation, those of required and are defined the same as the `<hwc-text-field>`.

```html
<hwc-radio
  rules="required"
  data-error-message-required="Complete the radio button."
></hwc-radio>
```

## CSS Custom Properties

| Variable                         | Description                                                |
| -------------------------------- | ---------------------------------------------------------- |
| `--hwc-radio-color`              | Main color of the radio buttons.                           |
| `--hwc-radio-width`              | Width of the radio buttons.                                |
| `--hwc-radio-height`             | Height of the radio buttons.                               |
| `--hwc-radio-border-width`       | Width of the border of the radio buttons.                  |
| `--hwc-radio-border-style`       | Border style of the radio buttons.                         |
| `--hwc-radio-border-color`       | Color of the border of the radio buttons.                  |
| `--hwc-radio-checkmark-width`    | Width of the checkmark of the radio buttons.               |
| `--hwc-radio-checkmark-height`   | Height of the checkmark of the radio buttons.              |
| `--hwc-radio-font-size`          | Font size of the radio buttons.                            |
| `--hwc-radio-font-family`        | Font family of the radio buttons.                          |
| `--hwc-radio-text-color`         | Text color of the radio buttons.                           |
| `--hwc-radio-error-color`        | Color of the radio buttons when they are in error.         |
| `--hwc-radio-focus-shadow`       | Shadow displayed when a radio button is focused.           |
| `--hwc-radio-border-hover-color` | Border color of the radio buttons when hovering over them. |
