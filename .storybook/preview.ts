import type { Preview } from "@storybook/web-components";

// Import global styles.
import '../src/assets/elevations.css'
import '../src/assets/colors.css'
import './assets/styles.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
