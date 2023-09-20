# Checkboxes

The `<hwc-checkbox>` component is a custom component for creating stylized checkboxes. This component offers a series of properties that allow you to customize its appearance and behavior to suit different use cases.

## Usage

To use the `<hwc-checkbox>` component, simply include tag in your HTML. You can adjust the properties to customize the appearance and behavior of the checkbox.

**Javacript7Typescript**

```ts
import '@holejs/wc/checkbox/checkbox.js'
```

**HTML**

```html
<hwc-checkbox name="terms"></hwc-checkbox>
```

## Color

The color property allows you to modify the color of the component.

```html
<hwc-checkbox color="orange-darken-2"></hwc-checkbox>

<hwc-checkbox name="#6D214F"></hwc-checkbox>

<hwc-checkbox color="rgba(85, 230, 193,1.0)"></hwc-checkbox>
```

> **NOTE**
> You can see the color palette in the following link [Color palette](#color-palette)

## Name

Specifies the name that the checkbox will have.

```html
<hwc-checkbox name="animal"></hwc-checkbox>
```

## Value

Defines the value associated with the checkbox when it is checked. For default is: `on`

```html
<!-- For default -->
<hwc-checkbox value="on"></hwc-checkbox>

<hwc-checkbox name="animal" value="cat"></hwc-checkbox>
```

## Checked

Indicates whether the checkbox is initially checked.

```html
<hwc-checkbox checked></hwc-checkbox>
```

## Disabled

Determines whether the checkbox is disabled, which prevents the user from interacting with it.

```html
<hwc-checkbox disabled></hwc-checkbox>
```

## Validations & Error Messages

Unlike the validations of the `<hwc-text-field>`, the checkbox only presents one type of validation, those of required and are defined the same as the `<hwc-text-field>`.

```html
<hwc-checkbox
  rules="required"
  data-error-message-required="Complete the checkbox."
></hwc-checkbox>
```

## Additionals

### How to extract the information?

Imagine you have several checkboxes that allow the user to select various technologies and you need to get it in the form of fixes.

**Define the checkboxes in your template (HTML)**

```html
<form>
  <hwc-checkbox name="technologies" value="lit">Lit</hwc-checkbox>

  <hwc-checkbox name="technologies" value="vue">Vue.js</hwc-checkbox>

  <hwc-checkbox name="technologies" value="angular">Angular</hwc-checkbox>

  <hwc-checkbox name="technologies" value="react">React</hwc-checkbox>

  <hwc-checkbox name="technologies" value="svelte">Svelte</hwc-checkbox>
</form>
```

**Capture event submit form.**

```ts
const $form = document.querySelector('form')

$form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const formdata = new FormData($form)

  const technologies = formdata.getAll('technologies')

  console.log(technologies)
});
```

This way you can extract a list of values selected by the user.

> **NOTE**
> When the form is submitted without `preventDefault()` the way it will send the data is as follows: `technologies=lit&technologies=vue`. More information https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#handling_multiple_checkboxes

## CSS Custom Properties

| Variable                              | Description                                           |
| ------------------------------------- | ----------------------------------------------------- |
| `--hwc-checkbox-color`                | Main color of the checkboxes.                         |
| `--hwc-checkbox-active-color`         | Color of active (checked) checkboxes.                 |
| `--hwc-checkbox-active-inner-color`   | Color of the interior of active (checked) checkboxes. |
| `--hwc-checkbox-focus-shadow`         | Shadow displayed when a checkbox is focused.          |
| `--hwc-checkbox-border-hover-color`   | Border color of the checkbox when hovering over it.   |
| `--hwc-checkbox-background-color`     | Background color of the checkboxes.                   |
| `--hwc-checkbox-disabled-color`       | Color of disabled checkboxes.                         |
| `--hwc-checkbox-disabled-inner-color` | Color of the interior of disabled checkboxes.         |
| `--hwc-checkbox-label-margin`         | Margin of the label text next to the checkbox.        |
| `--hwc-checkbox-font-family`          | Typography font for text related to the checkboxes.   |
| `--hwc-checkbox-border-width`         | Width of the border of the checkboxes.                |
| `--hwc-checkbox-border-style`         | Border style of the checkboxes.                       |
| `--hwc-checkbox-border-color`         | Color of the border of the checkboxes.                |
