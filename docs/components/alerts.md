# Alerts

The `hwc-alert` component is to provide a simple way to display warning messages, success messages, error messages, or relevant information to the user, without having to worry about the complexity of the underlying logic or visual customization. With hwc-alert, developers can create compelling visual notifications quickly and efficiently.

## Usage

To use the `Alerts` component, you can include it in your HTML code using the following syntax:

**Typescript/Javascript**

```ts
import '@holejs/wc/alert/alert.js'
```

**HTML**

```html
<hwc-alert>Basic alert!</hwc-alert>
```

## Type

Allows you to modify the intent of the component. Currently the available values are the following: `info`, `success`, `warning` y `error`.

```html
<!-- It is not necessary to specify. -->
<hwc-alert type="info">Info alert!</hwc-alert>

<hwc-alert type="success">Success alert!</hwc-alert>

<hwc-alert type="warning">Warning alert!</hwc-alert>

<hwc-alert type="error">Error alert!</hwc-alert>
```

## Appearance

Allows you to modify the appearance of the component. Currently the available values are the following: `filled`, `outlined` y `text`.

```html
<!-- It is not necessary to specify. -->
<hwc-alert appearance="filled">Filled alert!</hwc-alert>

<hwc-alert appearance="outlined">Outlined alert!</hwc-alert>

<hwc-alert appearance="text">Text alert!</hwc-alert>
```

## Colors

The color property allows you to modify the color of the component.

```html
<hwc-alert color="green-darken-2">Color palette alert!</hwc-alert>

<hwc-alert color="#5963C3">Hexadecimal alert!</hwc-alert>

<hwc-alert appearance="rgb(187, 89, 195)">RGB alert!</hwc-alert>
```

> **NOTE**: You can see the color palette in the following link [Color palette](#color-palette)

## Dismissible

Add a button that allows you to interactively close the component by clicking it.

```html
<hwc-alert dismissible>Dismissible alert!</hwc-alert>
```

## Methods

### close

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

## Events

### close

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

## CSS Custom Properties

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
