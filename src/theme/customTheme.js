import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/mulish";
const customTheme = extendTheme({
  fonts: {
    body: "Mulish Variable", // Font chữ cho văn bản chính trong ứng dụng
    heading: "Mulish Variable", // Font chữ cho tiêu đề (heading)
    mono: "Mulish Variable", // Font chữ cho văn bản code (monospace)
  },
  sizes: {
    sm: "36rem", //500px
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1536px",
    "3xl": "1920px",
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "1rem", // 16px
    md: "1.125rem", // 18px (mặc định)
    lg: "1.25rem", // 20px
    xl: "1.375rem", // 22px
    // "2xl": "1.5rem", // 24px
    // "3xl": "1.875rem", // 30px
    // "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    // "6xl": "4rem",   // 64px
  },
  //   fontWeights: {
  //     normal: 400,
  //     medium: 600,
  //     semiMedium: 500,
  //     bold: 700,
  //   },
});
export default customTheme;
