# Card

The `<hwc-card>` component is a component that has been designed to provide a simple and flexible solution for displaying information in the form of cards within your web applications.

## Usage

To use the `<hwc-card>` component, you can include it in your HTML code using the following syntax:

**Javascript/Typescript**

```ts
import '@holejs/wc/card/card.js'
```

**HTML**

```html
<hwc-card>
  <h1>Card Component.</h1>
</hwc-card>
```

## Slots: Header, Body & Footer

The cards contain slots that allow you to set **header** and **footer**. See the following example:

```html
<hwc-card>
  <!-- Header -->
  <div slot="header"></div>

  <!-- Body (slot for default) -->
  <h1>Card Component.</h1>

  <!-- Footer -->
  <div slot="footer"></div>
</hwc-card>
```

## Color

Allows you to set the background color of the card.

> **NOTE**: To see all available colors, visit [Color palette](#color-palette)

```html
<hwc-card color="blue-darken-2">
  <h1>Card Component.</h1>
</hwc-card>
```

## Outlined

Allows you to set whether the card will have an outlined border.

```html
<hwc-card outlined>
  <h1>Card Component.</h1>
</hwc-card>
```

## Disabled

Allows you to disable the interaction with the card and apply a style to indicate that it is disabled.

```html
<hwc-card disabled>
  <h1>Card Component.</h1>
</hwc-card>
```

## CSS Custom Properties

| Name                        | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| `--hwc-card-color`          | Text color of the card element.                                                  |
| `--hwc-card-bg`             | Background color of the card element (uses `--hwc-card-color` if not specified). |
| `--hwc-card-font-color`     | Text color of the card element.                                                  |
| `--hwc-card-header-padding` | Padding of the header of the card element.                                       |
| `--hwc-card-body-padding`   | Padding of the body of the card element.                                         |
| `--hwc-card-footer-padding` | Padding of the footer of the card element.                                       |
| `--hwc-card-border-radius`  | Border radius of the card element.                                               |
| `--hwc-card-border-style`   | Border style of the card element.                                                |
| `--hwc-card-border-width`   | Border width of the card element.                                                |
| `--hwc-card-border-color`   | Border color of the card element (uses `--hwc-grey-lighten-1` if not specified). |
| `--hwc-card-box-shadow`     | Box shadow of the card element (currently commented out).                        |
