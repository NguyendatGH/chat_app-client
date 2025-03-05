// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      background: {
        theme: string;
        appBg: string;
        chatBg: string;
      };
      primary: {
        main: string;
        dark: string;
        light: string;
      };
      button: {
        buttonColor: string;
        buttonText: string;
      };
      text: {
        mainColor: string;
        firstColor: string;
        secondColor: string;
      };
      priority: {
        success: string;
        error: string;
        warning: string;
      };

      border: string;
    };
    breakpoints: {
      mobile: string;
    };
  }
}
