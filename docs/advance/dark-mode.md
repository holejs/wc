# Dark mode

Adding dark mode to components is super easy. Let's see it with the following example:

```html
<html>
  <body>
    <style>
      body.dark {
        /* Customize CSS Custom props of the components */
        --hwc-card-bg: rgba(0, 0, 0, .8);
        --hwc-text-field-bg: rgba(0, 0, 0, .8);
        /* Adding more CSS Custom Props... */
      }
    </style>

    <!-- Define your toggle button. -->
    <button class="button">Change theme</button>

    <script>
      // Get button.
      const $button = document.querySelector('.button')

      // Capture event and change theme light/dark.
      $button.addEventListener('click', () => {
        document.body.classList.toggle('dark')
      })
    </script>
  </body>
</html>
```
