import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const { Button, Link, List, FormLabel, Input } = chakraTheme.components;
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
export const theme = extendBaseTheme({
  fonts: {
    heading: "var(--font-poppins)",
    body: "var(--font-poppins)",
  },
  colors: {
    "gs-green": {
      50: "#e1fff0",
      100: "#b4fed7",
      200: "#85fcbd",
      300: "#57fba4",
      400: "#33fb8a",
      500: "#24e171",
      600: "#19af57",
      700: "#0d7e3e",
      800: "#014b25",
      900: "#001a09",
    },
    "gs-yellow": {
      50: "#fff4dd",
      100: "#fae3b3",
      200: "#f6d587",
      300: "#f1c959",
      400: "#edc02c",
      500: "#d39a12",
      600: "#a46d0a",
      700: "#754605",
      800: "#472500",
      900: "#1a0a00",
    },
    "gs-beige": {
      50: "#f9f9eb",
      100: "#eeebc8",
      200: "#e3daa4",
      300: "#d7c57e",
      400: "#cdad59",
      500: "#b48c41",
      600: "#8c6734",
      700: "#634525",
      800: "#3c2716",
      900: "#140c06",
    },
    "gs-gray": {
      50: "#e8f6f6",
      100: "#d4dbdd",
      200: "#bcc1c2",
      300: "#a4a9a9",
      400: "#8a8f91",
      500: "#707577",
      600: "#565c5d",
      700: "#3d4243",
      800: "#222729",
      900: "#001010",
    },
  },
  layerStyles: {
    "with-shadow": {
      boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    },
  },
  config,
  components: {
    List,
    Input,
    FormLabel,
    Link,
    Button: {
      ...Button,
      variants: {
        solid: {
          bg: "gs-green.700",
          _hover: {
            bg: "gs-green.800",
          },
        },
      },
      defaultProps: {
        ...Button.defaultProps,

        colorScheme: "gs-green",
        variant: "solid",
      },
    },
  },
});

export function AppChakraProvider({ children }: { children: ReactNode }) {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>;
}
