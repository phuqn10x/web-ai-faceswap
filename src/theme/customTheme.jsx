import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/mulish";
// import backgroundImage from "../assets/images/background_main.png";
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
  styles: {
    global: {
      "::-webkit-scrollbar": {
        w: "5px",
        bgColor: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "14px",
        bgColor: "rgba(238, 238, 240, 1)",
        // padding:0,
        // bgImage:
        //   "linear(to bottom, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))!important",
      },
      body: {
        // scrollY: "none",
        // bgImage: `url(${backgroundImage})`,
        // bgSize: "cover",
        // bgRepeat: "no-repeat",
        // overflowY: "hidden",
      },
    },
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
  components: {
    Container: {
      baseStyle: {
        px: 0,
        py: 20, // Set default padding to 0
      },
    },
    Button: {
      variants: {
        rainbow: {
          _disabled: {
            color: "rgba(141, 141, 141, 1)", // Không thay đổi vị trí khi hover vào button bị disable
          },
        },
      },
    },
  },
  //   fontWeights: {
  //     normal: 400,
  //     medium: 600,
  //     semiMedium: 500,
  //     bold: 700,
  //   },
});
export default customTheme;
