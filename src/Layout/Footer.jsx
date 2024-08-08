import {
  Box,
  Flex,
  Link,
  Text,
  VStack,
  HStack,
  Icon,
  Container,
  SimpleGrid,
  Divider,
  Image,
  IconButton,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
// import Banner from "./ui/Banner";
// import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";

const Footer = () => {
  //   const MotionButton = motion(Button);
  return (
    <Box bg="white" mt={40}>
      {/* <Banner /> */}
      <Container maxW={"1440px"} p={0}>
        <Box py={10}>
          <Flex gap={"30px"} direction="column" align="center" mx="auto">
            <Flex justify="space-between" w="full" mt={10} px={4}>
              <VStack maxW={"405px"} align="start" spacing={2}>
                <Flex>
                  <Link href="#">
                    <Icon as={FaFacebook} boxSize={6} />
                  </Link>
                  <Link href="#">
                    <Icon as={FaTwitter} boxSize={6} mx={2} />
                  </Link>
                  <Link href="#">
                    <Icon as={FaLinkedin} boxSize={6} />
                  </Link>
                  <Link href="#">
                    <Icon as={FaYoutube} boxSize={6} mx={2} />
                  </Link>
                  <Link href="#">
                    <Icon as={FaTiktok} boxSize={6} />
                  </Link>
                </Flex>
                <Text>
                  9 RAFFLES PLACE, #29-05, REPUBLIC PLAZA, SINGAPORE (048619)
                </Text>
                <Link href="tel:+6584551999">+65-8455-1999</Link>
                <Link href="mailto:admin@amobear.com">admin@amobear.com</Link>
              </VStack>

              <VStack maxW={"405px"} align="start" spacing={2}>
                <Text fontWeight="bold">AI Tools</Text>
                <Link color={"black"} href="#">
                  AI Background Generator
                </Link>
                <Link color={"black"} href="#">
                  AI Face Swap
                </Link>
                <Link color={"black"} href="#">
                  AI Art Generator
                </Link>
                <Link color={"black"} href="#">
                  Other AI Tools
                </Link>
              </VStack>

              <VStack maxW={"405px"} align="start" spacing={2}>
                <Text fontWeight="bold">Tools</Text>
                <SimpleGrid
                  columns={{ base: 1, sm: 2 }}
                  gridGap={"10px 60px"}
                  spacing={2}
                >
                  <Link color={"black"} href="#">
                    Background Remover
                  </Link>
                  <Link color={"black"} href="#">
                    Image Enlarger
                  </Link>
                  <Link color={"black"} href="#">
                    Photo Retouch
                  </Link>
                  <Link color={"black"} href="#">
                    JPG Converter
                  </Link>
                  <Link color={"black"} href="#">
                    Image Compresser
                  </Link>
                  <Link color={"black"} href="#">
                    Face Enhancement
                  </Link>
                  <Link color={"black"} href="#">
                    Image to Text
                  </Link>
                  <Link color={"black"} href="#">
                    Toolbox
                  </Link>
                </SimpleGrid>
              </VStack>

              <VStack maxW={"405px"} align="start" spacing={2}>
                <Text fontWeight="bold">Help & FAQs</Text>
                <Link color={"black"} href="#">
                  FAQ
                </Link>
                <Link color={"black"} href="#">
                  Resources
                </Link>
                <Link color={"black"} href="#">
                  Contact Us
                </Link>
              </VStack>
            </Flex>
            <Divider opacity={1} />
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"full"}
            >
              <IconButton
                // flex={1}
                display={"flex"}
                // w={"20%"}
                _hover={{ bg: "none" }}
                icon={
                  <Image
                    src={"/logo_text_full.png"}
                    w="150px"
                    alt="send icon"
                  />
                }
                variant={"ghost"}
                as={Link}
                to="/"
                aria-label={"Toggle Navigation"}
              />
              {/* <Button>Logo</Button> */}
              <Text>Copyright © 2024 API All Rights Reserved.</Text>
              <HStack spacing={4}>
                <Link color={"#8D8D8D"} href="#">
                  Terms
                </Link>
                <Divider
                  height={"16px"}
                  borderWidth={1}
                  opacity={1}
                  orientation="vertical"
                />
                <Link color={"#8D8D8D"} href="#">
                  Privacy
                </Link>
                <Divider
                  height={"16px"}
                  borderWidth={1}
                  opacity={1}
                  orientation="vertical"
                />
                <Link color={"#8D8D8D"} href="#">
                  Cookies Policy
                </Link>
                <Divider
                  height={"16px"}
                  borderWidth={1}
                  opacity={1}
                  orientation="vertical"
                />
                <Link color={"#8D8D8D"} href="#">
                  License Agreement
                </Link>
              </HStack>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
