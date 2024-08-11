import { Box, Stack, Text } from "@chakra-ui/react";

function ButtonMain({
  title,
  subTitle,
  children,
  props,
  propsButton,
  propBoxGradient,
  fontSize = "xl",
  fontSizeSub = "sm",
  fontWeight = "600",
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
        ".gradient_box": { transform: "translateX(100%)" },
        transform: "translateY(-10px)",
      }}
      transition={"transform 0.6s ease"}
      borderRadius={"full"}
      boxShadow={"0 10px 13px 0 rgba(182, 212, 255, 1)"}
      {...props}
    >
      <Box
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        w={"full"}
        h={"full"}
        border={"none"}
        borderRadius={"none"}
        variant="outline"
        color={"white"}
        gap={0}
        px={6}
        zIndex={2}
        // onClick={onClick}
        // right
        {...propsButton}
      >
        <Stack alignItems={"start"} spacing={0.5}>
          {title && (
            <Text
              zIndex={"2"}
              fontSize={fontSize}
             
              fontWeight={fontWeight}
            >
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
      </Box>

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
            "linear-gradient(to right, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
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
            "linear-gradient(to left, rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
          }
        />
      </Box>
    </Box>
  );
}

export default ButtonMain;
