# Ripple

This component is used to create a ripple effect that extends from the point of user interaction, providing pleasing visual feedback and increasing the sense of interactivity.

## Usage

To add this effect to any component, just insert the following line of code.

**Typescript/Javascript**

```ts
import '@holejs/wc/ripple/ripple.js'
```

**HTML**

```html
<!-- Button with Ripple effect -->
<hwc-button>
  <hwc-ripple></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

## Color

Is used to define the background color of the ripple effect.

```html
<hwc-button>
  <hwc-ripple color="green-darken-4"></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

## Duration

Controls the duration of the animation for the ripple effect. It determines how long it takes for the ripple to expand and fade out after the user interacts with the element.

```html
<hwc-button>
  <hwc-ripple duration="1s" color="green-darken-4"></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

## Opacity

Controls the transparency level of the ripple effect. It determines how much of the underlying content is visible through the ripple animation.

```html
<hwc-button>
  <hwc-ripple opacity="0.5" color="red-darken-4"></hwc-ripple>
  Button + Ripple!
</hwc-button>
```

## CSS Custom Properties

| Property                          | Description                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--hwc-ripple-bg`                 | Defines the background color of the ripple effect. For default: `currentColor`.                                                                               |
| `--hwc-ripple-opacity`            | Controls the opacity of the ripple effect. You can adjust this value to achieve different levels of opacity. For default is: `0.35`                           |
| `--hwc-ripple-animation-duration` | Determines the duration of the animation for the ripple effect. For default: `700ms`. You can change this value based on the desired speed for the animation. |
