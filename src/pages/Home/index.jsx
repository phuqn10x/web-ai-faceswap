import {
  AbsoluteCenter,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
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
import marqueeIcon from "../../assets/images/marquee_icon.png";

import { motion } from "framer-motion";
import {
  floatAnimation,
  floatReverseAnimation,
} from "../../components/animation";
import Heros from "../../components/Heros";
import Marquee from "react-fast-marquee";
import { ai_items } from "../../data";
import ButtonMain from "../../components/Buttons/ButtonMain";
import { Link } from "react-router-dom";
import { AiOutlineRocket, AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
const PhotoEnhancerSection = ({
  icon,
  title,
  description,
  beforeImg,
  afterImg,
  reverse,
}) => (
  <Box my={20}>
    <Stack spacing={10} flexDirection={reverse && "row-reverse"} align="center">
      <Stack flex={1} mb={4}>
        <Icon as={icon} boxSize={6} color="blue.500" />
        <Heading fontSize={"32px"} fontWeight={"800"}>
          {title}
        </Heading>
        <Text mb={4}>
          Using our AI image enhancer tool, you can now easily unblur images
          online with one click. Powered by AI enhancement algorithms, AmoPic
          photo enhancer helps to perfect and sharpen photos in no time. Enhance
          image into twice or four times total pixel count for a brilliant
          result.
        </Text>
      </Stack>
      <ReactCompareSlider
        style={{ flex: 1, borderRadius: "20px" }}
        itemOne={<ReactCompareSliderImage src={beforeImg} alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src={afterImg} alt="Image two" />}
      />
    </Stack>
  </Box>
);
function Home() {
  const MotionBox = motion(Box);
  const MotionGridItem = motion(GridItem);
  const MotionHStack = motion(HStack);
  const MotionStack = motion(Stack);

  return (
    <>
      <Heros
        title={
          <>
            <Text
              bgGradient="linear(to-r, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
              bgClip="text"
              as={"span"}
            >
              Photo Editing
            </Text>{" "}
            Done Easy With AI Tools
          </>
        }
        description="Face Swap is an AI-powered online photo editor that delivers
                  amazing tools to retouch pictures easily like never before.
                  Try it now and see your photos transformed with one click!"
        titleButton={"Get Started For Free"}
        leftElement={
          <>
            <HStack>
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
                    transform={"translate(-60px, -40px)"}
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
                    transform={"translate(30px, -60px)"}
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
          </>
        }
      >
        <Box>
          <Text
            textAlign={"center"}
            fontWeight={"500"}
            fontSize={"18px"}
            color="rgba(141, 141, 141, 1)"
          >
            Helping creators & businesses everywhere work easier
          </Text>
          <Marquee speed="300">
            {[...Array(8)].map((_, index) => (
              <MotionHStack
                key={index}
                bgColor={"#ffff"}
                justifyContent={"center"}
                w={"300px"}
                h={"110px"}
                borderRadius={"12px"}
                m={4}
                fontSize="2xl"
                fontWeight="bold"
                color="blue.500"
                boxShadow="0px 1px 4px 0px rgba(228, 230, 239, 1)"
              >
                <Image src={marqueeIcon} />
              </MotionHStack>
            ))}
          </Marquee>
        </Box>
      </Heros>
      <Container maxW={"xl"}>
        <Stack textAlign={"center"} alignItems={"center"} spacing={8} my={4}>
          <Heading
            flex={1}
            fontWeight={"800"}
            fontSize={{ base: "2xl", sm: "4xl", md: "42px" }}
          >
            <Text
              bgGradient="linear(to-r, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
              bgClip="text"
              as={"span"}
            >
              Powerful AI
            </Text>{" "}
            Photo Editor With Full Toolset
          </Heading>
          <Text
            maxW={"900px"}
            fontWeight={"500"}
            fontSize={"18px"}
            color="black"
          >
            All useful editing tools are ready in one single photo editor online
            HD - Face Swap. See what our pic editor online can do and try them
            for FREE!
          </Text>
        </Stack>
        <SimpleGrid
          // transform={"translate(20px, -80px)"}
          // w={"max-content"}
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={10}
        >
          {ai_items.slice(0, 6).map((data, index) => (
            <MotionStack
              key={index}
              borderRadius="40px"
              overflow="hidden"
              // direction={"column"}
              height="100%"
              boxShadow={"1px 1px 4px -2px"}
              bg={"white"}
              transition="preserve-3d 0.3s"
              borderColor={"transparent"}
              borderWidth="3px"
              _hover={{
                borderColor: "blue.500",
                ".button_start": { display: "block" },
                ".description": { opacity: "0" },
              }}
              whileHover={{ scale: 1.1 }} // Thêm hiệu ứng phóng to khi hover
            >
              <Image
                src={data.image_homepage}
                alt={data.title}
                objectFit="cover"
                w={"100%"}
                // mx="auto"
              />
              <Stack
                direction={"column"}
                height={"full"}
                py={4}
                px={6}
                spacing={0}
              >
                <Text
                  mt={4}
                  fontWeight="800"
                  fontSize="xl"
                  display={"flex"}
                  whiteSpace={"nowrap"}
                >
                  {data.title}
                </Text>
                <Box height={"full"} textAlign="start" position={"relative"}>
                  <Text
                    mt={2}
                    color="gray.600"
                    fontSize={"sm"}
                    className="description"
                  >
                    {data.description_homepage}
                  </Text>
                  <AbsoluteCenter>
                    <ButtonMain
                      title={"Try for free"}
                      // subTitle={" Drop, paste image, or URL"}
                      props={{
                        // px: "14px",
                        py: "6px",
                        display: "none",
                        className: "button_start",
                      }}
                    />
                  </AbsoluteCenter>
                </Box>
              </Stack>
            </MotionStack>
          ))}
        </SimpleGrid>
      </Container>
      <Container maxW={"full"}>
        <Stack textAlign={"center"} alignItems={"center"} spacing={8} my={4}>
          <Heading
            flex={1}
            fontWeight={"800"}
            fontSize={{ base: "2xl", sm: "4xl", md: "42px" }}
          >
            <Text
              bgGradient="linear(to-r, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
              bgClip="text"
              as={"span"}
            >
              The Journey
            </Text>{" "}
            Behind SnapEdit Photo Edito
          </Heading>
          <Text
            maxW={"900px"}
            fontWeight={"500"}
            fontSize={"18px"}
            color="black"
          >
            We're sticking to our values and always put you first. So far,
            FaceSwap is working great to be the leading AI picture editor. Our
            statistics break the record day by day.
          </Text>
        </Stack>
        <Container p={0} maxW={"xl"}>
          <HStack
            bg={"rgba(255, 255, 255, 0.4)"}
            borderRadius={"20px"}
            border={"1px solid white"}
            px={6}
            py={8}
            textAlign={"center"}
          >
            <Box flex={1}>
              <Text fontWeight={800} fontSize={"48px"}>
                120
                <Text fontWeight={800} fontSize={"22px"} as={"span"}>
                  m+
                </Text>
              </Text>
              <Text color={"#8D8D8D"}>Images Processed</Text>
            </Box>
            <Box flex={1}>
              <Text fontWeight={800} fontSize={"48px"}>
                37
                <Text fontWeight={800} fontSize={"22px"} as={"span"}>
                  m+
                </Text>
              </Text>
              <Text color={"#8D8D8D"}>Happy User</Text>
            </Box>
            <Box flex={1}>
              <Text fontWeight={800} fontSize={"48px"}>
                3
                <Text fontWeight={800} fontSize={"22px"} as={"span"}>
                  Secs
                </Text>
              </Text>
              <Text color={"#8D8D8D"}>AI processing</Text>
            </Box>
            <Box flex={1}>
              <Text fontWeight={800} fontSize={"48px"}>
                10
                <Text fontWeight={800} fontSize={"22px"} as={"span"}>
                  x
                </Text>
              </Text>
              <Text color={"#8D8D8D"}>Faster Photo Editing</Text>
            </Box>
          </HStack>
          <PhotoEnhancerSection
            icon={AiOutlineStar}
            title="Pro-Level AI Photo Enhancer"
            description="Using our AI image enhancer tool, you can now easily upscale images online with one click. Powered by AI enhancement algorithms, AmoPic photo enhancer helps to perfect and deblur photos in no time."
            beforeImg={pHeroImage}
            afterImg={pHeroImage}
            reverse
          />
          <PhotoEnhancerSection
            icon={AiOutlineRocket}
            title="Enhance Photos Without Losing Quality"
            description="AmoPic’s AI enhancement tool excels at elevating the resolution of any image, whether it’s a portrait, product shot, or graphic."
            beforeImg={pHeroImage}
            afterImg={pHeroImage}
          />
          <PhotoEnhancerSection
            icon={AiOutlineUser}
            title="Photo Enhancer for Anime"
            description="Don’t let low resolution ruin your cherished anime posters or wallpapers. Here you can easily transform 480p anime images to superb 1080p quality with minimal effort."
            beforeImg={pHeroImage}
            afterImg={pHeroImage}
            reverse
          />
          <PhotoEnhancerSection
            icon={AiOutlineRocket}
            title="Enhance Portrait Photos Online"
            description="AmoPic AI photo enhancer lets you fine-tune every portrait photo. Instantly improve portrait clarity using advanced AI enhancement technology."
            beforeImg={pHeroImage}
            afterImg={pHeroImage}
          />
        </Container>
      </Container>
    </>
  );
}

export default Home;
