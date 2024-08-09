import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import cAgeHeroImage from "../../assets/images/change_age_hero_homepage.png";
import cSkyHeroImage from "../../assets/images/change_sky_hero_homepage.png";
import oHeroImage from "../../assets/images/original_hero_homepage.png";
import pHeroImage from "../../assets/images/portrait_hero_homepage.png";
import { motion } from "framer-motion";
function Home() {
  const MotionBox = motion(Box);
  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  };
  const floatReverseAnimation = {
    y: [0, 20, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  };
  return (
    <>
      <Container
        className="scroll-to-element"
        maxW={"full"}
        // bgImage={`url(${bannerBaseSketchAi})`}
      >
        <Container maxW={"xl"}>
          <HStack pt={{ base: 10, md: 40 }} spacing={20}>
            <Stack flex={1} spacing={{ base: 8, md: 10 }}>
              <Stack spacing={0}>
                <Heading fontWeight={"800"} fontSize={{ md: "42px" }}>
                  Photo Editing Done Easy With AI Tools
                </Heading>
                <Text
                  // color={"rgba(43, 27, 154, 1)"}
                  // fontWeight={"800"}
                  fontSize={{ md: "18px" }}
                >
                  Face Swap is an AI-powered online photo editor that delivers
                  amazing tools to retouch pictures easily like never before.
                  Try it now and see your photos transformed with one click!
                </Text>
              </Stack>

              {/* <Text maxW={"680px"} fontWeight={"500"} color={"gray.500"}>
                {description}
              </Text> */}
              <HStack color={"#8D8D8D"} mb={4} spacing={6}>
                {/* <ButtonUploadImage /> */}
                {/* {secondButtonTitle && (
                  <MotionBox
                    whileHover={{ transform: "translateY(-10px)" }}
                    position={"relative"}
                  >
                    <Icon
                      position={"absolute"}
                      as={vipUploadMulti}
                      boxSize={9}
                      zIndex={1}
                      top={-5}
                      right={0}
                    />
                    <ButtonVertical
                      propsButton={{
                        leftIcon: (
                          <Icon
                            as={secondButtonIcon}
                            boxSize={9}
                            color={"rgba(67, 143, 249, 1)"}
                          />
                        ),
                      }}
                      fontSize="26px"
                      fontWeight="800"
                      // onClick={handleUploadClick}
                      props={{
                        h: "5rem",
                        w: "270px",
                        _hover: {
                          transform: "unset",
                        },
                      }}
                      title={secondButtonTitle}
                      subTitle={secondButtonSubTitle}
                    />
                  </MotionBox>
                )} */}
              </HStack>
            </Stack>
            <Box  flex={1.6} position={"relative"} width={"auto"} flex={1}>
              <HStack width={"100%"}>
                <MotionBox animate={floatAnimation} position="relative">
                  <Image
                    src={cSkyHeroImage}
                    // Replace this with your actual image URL
                    alt="Showcase Image"
                    borderRadius="20px"
                    objectFit="cover"
                    transform={"translate(30px, -120px)"}
                    w="full"
                    boxShadow="xl"

                    // maxH={"373px"}
                    // maxW={"540px"}
                    // h={{ base: "250px", md: "520px" }}
                  />
                </MotionBox>
                <MotionBox top={0}>
                  <Image
                    src={oHeroImage} // Replace this with your actual image URL
                    alt="Showcase Image"
                    borderRadius="20px"
                    objectFit="cover"
                    w="full"
                    // w={"300px"}
                    // h={"410px"}
                    // h={{ base: "250px", md: "520px" }}
                  />
                </MotionBox>
                <Stack>
                  <MotionBox animate={floatAnimation}>
                    <Image
                      // Replace this with your actual image URL
                      src={cAgeHeroImage}
                      alt="Showcase Image"
                      boxShadow="xl"
                      borderRadius="20px"
                      objectFit="cover"
                      w="full"
                      transform={"translate(-60px, -80px)"}
                      maxH={"134px"}
                      maxW={"134px"}
                      // h={{ base: "250px", md: "520px" }}
                    />
                  </MotionBox>
                  <MotionBox animate={floatReverseAnimation}>
                    <Image
                      src={pHeroImage} // Replace this with your actual image URL
                      alt="Showcase Image"
                      borderRadius="20px"
                      objectFit="cover"
                      boxShadow="xl"
                      transform={"translate(-60px, 60px)"}
                      w="full"
                      // maxH={"373px"}
                      // maxW={"540px"}
                      // h={{ base: "250px", md: "520px" }}
                    />
                  </MotionBox>
                </Stack>
              </HStack>
            </Box>
          </HStack>
        </Container>
        {/* {children} */}
      </Container>
    </>
  );
}

export default Home;
