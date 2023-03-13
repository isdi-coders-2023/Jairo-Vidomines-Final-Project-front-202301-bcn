import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      primary: string;
    };
    colors: {
      backgroundColor: string;
      backgroundColorNavigationBar: string;
      mainColor: string;
      mainFontColor: string;
      mainFontColorButton: string;
    };
  }
}
