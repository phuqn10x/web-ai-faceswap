import { Box } from "@chakra-ui/react";
import Footer from "../Footer";
import Header from "../Header";
import backgroundImage from "../../assets/images/background_main.png";
function Mainlayout({ children, background = backgroundImage }) {
  return (
    <Box bgImage={`url(${background})}`} bgSize="cover" bgRepeat="no-repeat">
      <Header />
      <div>{children} </div>
      <Footer />
    </Box>
  );
}

export default Mainlayout;
