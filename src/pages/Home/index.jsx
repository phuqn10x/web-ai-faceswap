import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
//images
import cAgeHeroImage from "../../assets/images/change_age_hero_homepage.png";
import cSkyHeroImage from "../../assets/images/change_sky_hero_homepage.png";
import oHeroImage from "../../assets/images/original_hero_homepage.png";
import pHeroImage from "../../assets/images/portrait_hero_homepage.png";

//icons
import bEditIcon from "../../assets/icons/board_edit.svg";
import cAgeIcon from "../../assets/icons/change_age.svg";
import eraserIcon from "../../assets/icons/eraser.svg";
import mStickIcon from "../../assets/icons/magic_stick.svg";
import portraitIcon from "../../assets/icons/portrait.svg";
import cSkyIcon from "../../assets/icons/sky_change.svg";
import tEditIcon from "../../assets/icons/text_edit.svg";

import { motion, transform } from "framer-motion";
import {
  floatAnimation,
  floatReverseAnimation,
} from "../../components/animation";
function Home() {
  const MotionBox = motion(Box);
  const MotionGridItem = motion(GridItem);

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
            <Box flex={1.6} position={"relative"} width={"auto"}>
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
                    boxShadow="dark-lg"

                    // maxH={"373px"}
                    // maxW={"540px"}
                    // h={{ base: "250px", md: "520px" }}
                  />
                  <HStack
                    py={2}
                    px={2}
                    rounded={"xl"}
                    border={"2px solid #fff"}
                    w={"max-content"}
                    bg=" rgba(129, 134, 255, 0.4);"
                    transform={"translate(-30px, -135px)"}
                  >
                    <Image src={cSkyIcon} />
                    <Text fontWeight={"800"} color={"#fff"}>
                      AI Sky
                    </Text>
                  </HStack>
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
                      boxShadow="dark-lg"
                      borderRadius="20px"
                      objectFit="cover"
                      w="full"
                      transform={"translate(-60px, -80px)"}
                      maxH={"134px"}
                      maxW={"134px"}
                      // h={{ base: "250px", md: "520px" }}
                    />
                    <HStack
                      py={2}
                      px={2}
                      rounded={"xl"}
                      border={"2px solid #fff"}
                      w={"max-content"}
                      bg=" rgba(129, 134, 255, 0.4);"
                      transform={"translate(30px, -100px)"}
                    >
                      <Image src={cAgeIcon} />
                      <Text fontWeight={"800"} color={"#fff"}>
                        AI Age
                      </Text>
                    </HStack>
                  </MotionBox>
                  <MotionBox animate={floatReverseAnimation}>
                    <Image
                      src={pHeroImage} // Replace this with your actual image URL
                      alt="Showcase Image"
                      borderRadius="20px"
                      objectFit="cover"
                      boxShadow="dark-lg"
                      transform={"translate(-60px, 60px)"}
                      w="full"
                      // maxH={"373px"}
                      // maxW={"540px"}
                      // h={{ base: "250px", md: "520px" }}
                    />
                    <HStack
                      py={2}
                      px={2}
                      rounded={"xl"}
                      border={"2px solid #fff"}
                      w={"max-content"}
                      bg=" rgba(129, 134, 255, 0.4);"
                      transform={"translate(-120px, 40px)"}
                    >
                      <Image src={portraitIcon} />
                      <Text fontWeight={"800"} color={"#fff"}>
                        AI Portrait
                      </Text>
                    </HStack>
                  </MotionBox>
                </Stack>
              </HStack>
              <Grid
                transform={"translate(20px, -80px)"}
                w={"max-content"}
                templateColumns="repeat(2, 1fr)"
                gap={4}
              >
                <MotionGridItem
                  animate={floatAnimation}
                  py={4}
                  px={4}
                  w={"max-content"}
                  borderRadius={"lg"}
                  boxShadow={"0px 3px 7px -4px"}
                >
                  <Image boxSize={"100%"} src={eraserIcon} />
                </MotionGridItem>
                <MotionGridItem
                  animate={floatAnimation}
                  py={4}
                  px={4}
                  w={"max-content"}
                  borderRadius={"lg"}
                  boxShadow={"0px 3px 7px -4px"}
                >
                  <Image boxSize={"100%"} src={bEditIcon} />
                </MotionGridItem>
                <MotionGridItem
                  animate={floatAnimation}
                  py={4}
                  px={4}
                  w={"max-content"}
                  borderRadius={"lg"}
                  boxShadow={"0px 3px 7px -4px"}
                >
                  <Image boxSize={"100%"} src={tEditIcon} />
                </MotionGridItem>
                <MotionGridItem
                  animate={floatAnimation}
                  py={4}
                  px={4}
                  w={"max-content"}
                  borderRadius={"lg"}
                  boxShadow={"0px 3px 7px -4px"}
                >
                  <Image boxSize={"100%"} src={mStickIcon} />
                </MotionGridItem>
              </Grid>
            </Box>
          </HStack>
        </Container>
        {/* {children} */}
      </Container>
    </>
  );
}

export default Home;
