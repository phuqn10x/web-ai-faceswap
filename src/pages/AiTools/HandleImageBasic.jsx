import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Image as ImageChakra,
  Spinner,
  Flex,
  IconButton,
  HStack,
  Text,
  Stack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";
import ButtonMain from "../../components/Buttons/ButtonMain";
// import ButtonVertical from "../../components/ui/Buttons/ButtonVertical";
import { useToast } from "../../Context/ToastContext";
import { useImage } from "../../Context/ImageContext";
import { scroller } from "react-scroll";
import ButtonUploadImage from "../../components/Buttons/ButtonUploadImage";
// import aiApiRequest from "../../apiRequest/ai";
import handleImage from "../../apiRequest/handleImage";
// import { useSelector } from "react-redux";
// import { selectData } from "../../redux/Reducer/auth";
// import { Link as ReactRouterLink } from "react-router-dom";
// import background_transparent from "../../assets/images/background_trans.png";

import { motion } from "framer-motion";
// import { ReactComponent as orangeRectangle } from "../../assets/icons/orangeRectangle.svg";
import { BadgeButton } from "../../assets/icons";
// import Login from "../Auth/Login";
// const OrangeRectangleIcon = chakra(orangeRectangle);
function CustomSwitch({ isChecked, onChange, disabled }) {
  return (
    <Stack
      display="inline-flex"
      alignItems="center"
      position="relative"
      width="148px"
      height="34px"
      background={"#F8FAFC"}
      boxShadow={"lg"}
      borderRadius="20px"
      cursor={disabled ? "not-allowed" : "pointer"}
      onClick={!disabled ? onChange : null}
      opacity={disabled ? 0.5 : 1}
    >
      <HStack
        textAlign={"center"}
        // spacing={0}
        h={"full"}
        w="full"
        justify="space-between"
      >
        <Text
          flex={1}
          zIndex={2}
          fontSize={"14px"}
          color={isChecked ? "gray.500" : "#438FF9"}
        >
          Before
        </Text>
        <Text
          flex={1}
          zIndex={2}
          fontSize={"14px"}
          color={isChecked ? "#438FF9" : "gray.500"}
        >
          After
        </Text>
        <Box
          boxShadow={"0px 1px 4px 0px #E4E6EF"}
          zIndex={1}
          position="absolute"
          left={isChecked ? "calc(100% - 50%)" : "0"}
          width="50%"
          height="100%"
          borderRadius="20px"
          backgroundColor="white"
          transform="scale(85%, 80%)"
          transition="left 0.3s"
        />
      </HStack>
    </Stack>
  );
}

