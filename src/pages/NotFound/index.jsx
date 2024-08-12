import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear-gradient(90deg,rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" fontWeight={800} mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} fontWeight={800} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear-gradient(90deg,rgba(234, 129, 255, 1), rgba(106, 228, 255, 1))"
        color="white"
        variant="solid"
        as={Link}
        to={"/"}
      >
        Go to Home
      </Button>
    </Box>
  );
}
