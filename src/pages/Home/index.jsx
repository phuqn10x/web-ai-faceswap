import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Circle,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  ListItem,
  SimpleGrid,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
//images
import cAgeHeroImage from "../../assets/images/change_age_hero_homepage.png";
import cSkyHeroImage from "../../assets/images/change_sky_hero_homepage.png";
import oHeroImage from "../../assets/images/original_hero_homepage.png";
import pHeroImage from "../../assets/images/portrait_hero_homepage.png";
import cSkyS2bfImage from "../../assets/images/change_sky_bf_section2_homepage.png";
import cSkyS2afImage from "../../assets/images/change_sky_af_section2_homepage.png";
import pHS2bfImage from "../../assets/images/photo_enhander_bf_section2_homepage.png";
import pHS2afImage from "../../assets/images/photo_enhander_af_section2_homepage.png";
import rOS2bfImage from "../../assets/images/remove_obj_bf_section2_homepage.png";
import rOS2afImage from "../../assets/images/remove_obj_af_section2_homepage.png";

//icons
import bEditIcon from "../../assets/icons/board_edit.svg";
import cAgeIcon from "../../assets/icons/change_age.svg";
import eraserIcon from "../../assets/icons/eraser.svg";
import mStickIcon from "../../assets/icons/magic_stick.svg";
import portraitIcon from "../../assets/icons/portrait.svg";
import cSkyIcon from "../../assets/icons/sky_change.svg";
import tEditIcon from "../../assets/icons/text_edit.svg";
import marqueeIcon from "../../assets/images/marquee_icon.png";
import CommentRatingIcon from "../../assets/icons/comment_rating.svg";