export default function HandleImageBasic({
  image,
  // setProcess,
  // process,
  apiRequest,
  formDataFields,
  setImage,
  // setOption,
}) {
  const [result, setResult] = useState(null);
  const [view, setView] = useState("after");
  const [error, setError] = useState();
  const { setAdvanced } = useImage();
  const [process, setProcess] = useState(false);
  const host = "http://192.168.5.133:8122";
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  // const user = useSelector(selectData);
  const handleReset = () => {
    setImage(null);
    setProcess(false);
  };

  const [imageCurrent, setImageCurrent] = useState(image);
  // const { image: imageContext } = useImage();
  const MotionBox = motion(Box);
  // useEffect(() => {
  //   console.log("imageContext", image);
  //   // if(imageContext){
  //   //   // setImage(null)
  //   // }
  // }, [image]);

  // useEffect(() => {}, [loading]);
  useEffect(() => {
    
    
    // !process && setImageCurrent(image);
    // console.log("image", image);
    setImageCurrent(image)
    // const processImage = async () => {
    //   scroller.scrollTo("scroll-to-element", {
    //     duration: 800,
    //     delay: 0,
    //     smooth: "easeInOutQuart",
    //   });
    //   if (!process) {
    //     setProcess(true);
    //     setResult(null);
    //     const formData = new FormData();
    //     formData.append("image_original", image);
    //     formData.append("prompt", "a cat");
    //     formData.append("streng_p", "1.5");
    //     formData.append("target_age", "40");
    //     formData.append("type_age", "1");
    //     formData.append("appid", "1");
    //     formData.append("country", "1");
    //     formData.append("device_id", "1");
    //     // Append additional formData fields dynamically
    //     if (formDataFields) {
    //       console.log("testing form");
    //       Object.entries(formDataFields).forEach(([key, value]) => {
    //         formData.append(key, value);
    //       });
    //     }
    //     try {
    //       console.log("formData", formData);

    //       const response = await apiRequest(formData);
    //       console.log(response);
    //       if (!response.error) {
    //         console.log("response", response);
    //         setResult(response.payload.image);
    //       } else {
    //         throw response.error;
    //       }
    //     } catch (error) {
    //       // console.log(error);

    //       setError(error);
    //     } finally {
    //       setProcess(false);
    //     }
    //   } else {
    //     showToast("Processing image, please wait...", "info");
    //   }
    // };
    // processImage();
  }, [image]);

  const handleDownload = async (isOriginal = false) => {
    const { getHDimage } = handleImage;
    const fileName = isOriginal ? "amopics_hd.png" : "amopics_sd.png";

    if (isOriginal) {
      try {
        setLoading(true);
        const resultFinal = result.replace(host, "");

        const response = await getHDimage(resultFinal);
        if (!response.error) {
          // setImage(image)
          // Đảm bảo sử dụng await cho blob()
          let url = window.URL.createObjectURL(response);
          let a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
          console.log("response", response);
          // } else {
          //   throw response.error;
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(result);
        const blob = await response.blob();
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };
  const handleProOption = () => {
    setAdvanced("advanced");
    setImage(result);
  };
  const { onOpen } = useDisclosure();
  return (
    // <Container maxW="full" p={0}>
    <Container maxW={"xl"} className="scroll-to-element">
      <Box
        mb={16}
        rounded={"18px"}
        border={"3px solid"}
        borderColor={
          process ? "rgba(67, 143, 249, 0.5)" : "rgba(67, 143, 249, 1)"
        }
        // isDisabled={process}

        alignItems={"center"}
      >
        <Flex w="full" justifyContent={"center"}>
          <ButtonUploadImage
            // setImage={setImage}
            isDisabled={process}
            propsButton={{
              color: "#438FF9",
              py: 8,
            }}
            props={{
              fontSize: "26px",
              props: { boxShadow: "unset", w: "full" },
              propBoxGradient: { display: "none" },
            }}
            colorIcon={" #438FF9"}
          />
        </Flex>
      </Box>
      <Box
        bgColor={"white"}
        rounded={"40px"}
        px={40}
        py={20}
        position="relative"
      >
        <HStack placeContent={"center"} spacing={16} alignItems="center">
          <Flex
            borderRadius={"20px"}
            overflow={"hidden"}
            justifyContent={"center"}
            position="relative"
          >
            <Box display="inline-block">
              <Stack
                left={"2%"}
                top={"2%"}
                position={"absolute"}
                alignItems="center"
                justifyContent="center"
                opacity={result ? "1" : "0.5"}
                zIndex={1}
              >
                <CustomSwitch
                  isChecked={view === "after"}
                  onChange={() =>
                    setView(view === "after" ? "before" : "after")
                  }
                  disabled={!result}
                />
              </Stack>
              <Stack
                textAlign="center"
                bgImage={`linear-gradient(45deg,#ffffff 25%,transparent 0),linear-gradient(45deg,transparent 75%,#ffffff 0),linear-gradient(45deg,#ffffff 25%,transparent 0),linear-gradient(45deg,transparent 75%,#ffffff 0)`}
                bgColor={"#e7e7e7"}
                bgPosition={"0 0,15px 15px,15px 15px,30px 30px"}
                bgSize={"30px 30px"}
                w={"30rem"}
                minHeight={"30rem"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box position="relative">
                  {view === "before" ? (
                    <ImageChakra
                      src={URL.createObjectURL(imageCurrent)}
                      alt="Uploaded Image"
                      maxH={"31.25rem"}
                      objectFit="cover"
                      opacity={result ? "1" : "0.5"}
                    />
                  ) : !result ? (
                    process ? (
                      <ImageChakra
                        src={URL.createObjectURL(imageCurrent)}
                        alt="Uploaded Image"
                        maxH={"31.25rem"}
                        objectFit="cover"
                      />
                    ) : (
                      <Box maxH={"31.25rem"} alignContent={"center"}>
                        <Text>{error}</Text>
                      </Box>
                    )
                  ) : (
                    <ImageChakra
                      src={result}
                      alt="Processed Image"
                      maxH={"31.25rem"}
                      objectFit="cover"
                    />
                  )}
                </Box>
                {process && (
                  // <p>test</p>
                  <Stack
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    alignItems="center"
                    justifyContent="center"
                    bgColor="rgba(0, 0, 0, 0.4)"
                  >
                    {/* <Box> */}
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      h={"72px"}
                      w={"72px"}
                      bgColor={" rgba(0, 0, 0, 0.7)"}
                      p={4}
                      borderRadius={"12px"}
                      m={0}
                    >
                      <Spinner boxSize={8} />
                    </Flex>
                    <Text color={"white"}>Loading...</Text>
                    {/* </Box> */}
                  </Stack>
                )}
              </Stack>
            </Box>
          </Flex>
          <Box>
            <Stack textAlign={"center"} spacing={4} justifyContent="center">
              <ButtonMain
                propsButton={{ isDisabled: !result, minH: "65px" }}
                onClick={() => handleDownload()}
                title={"Download SD"}
              />
              <Text fontSize="sm" color="gray.500">
                612 x 612 px
              </Text>
              <MotionBox
                whileHover={{ transform: "translateY(-10px)" }}
                position={"relative"}
              >
                <BadgeButton disabled={!result} title={"1 credit"} />
                {/* <BadgeButton disabled={!result } title={"1 credit"} /> */}
                {/* <Icon
                  position={"absolute"}
                  as={OrangeRectangleIcon}
                  width={"auto"} // Thay currentWidth bằng chiều rộng hiện tại của biểu tượng
                  height={"20px"}
                  zIndex={1}
                  top={-2}
                  right={0}
                  opacity={result && user ? "1" : "0.5"}
                /> */}
                {/* <ButtonVertical
                  title={`Download HD  ${!user ? "(Login)" : ""}`}
                  // title={`Download HD `}
                  onClick={() => {
                    user ? handleDownload(true) : onOpen();
                  }}
                  propsButton={{
                    isLoading: loading,
                    isDisabled: !result,
                    // isDisabled: !result ,
                    minH: "65px",
                    minW: "300px",
                  }}
                  props={{
                    _hover: {
                      transform: "unset",
                    },
                  }}
                /> */}
              </MotionBox>

              {/* {!user && (
                <> */}
                  {/* <Link
                    // as={ReactRouterLink}
                    // to={"/login"}
                    // fontSize="sm"
                    // color="gray.500"
                    onClick={onOpen}
                  >
                    login to download HD
                  </Link> */}
                  {/* <Button onClick={onOpen}>Open Modal</Button> */}
                  {/* <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Login</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Login />
                      
                      </ModalBody>
                    </ModalContent>
                  </Modal> */}
                {/* </>
              )} */}

              <Text fontSize="sm" color="gray.500">
                1214 x 1214 px
              </Text>
              {/* <ButtonVertical
                propsButton={{
                  // isLoading: loading,
                  isDisabled: !result,
                  minH: "65px",
                }}
                onClick={() => {
                  user ? handleProOption() : onOpen();
                }}
                // onClick={()=>{}handleProOption}
                title={"Edit More"}
              /> */}
            </Stack>
          </Box>
        </HStack>
        <IconButton
          icon={<CloseIcon boxSize={"10px"} />}
          position="absolute"
          top="20px"
          minHeight={"1px"}
          right="20px"
          onClick={handleReset}
          aria-label="Close"
        />
      </Box>
    </Container>

    // </Container>
  );
}
