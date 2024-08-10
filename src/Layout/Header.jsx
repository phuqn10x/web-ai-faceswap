import {
  Flex,

  // useColorMode,
  // VStack,
  useColorModeValue,
  // IconButton,

  // Image,
  Stack,
  Box,
  Icon,
  useDisclosure,
  IconButton,
  Collapse,
  HStack,
  Image,
  Divider,
  keyframes,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

// import { useSelector, useDispatch } from "react-redux";
// import { Logout, selectData } from "../redux/Reducer/auth"; // Cập nhật đường dẫn đúng đến file userSlice của bạn
// import { useTranslation } from "react-i18next";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
// import { locales } from "../i18n";
// import { useT } from "../lib/utils";
// import { changeLanguage } from "i18next";

import PopOverMain from "../ui/Popover";

import downloadIcon from "../assets/icons/download.svg";
import ButtonMain from "../components/Buttons/ButtonMain";
import { ai_items } from "../data";
import { motion } from "framer-motion";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  //   const user = useSelector(selectData);
  //   const { t } = useT("header");
  //   const dispatch = useDispatch();
  //   const handleLogout = () => {
  //     dispatch(Logout());
  //   };
  return (
    <Box pt={{ base: 0, md: 0 }}>
      <Flex
        align="center"
        justify="space-between"
        // wrap="wrap"

        px={{ base: 10, md: 20 }}
        bg={useColorModeValue("white", "gray.700")}
        color={useColorModeValue("black", "white")}
        boxShadow={"lg"}
        rounded={"lg"}
        // maxW="1600px" // Giới hạn chiều rộng của thanh điều hướng
        h="100px"
        mx={{ base: 0, md: 0, lg: 0, xl: 0 }} // Căn giữa thanh điều hướng

        // {...props}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Stack
          whiteSpace="nowrap"
          display={{ base: "none", md: "flex" }}
          flex={{ base: 1, md: 1 }}
          justifyContent={"space-between"}
          direction={"row"}
          h={"full"}
          spacing={6}
          alignItems={"center"}
        >
          <HStack h={"full"} justify={{ base: "center", md: "start" }} gap={10}>
            <IconButton
              // flex={1}
              display={"flex"}
              // w={"20%"}
              _hover={{ bg: "none" }}
              icon={<Image src={"/logo_text_full.png"} w="200px" alt="Logo" />}
              variant={"ghost"}
              as={Link}
              to="/"
            />
            <DesktopNav />
          </HStack>

          <HStack h={"full"}>
            <Flex h={"full"} alignItems="center">
              <ButtonMain
                // w={"full"}
                fontSize={"18px"}
                props={{
                  px: "28px",
                  lineHeight: "3.25rem",
                  as: Link,
                  to: "/signup",
                }}
                propsButton={{
                  gap: 0,
                  // rightIcon: <ChevronRightIcon />,
                }}
                // fontWeight={500}
                title={"Try for free"}
              />
            </Flex>
          </HStack>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {/* <MobileNav /> */}
      </Collapse>
    </Box>
  );
}
const DesktopNav = () => {
  //   const { t } = useT("header");
  //   const listToolAi = t("ai_items", { returnObjects: true });
  //   const { i18n } = useTranslation();

  //   const currentLanguage = locales[i18n.language];
  // const listToolsB1 = t("base1.list_tools");
  // console.log("listToolAi", listToolAi);

  return (
    <HStack h={"full"} display={{ base: "none", md: "flex" }} gap={6}>
      <PopOverMain title={"AI product"}>
        {ai_items.map((data, index) => (
          <DesktopSubNav key={index} data={data} />
        ))}
      </PopOverMain>
      <PopOverMain title={"Pricing"} to={"/test"}></PopOverMain>
      <PopOverMain
        title={"Download App"}
        to={"/test"}
        leftIcon={<Image src={downloadIcon} boxSize="23px" alt="send icon" />}
      ></PopOverMain>
    </HStack>
  );
};

const DesktopSubNav = ({ data }) => {
  console.log("object", data);
  const MotionIcon = motion(Icon);
  const MotionBox = motion(Box);
  const fireAnimation = keyframes`
      0% {
        transform: rotate(-8deg);
        transform-origin: center bottom;
      }
      50% {
        transform: rotate(8deg);
        transform-origin: center bottom;
      }
      100% {
        transform: rotate(-8deg);
        transform-origin: center bottom;
      }
    `;
  return (
    <>
      <MotionBox
        as={Link}
        to={data.link}
        px={6}
        py={4}
        whileHover={{ y: -6, x: 6 }}
        // initial={{ opacity: 0 }}
        animate={{
          y: 0,
        }}
        // border="4px solid transparent"
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        position={"relative"}
        _hover={{
          bg: "#F8FAFC",
          borderRadius: "lg",
          // borderColor: "rgba(182, 212, 255, 1)",
          boxShadow: "0 2px 13px 0 rgba(182, 212, 255, 1)",
          color: "rgba(85,85,255,1)",
        }}
      >
        <HStack>
          <HStack spacing={4}>
            {data.hot && (
              <MotionIcon
                top="4px"
                left="14px"
                position="absolute"
                // as={HeaderHotIcon}
                boxSize={6}
                // Thêm animation keyframes vào css prop
                // css={{ }}
                animation={`${fireAnimation} 2s infinite`}
              />
            )}

            <Image
              rounded={"xl"}
              w={"90px"}
              h={"60px"}
              src={data.image_header}
              alt={data.title}
              objectFit="cover"
              mx="auto"
            />
            <Stack spacing={0}>
              <Text
                transition={"all .3s ease"}
                // _groupHover={{ color: "pink.400" }}
                fontWeight={700}
              >
                {data.title}
              </Text>
              <Text
                transition={"all .3s ease"}
                _groupHover={{ color: "pink.400" }}
                fontWeight={500}
                color={" rgba(141, 141, 141, 1)"}
              >
                {data.short_description.header}
              </Text>
            </Stack>
            {/* <Text fontSize={"sm"}>{subLabel}</Text> */}
          </HStack>
          {/* <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon w={5} h={5} as={ChevronRightIcon} />
          </Flex> */}
        </HStack>
      </MotionBox>
      <Divider variant={"dashed"} />
    </>
  );
};
