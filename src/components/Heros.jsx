import {
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import ButtonMain from "./Buttons/ButtonMain";

function Heros({
  leftElement,
  title,
  description,
  space = "200px",
  UploadImage,
  titleButton,
  children,
}) {
  return (
    <Container
      className="scroll-to-element"
      maxW={"full"}
      overflow={"hidden"}
      p={0}
      // bgImage={`url(${bannerBaseSketchAi})`}
    >
      <Container p={0} maxW={"xl"}>
        <HStack pt={{ base: 10, md: 36 }}>
          <Stack
            transform={"translate(0, -40px)"}
            flex={1}
            spacing={{ base: 8, md: 10 }}
          >
            <Stack spacing={0} my={4}>
              <Heading
                fontWeight={"800"}
                lineHeight={"55px"}
                fontSize={{ md: "42px" }}
              >
                {title}
              </Heading>
              <Text
                color={"rgba(141, 141, 141, 1)"}
                fontWeight={"500"}
                fontSize={{ md: "18px" }}
                py={10}
              >
                {description}
              </Text>
              <HStack color={"#8D8D8D"} spacing={6}>
                {/* <ButtonUploadImage /> */}
                {UploadImage ? (
                  ""
                ) : (
                  <ButtonMain
                    fontSize={"24px"}
                    title={titleButton}
                    props={{
                      px: "28px",
                      py: "14px",
                      as: Link,
                      to: "/signup",
                    }}
                    fontWeight="800"
                  />
                )}

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

            {/* <Text maxW={"680px"} fontWeight={"500"} color={"gray.500"}>
                {description}
              </Text> */}
          </Stack>
          <Flex flex={1} w={"1200px"} position={"relative"}>
            <Stack mr={"-45rem"} ml={space}>
              {leftElement}
            </Stack>
          </Flex>
        </HStack>
      </Container>
      {children}
    </Container>
  );
}

export default Heros;