import { motion } from "framer-motion";
import {
  floatAnimation,
  floatReverseAnimation,
} from "../../components/animation";
import Heros from "../../components/Heros";
import Marquee from "react-fast-marquee";
import { ai_items, list_rate } from "../../data";
import ButtonMain from "../../components/Buttons/ButtonMain";
// import { Link } from "react-router-dom";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const MotionStack = motion(Stack);
const renderStars = (rating, size = "1em") => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} color="#ffaa00" size={size} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" color="#ffaa00" size={size} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} color="#b5b5c3" size={size} />);
  }

  return stars;
};
const FeedbackCard = ({ name, text, rating }) => {
  return (
    <MotionStack
      maxW={"366px"}
      borderRadius="24px"
      position="relative"
      spacing={0}
      p={5}
      shadow="md"
      borderWidth="1px"
      // bg={isHighlighted ? "white" : "gray.50"}
      bg={"gray.50"}
      // borderColor={isHighlighted ? "blue.400" : "gray.200"}
      borderColor={"gray.200"}
      whileHover={{ scale: 1.1 }}
      transition="preserve-3d 0.3s"
      _hover={{
        bg: "white",
        borderColor: "blue.400",
        boxShadow: "0 0 10px 10px #E4E6EF",
      }}
    >
      <Circle
        alignSelf={"end"}
        size="40px"
        // bg="blue.100"
        // position="absolute"
        // top="10px"
        // right="10px"
      >
        {/* <Box> */}
        {/* <CustomCommentIcon boxSize="10" color="blue.500" /> */}
        <Image boxSize={"10"} src={CommentRatingIcon} color="blue.500" />
        {/* </Box> */}
        {/* <Icon as={CommentRatingIcon} color="blue.500" /> */}
      </Circle>
      <Stack spacing={5}>
        <HStack align="center">
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://bit.ly/dan-abramov"
            alt={name}
            mr={4}
          />
          <Box>
            <Heading fontSize="lg">{name}</Heading>
            <Flex gap={1.5} align="center" mt={1}>
              {renderStars(rating)}
            </Flex>
          </Box>
        </HStack>
        <Text
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          textAlign={"start"}
          // mt={4}
          color="gray.600"
        >
          {text}
        </Text>
      </Stack>
    </MotionStack>
  );
};
const PhotoEnhancerSection = ({
  // icon,
  title,
  titleButton,
  description,
  beforeImg,
  afterImg,
  reverse,
}) => (
  <Box my={20}>
    <Stack spacing={10} flexDirection={reverse && "row-reverse"} align="center">
      <Stack flex={1} mb={4} spacing={10}>
        {/* <Icon as={icon} boxSize={6} color="blue.500" /> */}
        <Heading fontSize={"32px"} fontWeight={"800"}>
          {title}
        </Heading>
        <Box fontSize={"18px"} fontWeight={"500"}>
          {description}
        </Box>
        <ButtonMain
          title={titleButton}
          props={{ px: "6", py: "4" }}
          fontWeight="800"
        />
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
        <Stack spacing={20}>
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
              All useful editing tools are ready in one single photo editor
              online HD - Face Swap. See what our pic editor online can do and
              try them for FREE!
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
                  borderColor: "rgba(106, 228, 255, 0.5)",
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
                      fontWeight={"500"}
                      fontSize={"18px"}
                      className="description"
                    >
                      {data.description_homepage}
                    </Text>
                    {/* <AbsoluteCenter axis="both"> */}
                    <Box
                      position={"absolute"}
                      top={0}
                      right={0}
                      bottom={0}
                      left={0}
                    >
                      <ButtonMain
                        title={"Try for free"}
                        // subTitle={" Drop, paste image, or URL"}
                        props={{
                          m: "10px auto",
                          w: "max-content",
                          px: "20px",
                          py: "14px",
                          display: "none",
                          className: "button_start",
                        }}
                        // propsButton={{  }}
                      />
                    </Box>

                    {/* </AbsoluteCenter> */}
                  </Box>
                </Stack>
              </MotionStack>
            ))}
          </SimpleGrid>
          <Flex justifyContent={"center"}>
            <ButtonMain
              title={"Explore All Tools"}
              props={{ px: "6", py: "4" }}
              fontWeight="800"
            />
          </Flex>
        </Stack>
      </Container>
      <Container
        maxW={"full"}
        background={"linear-gradient(90deg, #EDF6FF 0%, #FDF1FF 100%)"}
      >
        <Container p={0} maxW={"xl"}>
          <Stack spacing={20}>
            <Stack
              textAlign={"center"}
              alignItems={"center"}
              spacing={8}
              // my={4}
            >
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
                We&apos;re sticking to our values and always put you first. So
                far, FaceSwap is working great to be the leading AI picture
                editor. Our statistics break the record day by day.
              </Text>
            </Stack>
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
          </Stack>
        </Container>
      </Container>
      <Container maxW={"full"} background={"rgba(255, 255, 255, 1)"} p={0}>
        <Container py={14} px={0} maxW={"xl"}>
          <Stack spacing={10}>
            <Stack
              textAlign={"center"}
              alignItems={"center"}
              spacing={8}
              my={4}
            >
              <Heading
                flex={1}
                fontWeight={"800"}
                fontSize={{ base: "2xl", sm: "4xl", md: "42px" }}
              >
                AI Handles Photo Editing For
                <Text
                  bgGradient="linear(to-r, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
                  bgClip="text"
                  as={"span"}
                >
                  {" "}
                  Any Cases
                </Text>
              </Heading>
            </Stack>
            <Tabs variant="unstyled">
              <Flex justifyContent={"center"}>
                <TabList
                  w={"max-content"}
                  borderRadius="2xl"
                  bgColor={"rgba(248, 250, 252, 1)"}
                  zIndex={0}
                  position="relative"
                  height="50px"
                >
                  <Tab
                    px={6}
                    py={2}
                    fontWeight={"700"}
                    fontSize="16px"
                    color="rgba(141, 141, 141, 1)"
                    _selected={{ color: "rgba(11, 113, 255, 1)" }}
                  >
                    Photography
                  </Tab>
                  <Tab
                    px={6}
                    py={2}
                    fontWeight={"700"}
                    fontSize="16px"
                    color="rgba(141, 141, 141, 1)"
                    _selected={{ color: "rgba(11, 113, 255, 1)" }}
                  >
                    Ecommerce
                  </Tab>
                  <Tab
                    px={6}
                    py={2}
                    fontWeight={"700"}
                    fontSize="16px"
                    color="rgba(141, 141, 141, 1)"
                    _selected={{ color: "rgba(11, 113, 255, 1)" }}
                  >
                    Pashion
                  </Tab>
                  <Tab
                    px={6}
                    py={2}
                    fontWeight={"700"}
                    fontSize="16px"
                    color="rgba(141, 141, 141, 1)"
                    _selected={{ color: "rgba(11, 113, 255, 1)" }}
                  >
                    Travel
                  </Tab>
                  <Tab
                    px={6}
                    py={2}
                    fontWeight={"700"}
                    fontSize="16px"
                    color="rgba(141, 141, 141, 1)"
                    _selected={{ color: "rgba(11, 113, 255, 1)" }}
                  >
                    Real Estate
                  </Tab>
                  <TabIndicator
                    transform={"scale(0.9, 0.8)"}
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="100%"
                    bg="white"
                    boxShadow={"0px 1px 4px 0px rgba(228, 230, 239, 1)"}
                    borderRadius="2xl"
                    zIndex="-1"
                  />
                </TabList>
              </Flex>

              <TabPanels>
                <TabPanel>
                  <Stack
                    direction={"column"}
                    spacing={3}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                    // borderRadius={"50px"}
                    // overflow={"hidden"}
                  >
                    <ReactCompareSlider
                      style={{
                        minWidth: "1100px",
                        minHeight: "600px",
                        borderRadius: "50px",
                      }}
                      itemOne={
                        <ReactCompareSliderImage
                          src={rOS2bfImage}
                          alt="Image one"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={rOS2afImage}
                          alt="Image two"
                        />
                      }
                    />
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack
                    direction={"column"}
                    spacing={3}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                    borderRadius={"50px"}
                    overflow={"hidden"}
                  >
                    <ReactCompareSlider
                      style={{
                        minWidth: "1100px",
                        minHeight: "600px",
                        borderRadius: "50px",
                      }}
                      itemOne={
                        <ReactCompareSliderImage
                          src={cSkyS2bfImage}
                          alt="Image one"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={cSkyS2afImage}
                          alt="Image two"
                        />
                      }
                    />
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <ReactCompareSlider
                    style={{
                      minWidth: "1100px",
                      minHeight: "600px",
                      borderRadius: "50px",
                    }}
                    itemOne={
                      <ReactCompareSliderImage
                        src={pHS2bfImage}
                        alt="Image one"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={pHS2afImage}
                        alt="Image two"
                      />
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Container>
      </Container>
      <Container maxW={"xl"}>
        <Stack>
          <PhotoEnhancerSection
            title="Powerful Yet Simple To Remove Object"
            description={
              <>
                <Text>
                  SnapEdit object remover works simpler but as effective as
                  other legacy photo editing software, all thanks to the support
                  of in-house AI models.
                </Text>
                <UnorderedList>
                  <ListItem>Extremely easy to use.</ListItem>
                  <ListItem>
                    Do not require advanced photo editing skills for beginners.
                  </ListItem>
                  <ListItem>Allow to manually remove objects as well.</ListItem>
                </UnorderedList>
              </>
            }
            beforeImg={rOS2bfImage}
            afterImg={rOS2afImage}
            titleButton="Try Remove Object"
          />
          <PhotoEnhancerSection
            // icon={AiOutlineRocket}
            title="Easy To Remove and Edit Photo Background"
            description={
              <>
                <Text>
                  Face Swap picture editing website lets you edit photos’
                  backgrounds conveniently on smartphones, PCs, and tablets. All
                  features are neat to your screen to edit photos and easily
                  save them to your device.
                </Text>
                <UnorderedList>
                  <ListItem>Cut complex backgrounds out perfectly</ListItem>
                  <ListItem>
                    Change background with 100+ pre-designed templates.
                  </ListItem>
                  <ListItem>Download images in HD</ListItem>
                </UnorderedList>
              </>
            }
            beforeImg={cSkyS2bfImage}
            afterImg={cSkyS2afImage}
            titleButton="Try Remove Background"
            reverse
          />
          <PhotoEnhancerSection
            // icon={AiOutlineUser}
            title="Photo Enhancer for Anime"
            description={
              <>
                <Text>
                  Face Swap is the best free photo editor online 4K to enhance
                  your photos. The AI edit photo tool can make low-resolution
                  images vibrant like a professional designer.{" "}
                </Text>
                <UnorderedList>
                  <ListItem>
                    Upscale and fix blurry pictures with 1 click
                  </ListItem>
                  <ListItem>User-friendly for non-professionals</ListItem>
                  <ListItem>Save images to devices in HD quality</ListItem>
                </UnorderedList>
              </>
            }
            beforeImg={pHS2bfImage}
            afterImg={pHS2afImage}
            titleButton="Enhance photo now"
          />
        </Stack>
      </Container>
      <Container
        maxW="xl"
        // my={40}
      >
        <Box textAlign="center" px={6}>
          <Stack alignItems={"center"} spacing={8} my={4}>
            <Heading
              flex={1}
              fontWeight={"800"}
              fontSize={{ base: "2xl", sm: "4xl", md: "42px" }}
            >
              Wall off Love
            </Heading>
            <Text
              maxW={"900px"}
              fontWeight={"500"}
              fontSize={"18px"}
              color="black"
            >
              Join 21,400,000 happy users worldwide who already used SnapEdit on
              both the web app and mobile app versions and check out some of
              their rave reviews.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
            {/* <FeedbackCard
              name="Rate AmoPic"
              text={ui.base5.totalRate.rate}
              rating={ui.base5.totalRate.rate}
            /> */}
            <MotionStack
              spacing={0}
              maxW={"366px"}
              borderRadius="24px"
              position="relative"
              p={5}
              shadow="md"
              borderWidth="1px"
              // bg={isHighlighted ? "white" : "gray.50"}
              bg={"gray.50"}
              // justifyContent={"center"}
              // borderColor={isHighlighted ? "blue.400" : "gray.200"}
              borderColor={"gray.200"}
              whileHover={{ scale: 1.1 }}
              transition="preserve-3d 0.3s"
              _hover={{
                bg: "white",
                borderColor: "blue.400",
                boxShadow: "0 0 10px 10px #E4E6EF",
              }}
            >
              <Circle
                alignSelf={"end"}
                size="60px"
                // bg="blue.100"
                // position="absolute"
                // top="10px"
                // right="10px"
              >
                {/* <Box> */}

                <Image
                  boxSize={"14"}
                  src={CommentRatingIcon}
                  color="blue.500"
                />
                {/* </Box> */}
                {/* <Icon as={CommentRatingIcon} color="blue.500" /> */}
              </Circle>
              <Stack
                flex={1}
                justifyContent={"center"}
                spacing={4}
                align="center"
              >
                {/* <Box> */}
                <Heading color={"#B5B5C3"} fontSize="2rem">
                  Rate FaceSwap
                </Heading>
                <Flex gap={1.5} align="center" mt={1}>
                  {renderStars(4.7, "2em")}
                  <Text fontSize="2rem" fontWeight={"bold"} color="gray.600">
                    4.7/5
                  </Text>
                </Flex>
                {/* </Box> */}
              </Stack>
            </MotionStack>
            {list_rate.map((feedback, index) => (
              <FeedbackCard
                key={index}
                name={feedback.user}
                text={feedback.comment}
                rating={feedback.rate}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
      <Container maxW={"xl"}>
        <Stack spacing={20} w="full">
          <Stack spacing={8}>
            <Heading
              textAlign={"center"}
              flex={1}
              fontWeight={"800"}
              fontSize={{ base: "2xl", sm: "4xl", md: "42px" }}
            >
              Frequently Asked Questions
            </Heading>
          </Stack>
          <Accordion pb={8} defaultIndex={[0]} allowToggle>
            {[...Array(3)].map((_, index) => (
              <AccordionItem key={index} border="unset" my={4} rounded="xl">
                {({ isExpanded }) => (
                  <Box
                    p={1}
                    rounded="xl"
                    w="full"
                    bgGradient={
                      isExpanded
                        ? "linear-gradient(90deg,rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
                        : "transparent"
                    }
                    boxShadow="0px 4px 8px 0px rgba(109, 109, 109, 0.25)"
                    transition="all 0.3s ease"
                  >
                    <Stack p={4} spacing={0} bgColor="white" rounded="xl">
                      <h2>
                        <AccordionButton rounded="xl">
                          <Box as="span" flex="1" textAlign="left">
                            <Text
                              fontFamily="Mulish Variable"
                              fontSize="22px"
                              fontWeight={isExpanded ? 800 : 500}
                              bgGradient={
                                isExpanded
                                  ? "linear(91.13deg, #EA81FF 2.3%, #6AE4FF 99.51%)"
                                  : "linear(91.13deg, black 2.3%, black 99.51%)"
                              }
                              bgClip="text"
                              // background: linear-gradient(91.13deg, #EA81FF 2.3%, #6AE4FF 99.51%);

                              transition="color 0.3s ease, font-weight 0.3s ease"
                            >
                              Get Transparent Background for Your Products
                            </Text>
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        py={2}
                        px={4}
                        color="rgba(141, 141, 141, 1)"
                      >
                        Whether it&apos;s a portrait, product, or other types of
                        photos, PicWish background remover ensures precise
                        details perfectly. Using advanced AI algorithms, you can
                        effortlessly remove background from any image with just
                        one click.
                      </AccordionPanel>
                    </Stack>
                  </Box>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
      </Container>
    </>
  );
}

export default Home;
