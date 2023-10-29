# Selects

The `hwc-select` component is a provide a way to select an option from a list of options. Similar to the native `<select>` element. Obviously, the `hwc-select` component incorporates more advanced options, such as validations, error messages, multiple selection, among others.

## Basic Usage

To use the `hwc-select` component, you can use the following code:

**Typescript/Javascript**

```ts
import '@holejs/wc/select/select-option.js';
import '@holejs/wc/select/select.js';

const $form = document.querySelector('form');

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData($form);

  // Get the value of the select.
  console.log(formData.get('colors'));
});
```

```html
<form>
  <hwc-select name="colors" label="Select an option">
    <hwc-select-option value="blue">Blue</hwc-select-option>
    <hwc-select-option value="red">Red</hwc-select-option>
    <hwc-select-option value="orange">Orange</hwc-select-option>
  </hwc-select>
</form>
```

## Name

The `name` attribute is used to identify the form data after it has been submitted.

```html
<hwc-select name="select">
  <!-- Define my options. -->
</hwc-select>
```

## Label

The `label` attribute is used to define the label of the `hwc-select` component.

```html
<hwc-select label="Select an option">
  <!-- Define my options. -->
</hwc-select>
```

## Hint

The `hint` attribute is used for provides instruction to help the user complete the field.

```html
<hwc-select hint="Select an option">
  <!-- Define my options. -->
</hwc-select>
```

## Color

The `color` attribute is used to define the color of the component.

```html
<hwc-select color="blue-darken-2">
  <!-- Define my options. -->
</hwc-select>

<hwc-select color="#2196f3">
  <!-- Define my options. -->
</hwc-select>

<hwc-select color="rgb(33, 150, 243)">
  <!-- Define my options. -->
</hwc-select>
```

> **Info**
> You can see the color palette in the following link [Color palette](/src/assets/colors.css).

## Multiple

The `multiple` attribute is used to define if the user can select multiple options.

```html
<hwc-select multiple>
  <!-- Define my options. -->
</hwc-select>
```

## Disabled

The `disabled` attribute is used to define if the component is disabled.

```html
<hwc-select disabled>
  <!-- Define my options. -->
</hwc-select>
```

## Readonly

The `readonly` attribute is used to define if the component is readonly.

```html
<hwc-select readonly>
  <!-- Define my options. -->
</hwc-select>
```

## Value

The `value` attribute is used to define the value of the options selected.

```html
<hwc-select>
  <hwc-select-option value="blue">Blue</hwc-select-option>
  <hwc-select-option value="red">Red</hwc-select-option>
  <hwc-select-option value="orange">Orange</hwc-select-option>
</hwc-select>
```

## Checked

The `checked` attribute is used to define the options selected.

```html
<hwc-select name="color" label="Color">
  <hwc-select-option
    value="blue"
    checked
  >Blue</hwc-select-option>

  <hwc-select-option value="red">Red</hwc-select-option>

  <hwc-select-option
    value="orange"
    checked
  >Orange</hwc-select-option>
</hwc-select>
```

## Validations

The `hwc-select` component has the following validations:

- `required`: The `required` attribute is used to define if the component is required.
- `min`: The `min` attribute is used to define the minimum number of options that the user must select.
- `max`: The `max` attribute is used to define the maximum number of options that the user must select.

```html
<hwc-select
  name="color"
  label="Color"
  rules="required"
>
  <hwc-select-option value="blue">Blue</hwc-select-option>
  <hwc-select-option value="red">Red</hwc-select-option>
  <hwc-select-option value="orange">Orange</hwc-select-option>
</hwc-select>
```

## Error Message

The `hwc-select` component has the following error messages:

```html
<hwc-select
  data-error-message-required="This field is required."
>
  <hwc-select-option value="blue">Blue</hwc-select-option>
  <hwc-select-option value="red">Red</hwc-select-option>
  <hwc-select-option value="orange">Orange</hwc-select-option>
</hwc-select>
```

## CSS Custom Properties

| Name                          | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `--hwc-select-primary-color`    | Primary color of the select component (default value: #3f51b5) |
| `--hwc-select-secondary-color`  | Secondary color of the select component (default value: #f50057) |
| `--hwc-select-error-color`      | Error color of the select component (default value: #f44336) |
| `--hwc-select-height`           | Height of the select component (default value: 52px)    |
| `--hwc-select-background`       | Background of the select component (default value: white) |
| `--hwc-select-border-width`     | Border width of the select component (default value: 2px) |
| `--hwc-select-border-style`     | Border style of the select component (default value: solid) |
| `--hwc-select-border-color`     | Border color of the select component (default value: var(--hwc-grey-lighten-2)) |
| `--hwc-select-border-radius`    | Border radius of the select component (default value: 0.75rem) |
| `--hwc-select-font-family`      | Font family of the select component (default value: 'Nunito Sans', sans-serif) |
| `--hwc-select-margin-bottom`    | Margin bottom of the select component (default value: 0.625rem) |
| `--hwc-select-margin-top`       | Margin top of the select component (default value: 0.5rem) |
| `--hwc-select-suggestions-item-padding` | Padding of the suggestions item (default value: 0.0625rem) |
| `--hwc-select-options-padding` | Padding of the options (default value: 0.625rem)         |
| `--hwc-select-options-border-radius` | Border radius of the options (default value: 0.75rem) |
| `--hwc-select-options-background` | Background of the options (default value: white)         |
| `--hwc-select-transition`      | Transition of the select component (default value: 250ms ease all) |
| `--hwc-select-font-size`        | Font size of the select component (default value: 1rem) |
| `--hwc-select-error-color`      | Error color of the select component (default value: var(--hwc-red-darken-2)) |
