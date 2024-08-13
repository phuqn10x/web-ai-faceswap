import Header from "../Header";

import Footer from "../Footer";

import { Box } from "@chakra-ui/react";
import backgroundImage from "../../assets/images/background_main.png";
export default function AdvancedOptLayout({
  children,
  background = backgroundImage,
}) {
  return (
    <Box bgImage={`url(${background})}`} bgSize="cover" bgRepeat="no-repeat">
      <Header advanced/>
      <div>
        <div>{children}</div>
      </div>
      {/* <Footer /> */}
    </Box>
  );
}
