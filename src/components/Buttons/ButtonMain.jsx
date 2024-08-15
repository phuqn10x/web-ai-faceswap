import { Box, Button, Stack, Text } from "@chakra-ui/react";

function ButtonMain({
  onClick,
  title,
  subTitle,
  children,
  props,
  propsButton,
  propBoxGradient,
  fontSize = "xl",
  fontSizeSub = "sm",
  fontWeight = "600",
  isDisabled,
  hover = true,
}) {
  return (
    <Box
      overflow={"hidden"}
      position={"relative"}
      w={"max-content"}
      // minH={"4.25rem"}
      // h={"auto"}
      // minW={"17.5rem"}
      _hover={{
        ".gradient_box": { transform: hover && "translateX(100%)" },
        transform: hover && "translateY(-10px)",
      }}
      transition={"transform 0.6s ease"}
      borderRadius={"full"}
      boxShadow={"0 10px 13px 0 rgba(182, 212, 255, 1)"}
      {...props}
    >
      <Button
        // as={"box"}
        // cursor={"pointer"}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        w={"full"}
        h={"full"}
        border={"none"}
        borderRadius={"none"}
        variant="rainbow"
        color={"white"}
        gap={0}
        px={6}
        zIndex={2}
        onClick={onClick}
        isDisabled={isDisabled}
        // right
        {...propsButton}
      >
        <Stack alignItems={"start"} spacing={0.5}>
          {title && (
            <Text zIndex={"2"} fontSize={fontSize} fontWeight={fontWeight}>
              {title}
            </Text>
          )}
          {subTitle && (
            <Text zIndex={"2"} fontSize={fontSizeSub} display="block">
              {subTitle}
            </Text>
          )}
        </Stack>
        {children}
      </Button>

      <Box
        className="gradient_box"
        w={"full"}
        h={"full"}
        top={0}
        left={0}
        zIndex={1}
        position={"absolute"}
        transition={"transform  0.2s ease"}
        {...propBoxGradient}
      >
        <Box
          top={0}
          left={0}
          w={"full"}
          h={"full"}
          position={"absolute"}
          backgroundImage={
            isDisabled
              ? "linear-gradient(to right, rgba(242, 242, 242, 1), rgba(242, 242, 2424, 1))"
              : "linear-gradient(to right, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
          }
        />
        <Box
          transform="translateX(-100%)"
          top={0}
          left={"1%"}
          w={"102%"}
          h={"full"}
          position={"absolute"}
          backgroundImage={
            isDisabled
              ? "linear-gradient(to left, rgba(242, 242, 242, 1), rgba(242, 242, 2424, 1))"
              : "linear-gradient(to left, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
          }
        />
      </Box>
    </Box>
  );
}

export default ButtonMain;
