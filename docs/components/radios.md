# Radio Buttons

The `<hwc-radio>` component is a custom component for creating stylized radio buttons. This component offers a series of properties that allow you to customize its appearance and behavior to suit different use cases.

## Usage

To use the `<hwc-radio>` component, simply include tag in your HTML. You can adjust the properties to customize the appearance and behavior of the radio button.

**Javacript/Typescript**

```ts
import '@holejs/wc/radio/radio.js'
```

**HTML**

```html
<hwc-radio
  name="color"
  color="green-darken-2"
  value="green"
  required
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
  required
  error-message-required="Complete the radio button."
></hwc-radio>
```

> [!NOTE]
> For more information about the validations visit the [Validations](/docs/components/text-fields.md#validations) and [Error Messages](/docs/components/text-fields.md#error-messages)

## Methods

### `reset(): void`

Resets the radio button to its initial state.

### `reportValidity(): Promise<boolean>`

Checks the validity of the radio button and displays the error messages.

### `checkValidity(): Promise<void>`

Checks the validity of the radio button and returns a boolean value indicating whether the element is valid or not. But it does not display the error messages.

### `setCustomValidity(message: string): void`

Sets a custom error message to be displayed when the text field is invalid.

### `setValidity(message: string | null): void`

> [!WARNING]
> The `setValidity` method is deprecated. Use `setCustomValidity` instead.

Sets the validity of the radio button and displays the error message if necessary.

## Events

### `change`

Fires when the radio button is checked or unchecked.

```html
<hwc-radio name="color" value="green">Green</hwc-radio>

<script>
  const radio = document.querySelector('hwc-radio');

  radio.addEventListener('change', (event) => {
    console.log(event.target.value);
  });
</script>
```

## API

| Property | Type | Attribute | Description |
| --- | --- | --- | --- |
| `value` | `string` | `value` | The value associated with the radio button when it is checked. **Default**: `on` |
| `color` | `string` | `color` | The color of the radio. You can set the color using different formats: HEX, RGB, RGBA, HSL, HSLA, color name, or color variable. |
| `checked` | `boolean` | `checked` | Indicates whether the radio button is initially checked. |
| `errorMessageRequired` | `string` | `error-message-required` | The error message to display when the radio button is required and no value is selected. |
| `name` | `string` | `name` | The name of the radio button. |
| `required` | `boolean` | `required` | Indicates whether the radio button is required. |
| `disabled` | `boolean` | `disabled` | Indicates whether the radio button is disabled. |
| `rules` | `string` | `rules` | The rules to apply to the radio button. **DEPRECATED** |
| `dirty` | `boolean` | `NA` | Indicates whether the radio button has been interacted with. |
| `touched` | `boolean` | `NA` | Indicates whether the radio button has been focused. |

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
| `--hwc-radio-font-color`         | Text color of the radio buttons.                           |
| `--hwc-radio-error-color`        | Color of the radio buttons when they are in error.         |
| `--hwc-radio-focus-shadow`       | Shadow displayed when a radio button is focused.           |
| `--hwc-radio-border-hover-color` | Border color of the radio buttons when hovering over them. |

## Todo's

- [ ] Add the value to the `change` event details
