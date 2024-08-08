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

export default function PopOverMain({
  title,
  children,
  widthContent,
  leftIcon,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack
      h={"full"}
      alignItems={"center"}
      direction={"row"}
      spacing={4}
      borderBottom="2px solid transparent"
      transition="border-bottom-color 0.6s ease-in-out" // Apply transition globally
      _hover={{
        // borderBottom=  "1px solid 438FF9"
        borderBottomColor: "#438FF9",
      }}
    >
      <Box h={"full"} onMouseEnter={onOpen} onMouseLeave={onClose}>
        <Popover
          h={"full"}
          trigger={"hover"}
          gutter={3}
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
              fontSize={"sm"}
              fontWeight={600}
            >
              {title}
              <ChevronDownIcon
                ml={2}
                transition="transform 0.3s ease"
                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
              />
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
