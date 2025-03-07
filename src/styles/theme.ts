import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  palette: {
    background: {
      theme: "#333941",
      appBg: "#272a37",
      chatBg: "#13191D",
    },
    primary: {
      main: "#1d90f5",
      light: "#ffffff",
      dark: "#0082f4",
    },

    text: {
      mainColor: "#f7f7f7",
      firstColor: "#126EEF",
      secondColor: "#272F37",

      textColor: "#f7f7f7",
      grayText: "#c5c5c5",
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
    boxShadow: "#000000",
    border: "#353948",
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
      light: "#7678EE",
      dark: "#0082f4",
    },

    button: {
      buttonColor: "#1d90f5",
      buttonText: "#f7f7f7",
    },

    text: {
      mainColor: "#000000",


      firstColor: "#7678EE", //for messageBackground
      secondColor: "#EEEFFA",//for messageBackground

      textColor: "#ffffff",
      grayText: "#8e8e8e",
    },

    priority: {
      error: "#C62828",
      success: "#00897B",
      warning: "#dbdbdb",
    },
    boxShadow: "#d5d5d5",
    border: "#ebebeb",
  },
  breakpoints: {
    mobile: "600px",
  },
};
