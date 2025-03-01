import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  palette: {
    background: {
      theme: "#525561",
      appBg: "#272a37",
    },
    primary: {
      main: "#1d90f5",
      light: "#58aef9",
      dark: "#0082f4",
    },
   
    text: {
      mainColor: "#f7f7f7",
      inputBorder: "#e1e1e1",
    },

    buttonText: "#f7f7f7",

    priority: {
      error: "#C62828",
      success: "#00897B",
      warning: "#303F9F",
    },
  },
  breakpoints: {
    mobile: "600px",
  },
};

export const lightTheme: DefaultTheme = {
  palette: {
    background: {
      theme: "#e8e8e8",
      appBg: "#ffffff",
    },
    primary: {
      main: "#1d90f5",
      light: "#58aef9",
      dark: "#0082f4",
    },

    buttonText: "#ffffff",
    
    text: {
      mainColor: "#000000",
      inputBorder: "#e1e1e1",
    },

    priority: {
      error: "#C62828",
      success: "#00897B",
      warning: "#303F9F",
    },
  },
  breakpoints: {
    mobile: "600px",
  },
};
