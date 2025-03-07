import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  palette: {
    background: {
      theme: "#525561",
      appBg: "#272a37",
      chatBg: "#f1f1f1",
    },
    primary: {
      main: "#1d90f5",
      light: "#58aef9",
      dark: "#0082f4",
    },

    text: {
      mainColor: "#f7f7f7",
      firstColor: "CFD3E4",
      secondColor: "#ebebeb",

      textColor: "#000000",
      grayText: "#8e8e8e",
    },

    button: {
      buttonColor: "#1d90f5",
      buttonText: "#f7f7f7",
    },

    priority: {
      error: "#C62828",
      success: "#00897B",
      warning: "#303F9F",
    },
    border: "#ebebeb",
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
      chatBg: "#f1f1f1",
    },
    primary: {
      main: "#1d90f5",
      light: "#58aef9",
      dark: "#0082f4",
    },

    button: {
      buttonColor: "#1d90f5",
      buttonText: "#f7f7f7",
    },

    text: {
      mainColor: "#000000",
      firstColor: "#7678EE",
      secondColor: "#EEEFFA",

      textColor: "#000000",

      grayText: "#8e8e8e",
    },

    priority: {
      error: "#C62828",
      success: "#00897B",
      warning: "#dbdbdb",
    },
    border: "#ebebeb",
  },
  breakpoints: {
    mobile: "600px",
  },
};
