# Chip

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
