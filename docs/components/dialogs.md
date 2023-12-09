# Dialogs

The `hwc-dialog` component is used to display a modal dialog box. It is used to show a message or get confirmation from the user.

## Usage.

```ts
import '@holejs/wc/dialog/dialog.js'

// Get elements.
const $dialog = document.querySelector('hwc-dialog')
const $button = document.querySelector('button')

// Capture the event when the user clicks on the button.
$button.addEventListener('click', () => {
  // Open the dialog.
  $dialog.open()
})
```

```html
<button>Open dialog</button>

<hwc-dialog>
  <!-- Add your content here. -->
</hwc-dialog>
```

## Persistent.

By default, the dialog will close when the user clicks outside the dialog. To prevent this behavior, add the `persistent` attribute.

```html
<hwc-dialog persistent>
  <!-- Add your content here. -->
</hwc-dialog>
```

## Events.

The `hwc-dialog` component emits the following events:

| Event name | Description |
|------------|-------------|
| `open` | Emitted when the dialog is opened. |
| `close` | Emitted when the dialog is closed. |

**Using Lit**

```html
<hwc-dialog
  @open=${() => console.log('Dialog opened.')}
  @close=${() => console.log('Dialog closed.')}
>
  <!-- Add your content here. -->
</hwc-dialog>
```

**Using Vanilla**

```ts
const $dialog = document.querySelector('hwc-dialog')

$dialog.addEventListener('open', () => {
  console.log('Dialog opened.')
})

$dialog.addEventListener('close', () => {
  console.log('Dialog closed.')
})
```

## Methods.

The `hwc-dialog` component has the following methods:

| Method name | Description |
|-------------|-------------|
| `open()` | Opens the dialog. |
| `close()` | Closes the dialog. |

## CSS Custom properties.

The `hwc-dialog` component has the following CSS custom properties:

| **Name**                              | **Description**                                                                                           |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `--hwc-dialog-width`                   | Width of the dialog box. Used in the `width` property of the `.dialog` class. Default: `400px`.            |
| `--hwc-dialog-padding`                 | Internal padding of the dialog box. Used in the `padding` property of the `.dialog` class. Default: `1.5rem`.|
| `--hwc-dialog-background`              | Background color of the dialog box. Used in the `background` property of the `.dialog` class. Default: `#ffffff`.|
| `--hwc-dialog-box-shadow`              | Shadow of the dialog box. Used in the `box-shadow` property of the `.dialog` class. Default: `0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25)`.|
| `--hwc-dialog-backdrop-background-color`| Background color of the backdrop blur filter for the dialog box. Used in the `background-color` property of the `::backdrop` pseudo-element of the `.dialog` class. Default: `rgba(0, 0, 0, 0.2)`.|


