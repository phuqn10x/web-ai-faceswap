import {
  Box,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  Tabs,
} from "@chakra-ui/react";
import aiApiRequest from "../../../apiRequest/ai";
import HerosAI from "../HerosAI";
import { useEffect, useRef, useState } from "react";
import ScrollContainer from "cm-react-indiana-drag-scroll";
// import { Button } from "react-scroll";
import ButtonMain from "../../../components/Buttons/ButtonMain";
import imageHandler from "../../../apiRequest/imageHandler";
import { useImage } from "../../../Context/ImageContext";
import { useToast } from "../../../Context/ToastContext";

function Art() {
  const { art } = aiApiRequest;
  return (
    <>
      <HerosAI
        title={"AI Art Generator"}
        description={
          "Effortlessly turn your photos into masterpieces with FaceSwap AI portrait generator, creating personalized, eye-catching portraits in just a few seconds."
        }
        advanced={{
          apiRequest: art,
          editImage: false,
          tools: <ArtStyleComponent />,
        }}
      />
    </>
  );
}
function ArtStyleComponent() {
  const { artStyle, art } = aiApiRequest;
  const { getProcessedQueue } = imageHandler;
  const { image, setImage, ImageSelected, setImageSelected, setLoading } =
    useImage();
  const [selectedStyle, setSelectedStyle] = useState();
  const [process, setProcess] = useState(false);
  const [styles, setStyles] = useState();
  const { showToast } = useToast();
  // const [selected, setSelected] = useState("Images");
  const [idQueue, setIdQueue] = useState();

  const handleSelectStyle = (styles) => {
    console.log("Selected style:", styles);
    setSelectedStyle(styles);
    // Thực hiện các hành động khác như cập nhật state hoặc gọi API.
  };

  useEffect(() => {
    console.log("testStyle");

    const getArtStyle = async () => {
      const response = await artStyle();
      if (!response.error) {
        console.log("response", response.payload);
        setStyles(response.payload);
      } else {
        throw response.error;
      }
    };

    getArtStyle();
  }, [artStyle]);
  useEffect(() => {
    if (styles) {
      // Lấy tên style của phần tử đầu tiên trong tab đầu tiên
      // const firstStyle = Object.keys(styles)[0];
      // const firstItemKey = `${styles[firstStyle].name_style}_0`;

      // Tự động chọn phần tử đầu tiên
      // setSelectedStyle(firstItemKey);
      const firstStyle = Object.keys(styles)[0];
      const firstItemKey = styles[firstStyle].object[0];
      // console.log(firstItemKey.style);

      // Tự động chọn phần tử đầu tiên
      setSelectedStyle(firstItemKey.style);
    }
  }, [styles]);
  const handleGenerate = async () => {
    setIdQueue(null);
    setLoading(true);
    if (image) {
      // console.log("imageSelected", imageSelected);
      console.log("Generating style:", selectedStyle);
      const formData = new FormData();
      // console.log("image", image[0]);
      formData.append("image_original", image[0]);
      formData.append("style", selectedStyle);
      formData.append("seed_take", "-1");
      formData.append("face_strength", "-1");
      formData.append("appid", "1");
      formData.append("country", "1");
      formData.append("device_id", "1");
      formData.append("tier", "0");
      // Append additional formData fields dynamically
      // if (formDataFields) {
      // console.log("testing form");
      formData.entries().forEach(([key, value]) => {
        console.log(key, value);
      });
      // }
      // console.log(formData.entries());
      try {
        const response = await art(formData);
        setIdQueue(response.payload._id);
      } finally {
        // setLoading(false);
      }

      // console.log("formData", formData);
    }
    // setSelectedStyle(style);
    // Thực hiện các hành động khác như cập nhật state hoặc gọi API.
  };

  const intervalIdRef = useRef(null);
  useEffect(() => {
    const processQueue = async () => {
      if (idQueue) {
        console.log("idQueue", idQueue);

        intervalIdRef.current = setInterval(async () => {
          const response = await getProcessedQueue(idQueue);
          console.log("getProcessedQueue", response);
          const result = response.payload;
          if (result) {
            try {
              if (result.message === "image not face") {
                showToast(`Can't detech your face `, "error");
              } else {
                setImageSelected(response.payload.result.url);
              }
            } finally {
              setLoading(false);
              clearInterval(intervalIdRef.current);
            }
          }
        }, 2000);
      }
    };
    processQueue();
  }, [idQueue]);

  return (
    <Stack
      position={"relative"}
      justifyContent={"space-between"}
      height="100%"
      w={"100%"}
    >
      {!styles && (
        <Stack p={4} position={"absolute"} w={"100%"} h={"100%"}>
          <Skeleton h="8%" w={"100%"} mb={1} borderRadius="md" />
          <SimpleGrid columns={3} spacing={2} h={"92%"} w={"100%"}>
            {[...Array(9)].map((_, index) => (
              <Skeleton key={index} w="100%" h="100%" borderRadius="md" />
            ))}
          </SimpleGrid>
        </Stack>
      )}
      <Stack px={1} py={0} flex={"90%"} w={"100%"} overflow="hidden">
        <Box
          transition="opacity 0.3s ease-in-out"
          opacity={styles ? 1 : 0}
          // py={"20px"}
          w={"100%"}
          h={"100%"}
        >
          {styles && (
            <>
              <Tabs
                display={"flex"}
                flexDirection={"column"}
                flexShrink={0}
                // overflowY={"auto"}
                w={"100%"}
                // flex={1}
                h={"100%"}
                // position="relative"
                variant="unstyled"
                defaultIndex={0}
                isLazy
                onChange={(index) => {
                  // Lấy tên style của phần tử đầu tiên trong tab mới
                  const firstStyle = Object.keys(styles)[index];
                  const firstItemKey = styles[firstStyle].object[0];
                  // console.log(firstItemKey.style);

                  // Tự động chọn phần tử đầu tiên
                  setSelectedStyle(firstItemKey.style);
                }}
              >
                {/* <Stack  overflowY={"auto"}> */}
                <TabList
                  border={"unset"}
                  // w={"100%"}
                  // borderRadius="2xl"
                  // overflow={"hidden"}
                  // bgColor={"rgba(248, 250, 252, 1)"}
                  zIndex={0}
                  // position="relative"
                  // overflowX={"auto"}
                  // height="50px"
                >
                  <ScrollContainer
                    // mouseScroll={{ ignoreElements: "Tab" }}
                    style={{
                      display: "flex",
                      flexDirection: "row", // Xếp các phần tử theo hàng ngang
                      // overflowX: "auto", // Bật cuộn ngang
                      // overflowY: "hidden", // Ẩn cuộn dọc
                      whiteSpace: "nowrap", // Đảm bảo không ngắt dòng
                      userSelect: "none", // Ngăn không cho bôi đen chữ khi drag
                      WebkitUserSelect: "none", // Đảm bảo hỗ trợ trình duyệt Webkit
                      MozUserSelect: "none",

                      padding: "20px 15px",
                    }}
                  >
                    {/* scrollable content */}

                    {Object.keys(styles).map((category, index) => (
                      <Tab
                        // px={6}
                        // py={2}
                        // p={0}
                        fontWeight={"700"}
                        fontSize="16px"
                        position={"relative"}
                        color="rgba(141, 141, 141, 1)"
                        _selected={{
                          color: "rgba(11, 113, 255, 1)",
                          _after: {
                            content: '""',
                            position: "absolute",
                            width: "50px", // Chiều dài của thanh ngang
                            height: "3px", // Chiều cao của thanh ngang
                            bg: "rgba(11, 113, 255, 1)", // Màu sắc của thanh ngang
                            borderRadius: "10px", // Bo tròn góc
                            bottom: "0px", // Độ lệch xuống phía dưới text
                            left: "50%",
                            transform: "translateX(-50%)", // Căn giữa thanh ngang với text
                          },
                        }}
                        key={`${category}-${index}`}
                        whiteSpace={"nowrap"}
                      >
                        {styles[category].name_style}
                      </Tab>
                    ))}
                  </ScrollContainer>
                </TabList>

                <TabPanels w={"100%"} overflowY={"scroll"} height={"100%"}>
                  {Object.keys(styles).map((category, index) => (
                    <TabPanel pr={2} py={0} key={`${category}-${index}`}>
                      <SimpleGrid
                        // overflowY={"scroll"}
                        key={`${category}-${index}`}
                        p={0}
                        columns={3}
                        spacing={2}
                      >
                        {styles[category].object.map((item, index) => (
                          <Box
                            display="flex"
                            // boxSize="80px"

                            flexWrap="wrap"
                            key={index}
                          >
                            <Button
                              borderRadius={"12px"}
                              overflow={"hidden"}
                              height={"auto"}
                              variant={"unstyled"}
                              onClick={() => handleSelectStyle(`${item.style}`)}
                              border="4px solid"
                              borderColor={
                                selectedStyle === `${item.style}`
                                  ? "rgba(11, 113, 255, 1)"
                                  : "transparent"
                              }
                              bg={
                                selectedStyle === `${item.style}`
                                  ? "teal.100"
                                  : "white"
                              }
                              _hover={
                                selectedStyle !== `${item.style}` && {
                                  borderColor: "teal",
                                }
                              }
                            >
                              <Image
                                filter={
                                  selectedStyle !== `${item.style}`
                                    ? "brightness(70%)"
                                    : "brightness(100%)"
                                }
                                transition="filter 0.3s ease-in-out"
                                loading="lazy"
                                src={item.icon_url}
                                alt={item.style}
                                objectFit="cover"
                                height={"160px"}
                                width={"130px"}
                                fallbackSrc="https://via.placeholder.com/150"
                              />

                              {/* <Box mt={2} textAlign="center">
                              {item.style}
                            </Box> */}
                            </Button>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </TabPanel>
                  ))}
                </TabPanels>
                {/* </Stack> */}
              </Tabs>
            </>
          )}
        </Box>
      </Stack>
      {styles && (
        <Stack px={4} flex={"10%"} justifyContent="center" alignItems="center">
          <ButtonMain
            hover={false}
            fontWeight={"800"}
            props={{ width: "100%" }}
            propsButton={{ px: "10px", py: "10px" }}
            // propsButton={{ isDisabled: !selectedStyle }}
            isDisabled={!selectedStyle}
            fontSize={"22px"}
            onClick={handleGenerate}
            title={"Gererate"}
          />
        </Stack>
      )}
    </Stack>
  );
}
export default Art;
