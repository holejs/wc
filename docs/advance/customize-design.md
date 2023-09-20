## Color palette

**Holejs** provides a wide variety of colors that you can use in your applications, currently there are more than 220 colors.

> **INFO**: If you want to see the entire color palette, we recommend that you visit the following link [Color Palette](https://github.com/holejs/wc/blob/main/src/assets/colors.css).

## Customize color palette

Now, you may want to define your own color palette and use it in the components. Holejs is already prepared for this type of case. Let's see the following example.

**Step 1: Define your color palette.**

```css
:root {
  --hwc-awesome-color-1: #B319D2;
  --hwc-awesome-color-2: #D21976;
  --hwc-awesome-color-3: #D21919;
  --hwc-awesome-color-4: #CFD219;
  --hwc-awesome-color-5: #19D270;

  /* Or overwite color palette */
  --hwc-orange-darken-2: rgb(0, 255, 8);
}
```

**Step 2: Import your stylesheet.**

```ts
// Imports styles.
import '@holejs/wc/styles/colors.css'
import '@holejs/wc/styles/elevations.css'

// Import your stylesheet.
// It's important to add it after importing our styles, otherwise it won't overwrite the variables.
import './styles.css'

// ...
```

**Step 3: Use your color.**

```html
<hwc-button color="awesome-color-1">Click me!</hwc-button>
```

And there you have it, that way you can extend or modify the color palette to your liking.
