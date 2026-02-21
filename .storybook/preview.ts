import React from "react";
import type { Preview } from "@storybook/react";
import { I18nProvider } from "../i18n/context";
import "../app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        I18nProvider,
        { children: React.createElement(Story as React.ComponentType) }
      ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
