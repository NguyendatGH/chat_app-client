// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      background: {
        theme: string;
        appBg: string;
      };
      primary: {
        main: string; //button color
        dark: string;
        light: string;
      };

      buttonText: string;
      text: {
        mainColor: string;
        inputBorder: string;
      };
      priority: {
        success: string;
        error: string;
        warning: string;
      };
    };
    breakpoints: {
      mobile: string;
    };
  }
}
