import { Box, chakra, Text } from "@chakra-ui/react";
// import { ReactComponent as orangeRectangle } from "./orangeRectangle.svg";
import { ReactComponent as headerHot } from "./header-fire.svg";
// const OrangeRectangleIcon = chakra(orangeRectangle);
const HeaderHotIcon = chakra(headerHot);

function BadgeButton({ disabled, title }) {
  return (
    <Box
      top={-4}
      right={-2}
      zIndex={1}
      position={"absolute"}
      width="100px"
      height="30px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear-gradient(90deg, #FB9E32 0%, #EE5856 100%)"
      borderRadius="40px 4px 40px 4px"
      // paddingX="15px"
      opacity={disabled ? 0.5 : 1}
    >
      <Text color="white" fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
}
// export { HeaderHotIcon };
export { BadgeButton, HeaderHotIcon };
