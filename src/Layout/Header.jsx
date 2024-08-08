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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

// import { useSelector, useDispatch } from "react-redux";
// import { Logout, selectData } from "../redux/Reducer/auth"; // Cập nhật đường dẫn đúng đến file userSlice của bạn
// import { useTranslation } from "react-i18next";
import { ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
// import { locales } from "../i18n";
// import { useT } from "../lib/utils";
// import { changeLanguage } from "i18next";

import PopOverMain from "../ui/Popover";

import apiIcon from "../assets/icons/api-icon.svg";

export default function Header({ advanced }) {
  const { isOpen, onToggle } = useDisclosure();
  //   const user = useSelector(selectData);
  //   const { t } = useT("header");
  //   const dispatch = useDispatch();
  //   const handleLogout = () => {
  //     dispatch(Logout());
  //   };
  return (
    <Box pt={{ base: 0, md: advanced ? 0 : 8 }}>
      <Flex
        align="center"
        justify="space-between"
        // wrap="wrap"

        px={{ base: 10, md: 10 }}
        bg={useColorModeValue("white", "gray.700")}
        color={useColorModeValue("black", "white")}
        boxShadow={"lg"}
        rounded={"lg"}
        // maxW="1600px" // Giới hạn chiều rộng của thanh điều hướng
        h="100px"
        mx={{ base: 0, md: 0, lg: 0, xl: advanced ? 0 : "8%" }} // Căn giữa thanh điều hướng

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
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <IconButton
            // flex={1}
            display={"flex"}
            // w={"20%"}
            _hover={{ bg: "none" }}
            icon={
              <Image src={"/logo_text_full.png"} w="200px" alt="send icon" />
            }
            variant={"ghost"}
            as={Link}
            to="/"
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Stack
          whiteSpace="nowrap"
          display={{ base: "none", md: "flex" }}
          flex={{ base: 1, md: 1 }}
          justify={"flex-end"}
          direction={"row"}
          h={"full"}
          spacing={6}
          alignItems={"center"}
        >
          {!advanced && <DesktopNav />}
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
    <>
      <Flex h={"full"}>
        <PopOverMain widthContent="100px" title={"tesst"}></PopOverMain>
      </Flex>
      <Flex h={"full"} display={{ base: "none", md: "flex" }}>
        {/* <PopOverMain title={t("ai_tools.title")}> */}
        {/* {Object.keys(listToolAi).map((service, index) => (
            // console.log("listToolAi",listToolAi),
            // <p>"test</p>

            <DesktopSubNav
              aiItems
              key={index}
              service={service}
              object={listToolAi}
            />
          ))} */}
        {/* </PopOverMain> */}
      </Flex>
      <Flex h={"full"} display={{ base: "none", md: "flex" }}>
        <PopOverMain
          title={"test"}
          leftIcon={<Image src={apiIcon} boxSize="40px" alt="send icon" />}
        >
          {/* {Object.keys(listToolAi).map((service, index) => (
            // console.log("listToolAi",listToolAi),
            // <p>"test</p>
            <DesktopSubNav
              forDev
              key={index}
              service={service}
              object={listToolAi}
            />
          ))} */}
          <DesktopSubNav />
        </PopOverMain>
      </Flex>
    </>
  );
};

const DesktopSubNav = () => {
  // console.log("object", object);
  //   const MotionIcon = motion(Icon);
  //   const fireAnimation = keyframes`
  //     0% {
  //       transform: rotate(-8deg);
  //       transform-origin: center bottom;
  //     }
  //     50% {
  //       transform: rotate(8deg);
  //       transform-origin: center bottom;
  //     }
  //     100% {
  //       transform: rotate(-8deg);
  //       transform-origin: center bottom;
  //     }
  //   `;
  return (
    <>
      <Box
        as={Link}
        to={"/test"}
        // role={"group"}
        // display={"block"}
        px={6}
        py={4}
        // rounded={0}
        position={"relative"}
        _hover={{ bg: useColorModeValue("#F8FAFC", "gray.900") }}
      >
        <HStack>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </HStack>
      </Box>
      <Divider variant={"dashed"} />
    </>
  );
};
