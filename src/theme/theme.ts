// theme.ts
import { createTheme, createText } from '@shopify/restyle';

export const Colors = {
    white: "#FFFFFF",
    black: "#191a1a",
    gray00: "#F5F7F7",
    gray01: "#E3E5E6",
    gray02: "#CACCCC",
    gray03: "#7E7F80",
    gray04: "#414042",
    highlight: "#C3FF76",
    warn: "#AD1D00",
    success: "#28a745",
    primary: '#3498db',
    secondary: '#2c3e50',
    background: '#ecf0f1',
    text: '#333',
    blue: '#246EC4',
    lightGray01: 'F8FAFB'
}

export const theme = createTheme({
  colors: {...Colors},
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    displayXl: {
      fontSize: 148,
      fontWeight: 'bold',
      color: 'text',
    },
    display1: {
      fontSize: 64,
      fontWeight: 'bold',
      color: 'text',
    },
    display2: {
      fontSize: 48,
      fontWeight: 'bold',
      color: 'text',
    },
    display3: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'text',
    },
    header1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'text',
    },
    header2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'text',
    },
    header3: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'text',
    },
    body: {
      fontSize: 16,
      color: 'text',
    },
    paragraph1: {
      fontSize: 24,
      color: 'text',
    },
    paragraph2: {
      fontSize: 20,
      color: 'text',
    },
    paragraph3: {
      fontSize: 14,
      color: 'text',
    },
    paragraph4: {
      fontSize: 12,
      color: 'text',
    },
    link1:{
      fontSize: 20,
      color: 'text',
      textDecorationLine: 'underline',
    },
    link2:{
      fontSize: 14,
      color: 'text',
      textDecorationLine: 'underline',
    },
    link3:{
      fontSize: 12,
      color: 'text',
      textDecorationLine: 'underline',
    },
    defaults: {
      fontSize: 16,
    }
  },
  // ... any other theme properties you want
});

export type Theme = typeof theme;
export const Text = createText<Theme>();