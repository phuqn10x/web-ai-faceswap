import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function PopOverMain({
  title,
  children,
  widthContent,
  leftIcon,
  to
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack
      h={"full"}
      alignItems={"center"}
      direction={"row"}
      spacing={4}
      boxShadow="0 4px 0 transparent"
      transition="box-shadow 0.6s ease-in-out" // Apply transition globally
      _hover={{
        boxShadow: "0 4px 0 #438FF9",
      }}
    >
      <Box
        h={"full"}
        as={!children ? Link : ""}
        to={to}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <Popover
          h={"full"}
          trigger={"hover"}
          gutter={6}
          direction="rtl"
          placement={"bottom-start"}
        >
          <PopoverTrigger>
            {/* <Box> */}
            <Button
              // as={Button}
              display="flex"
              alignItems="center"
              h={"full"}
              bg={"transparent"}
              leftIcon={leftIcon}
              _hover={{
                bg: "none",
              }}
              // fontSize={"sm"}
              fontWeight={600}
            >
              {title}
              {children && (
                <ChevronDownIcon
                  ml={2}
                  transition="transform 0.3s ease"
                  transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                />
              )}
            </Button>
            {/* </Box> */}
          </PopoverTrigger>

          <PopoverContent
            border={0}
            boxShadow={"xl"}
            // bg={popoverContentBgColor}
            // p={4}
            // transform="scale(1)"
           
            w={"full" ?? widthContent}
            rounded={"unset"}
            //   minW={"400px"}
            // key={index}
          >
            <Stack spacing={0}>{children}</Stack>
          </PopoverContent>
        </Popover>
      </Box>
    </Stack>
  );
}
