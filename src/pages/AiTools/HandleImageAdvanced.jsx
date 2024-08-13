import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Transformer,
  Rect,
  Group,
  Image as KonvaImage,
} from "react-konva";
import useImage from "use-image";
import { useImage as useImages } from "../../Context/ImageContext";
import {
  border,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  VStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image as ChakraImage,
  Spinner,
} from "@chakra-ui/react";
import {
  FaArrowsAlt,
  FaFillDrip,
  FaImage,
  FaTextHeight,
  FaTint,
} from "react-icons/fa";
import aiApiRequest from "../../apiRequest/ai";
import ButtonMain from "../../components/Buttons/ButtonMain";
import imageHandler from "../../apiRequest/imageHandler";
const CanvasImage = ({
  src,
  onSelect,
  isSelected,
  rectWidth,
  rectHeight,
  imageWidth,
  imageHeight,
  colorRect = "transparent",
}) => {
  const imageRef = useRef();
  const trRef = useRef();
  const [image] = useImage(src);

  // useEffect(() => {
  //   if (isSelected && shapeRef.current) {
  //     onSelect(shapeRef.current);
  //   }
  // }, [isSelected, onSelect, shapeRef]);

  useEffect(() => {
    if (isSelected && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {image ? (
        <KonvaImage
          image={image}
          draggable
          width={imageWidth}
          height={imageHeight}
          ref={imageRef}
          onClick={onSelect}
          onTap={onSelect}
          onMouseDown={onSelect}
        />
      ) : (
        <Rect
          width={rectWidth}
          height={rectHeight}
          draggable
          fill={colorRect}
          ref={imageRef}
          onClick={onSelect}
          onTap={onSelect}
          onMouseDown={onSelect}
        />
      )}

      {isSelected && imageRef.current && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
const boardArea = (width, height) => {
  console.log("Create Checkerboard");
  const size = 20;
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const squares = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      squares.push(
        <Rect
          key={`${i}-${j}`}
          x={j * size}
          y={i * size}
          width={size}
          height={size}
          fill={(i + j) % 2 === 0 ? "#ffffff" : "#cccccc"}
        />
      );
    }
  }
  return squares;
};
const SidebarButton = ({ icon, label, isSelected, onClick }) => {
  return (
    <VStack spacing={1} align="center" onClick={onClick}>
      <Box
        p={2}
        borderRadius="full"
        bg={isSelected ? "blue.50" : "transparent"}
        color={isSelected ? "blue.500" : "gray.500"}
      >
        <IconButton
          icon={icon}
          aria-label={label}
          variant="ghost"
          colorScheme={isSelected ? "blue" : "gray"}
          isRound
          size="lg"
        />
      </Box>
      <Text color={isSelected ? "blue.500" : "gray.500"} fontSize="16px">
        {label}
      </Text>
    </VStack>
  );
};
export default function HandleImageAdvanced({ apiRequest }) {
  const canvasWidth = 1300;
  const canvasHeight = 810;
  const stageRef = useRef();
  const { image: imageContext } = useImages();
  const [imageSelected, setImageSelected] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [patternImage, setPatternImage] = useState(null);
  const [colorRect, setColorRect] = useState("transparent");
  const [selectedE, setSelectE] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleWheel = (e) => {
    // console.log("Wheel", e);
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const scaleBy = 1.05;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  const handleMouseDownAndTouchStart = (e) => {
    console.log("Touch stage", e);
    if (e.target === e.target.getStage()) {
      setSelectE(false);
    }
  };

  useEffect(() => {
    if (imageContext) {
      console.log("imageContext", imageContext);
      setSelectE(false);
      let imageSrc;

      if (typeof imageContext === "string") {
        // Nếu imageContext là một URL
        imageSrc = imageContext;
      } else if (Array.isArray(imageContext) && imageContext.length > 0) {
        // Nếu imageContext là một mảng và có phần tử
        if (typeof imageContext[0] === "string") {
          // Nếu phần tử đầu tiên của mảng là một URL
          imageSrc = imageContext[0];
        } else {
          // Nếu phần tử đầu tiên của mảng là một đối tượng file
          imageSrc = URL.createObjectURL(imageContext[0]);
        }
      }

      if (imageSrc) {
        setImageSelected(imageSrc);
        const img = new Image();
        console.log(img);
        img.src = imageSrc;
        img.onload = () => {
          console.log("img", img.width, img.height);

          let newWidth, newHeight, xOffset, yOffset;

          if (img.width < 500 || img.height < 500) {
            // Nếu cả width và height đều dưới 500px, giữ nguyên kích thước
            newWidth = img.width;
            newHeight = img.height;
          } else {
            // Tính toán kích thước mới
            const scaleX = canvasWidth / img.width - 0.2;
            const scaleY = canvasHeight / img.height - 0.2;
            console.log("Scale", scaleX, scaleY);
            const scale = Math.min(scaleX, scaleY);
            newWidth = img.width * scale;
            newHeight = img.height * scale;
            console.log("New Size", newWidth, newHeight);
          }

          // Cập nhật kích thước và vị trí của ảnh
          setImageSize({ width: newWidth, height: newHeight });
          xOffset = (canvasWidth - newWidth) / 2;
          yOffset = (canvasHeight - newHeight) / 2;
          console.log("xOffset", xOffset, yOffset);
          setPos({
            x: xOffset,
            y: yOffset,
          });
        };
      }
    }
  }, [imageContext]);

  useEffect(() => {
    const pattern = new window.Image();
    pattern.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABlBMVEUAAADY2NjnFMi2AAAAAXRSTlMAQObYZgAAABVJREFUGNNjYIQDBgQY0oLDxBsIQQCltADJNa/7sQAAAABJRU5ErkJggg==`;
    pattern.onload = () => {
      setPatternImage(pattern);
    };
  }, []);
  // const [pos, setPos] = useState({ x: 0, y: 0 });
  // useEffect(() => {
  //   const image = new window.Image();
  //   image.src = imageSelected;
  //   image.addEventListener("load", handleLoad);
  //   function handleLoad(event) {
  //     const image = event.currentTarget;

  //     const xOffset = (canvasWidth - image.width) / 2;
  //     const yOffset = (canvasHeight - image.height) / 2;
  //     console.log("xOffset", xOffset, yOffset);
  //     setPos({
  //       x: xOffset,
  //       y: yOffset,
  //     });
  //   }
  //   return () => {
  //     image.removeEventListener("load", handleLoad);
  //   };
  // }, [imageSelected]);
  const { artStyle, art } = aiApiRequest;
  const { getProcessedQueue } = imageHandler;
  const [styles, setStyles] = useState();
  const [selected, setSelected] = useState("Images");

  useEffect(() => {
    console.log("test");

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
  }, []);
  const [selectedStyle, setSelectedStyle] = useState();
  const [idQueue, setIdQueue] = useState();
  const handleSelectStyle = (styles) => {
    console.log("Selected style:", styles);
    setSelectedStyle(styles);
    // Thực hiện các hành động khác như cập nhật state hoặc gọi API.
  };
 
  const intervalIdRef = useRef(null);
  const handleGenerate = async () => {
    setIdQueue(null);
    if (imageContext) {
      // console.log("imageSelected", imageSelected);
      console.log("Generating style:", selectedStyle);
      const formData = new FormData();
      // console.log("image", imageContext);
      formData.append("image_original", imageContext[0]);
      formData.append("style", selectedStyle);
      formData.append("seed_take", "-1");
      formData.append("face_strength", "-1");
      formData.append("appid", "1");
      formData.append("country", "1");
      formData.append("device_id", "1");
      formData.append("tier", "0");
      // Append additional formData fields dynamically
      // if (formDataFields) {
      //   console.log("testing form");
      //   Object.entries(formData).forEach(([key, value]) => {
      //     formData.append(key, value);
      //   });
      // }
      // console.log(formData.entries());

      const response = await art(formData);
      setIdQueue(response.payload._id);
      // console.log("formData", formData);
    }
    // setSelectedStyle(style);
    // Thực hiện các hành động khác như cập nhật state hoặc gọi API.
  };
  const [process, setProcess] = useState(false);
  useEffect(() => {
    const processQueue = async () => {
     
      
      if (idQueue) {
        setProcess(true);
        console.log("idQueue", idQueue);
        const response = await getProcessedQueue(idQueue);
        console.log("getProcessedQueue", response);
        intervalIdRef.current = setInterval(async () => {
          const response = await getProcessedQueue(idQueue);
          console.log("getProcessedQueue", response);
          if (response.payload) {
            setImageSelected(response.payload.result.url)
            clearInterval(intervalIdRef.current);
            setProcess(false)
          }
          // if (!rep?.images) {
          //   if (data.live_preview) {
          //     setImageUrl(data.live_preview);
          //   }
          // }
          // if (data.progress > 0.2) {
          //   setProgress({
          //     value: data.progress,
          //     eta: data.eta,
          //     status: "Generate starting...",
          //   });
          // }
          // if (data.progress > 0.3) {
          //   setProgress({
          //     value: data.progress,
          //     eta: data.eta,
          //     status: "Inferencing",
          //   });
          // }
          // if (data.progress > 0.5) {
          //   setProgress({
          //     value: data.progress,
          //     eta: data.eta,
          //     status: "Generating...",
          //   });
          // }
          // if (data.progress > 0.83) {
          //   clearInterval(intervalIdRef.current);
          //   setProgress({
          //     value: 1,
          //     eta: data.eta,
          //     status: "Uploading photo...",
          //   });
          // }
        }, 2000);
      }
    };
    processQueue();
  }, [idQueue]);
  return (
    <>
      <Container p={0} maxW={"full"}>
        <Flex
        // justifyContent={"center"}
        >
          <Box flex={"25%"} w={"25%"} height={"auto"}>
            <Flex height="100%">
              {/* <Stack
                bgColor={"white"}
                border="1px solid rgba(223,223,224,1)"
                flex="22%"
              >
                <SidebarButton
                  icon={<FaFillDrip />}
                  label="Background"
                  isSelected={selected === "Background"}
                  onClick={() => setSelected("Background")}
                />
                <SidebarButton
                  icon={<FaArrowsAlt />}
                  label="Size"
                  isSelected={selected === "Size"}
                  onClick={() => setSelected("Size")}
                />
                <SidebarButton
                  icon={<FaTextHeight />}
                  label="Add Text"
                  isSelected={selected === "Add Text"}
                  onClick={() => setSelected("Add Text")}
                />
              </Stack> */}
              <Box
                bgColor={"white"}
                border="1px solid rgba(223,223,224,1)"
                p={"8px"}
                overflow="hidden"
                // flex="78%"
              >
                <Box overflow={"scroll"} py={"20px"}>
                  <Tabs position="relative" variant="unstyled">
                    <TabList
                      w={"100%"}
                      borderRadius="2xl"
                      bgColor={"rgba(248, 250, 252, 1)"}
                      zIndex={0}
                      position="relative"
                      height="50px"
                    >
                      <Tab
                        px={6}
                        py={2}
                        fontWeight={"700"}
                        fontSize="16px"
                        color="rgba(141, 141, 141, 1)"
                        _selected={{ color: "rgba(11, 113, 255, 1)" }}
                      >
                        Styles
                      </Tab>
                      <Tab
                        px={6}
                        py={2}
                        fontWeight={"700"}
                        fontSize="16px"
                        color="rgba(141, 141, 141, 1)"
                        _selected={{ color: "rgba(11, 113, 255, 1)" }}
                      >
                        Plain Color
                      </Tab>
                      <Tab
                        px={6}
                        py={2}
                        fontWeight={"700"}
                        fontSize="16px"
                        color="rgba(141, 141, 141, 1)"
                        _selected={{ color: "rgba(11, 113, 255, 1)" }}
                      >
                        Interior
                      </Tab>
                      <Tab
                        px={6}
                        py={2}
                        fontWeight={"700"}
                        fontSize="16px"
                        color="rgba(141, 141, 141, 1)"
                        _selected={{ color: "rgba(11, 113, 255, 1)" }}
                      >
                        Countertop
                      </Tab>
                      <Tab
                        px={6}
                        py={2}
                        fontWeight={"700"}
                        fontSize="16px"
                        color="rgba(141, 141, 141, 1)"
                        _selected={{ color: "rgba(11, 113, 255, 1)" }}
                      >
                        Real Estate
                      </Tab>
                    </TabList>
                    <TabIndicator
                      // position="absolute"
                      // top="0"
                      // left="0"
                      // height="100%"
                      // width="100%"
                      mt="-1.5px"
                      height="2px"
                      bg="blue.500"
                      borderRadius="2xl"
                    />

                    <TabPanels>
                      <TabPanel>
                        {styles && (
                          <Tabs variant="soft-rounded" colorScheme="teal">
                            <TabList overflowX={"scroll"}>
                              {Object.keys(styles).map((category) => (
                                <Tab key={category}>
                                  {styles[category].name_style}
                                </Tab>
                              ))}
                            </TabList>

                            <TabPanels height={"550px"} overflowY={"scroll"}>
                              {Object.keys(styles).map((category) => (
                                <TabPanel key={category}>
                                  <Box display="flex" flexWrap="wrap">
                                    {styles[category].object.map(
                                      (item, index) => (
                                        // <Box key={index}>
                                        <Button
                                          height={"auto"}
                                          key={index}
                                          p={2}
                                          variant={"unstyled"}
                                          onClick={() =>
                                            handleSelectStyle(item.style)
                                          }
                                          borderColor={
                                            selectedStyle === item.style
                                              ? "teal"
                                              : "gray"
                                          }
                                          bg={
                                            selectedStyle === item.style
                                              ? "teal.100"
                                              : "white"
                                          }
                                          _hover={
                                            selectedStyle !== item.style && {
                                              bg: "teal.50",
                                            }
                                          }
                                        >
                                          <ChakraImage
                                            src={item.icon_url}
                                            alt={item.style}
                                            boxSize="110px"
                                            objectFit="contain"
                                          />
                                          <Box mt={2} textAlign="center">
                                            {item.style}
                                          </Box>
                                        </Button>
                                        // </Box>
                                      )
                                    )}
                                  </Box>
                                </TabPanel>
                              ))}
                            </TabPanels>
                          </Tabs>
                        )}
                      </TabPanel>
                      <TabPanel>
                        <p>three!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>three!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>three!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>three!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                  <ButtonMain title={"GENERATE"} onClick={handleGenerate} />
                </Box>

                {/* <Grid
                  padding={"10px"}
                  placeItems={"center"}
                  templateColumns="repeat(4, minmax(0,1fr))"
                  gap={"6px"}
                >
                  {" "}
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"#dfdfdf"}
                    bgImage={`linear-gradient(45deg,white 25%,transparent 0px),linear-gradient(45deg,transparent 75%,white 0px),linear-gradient(45deg,white 25%,transparent 0px),linear-gradient(45deg,transparent 75%,white 0px)`}
                    width={"3.5rem"}
                    bgPosition={"0 0,10px 10px,10px 10px,20px 20px"}
                    bgSize={"20px 20px"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("transparent")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(139,27,27,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(139,27,27,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(255,255,255,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(255,255,255,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                  <Button
                    border="1px solid rgba(223,223,224,1)"
                    variant={"color"}
                    bgColor={"rgba(0,0,0,1)"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    onClick={() => setColorRect("rgba(0,0,0,1)")}
                  ></Button>
                </Grid> */}
              </Box>
            </Flex>
          </Box>
          {/* <Box> */}
          <Box
            flex={"75%"}

            // bgImage={`linear-gradient(45deg,#ffffff 25%,transparent 0),linear-gradient(45deg,transparent 75%,#ffffff 0),linear-gradient(45deg,#ffffff 25%,transparent 0),linear-gradient(45deg,transparent 75%,#ffffff 0)`}
            // bgPosition={"0 0,15px 15px,15px 15px,30px 30px"}
            // bgSize={"30px 30px"}
            // width={imageSize.width}
            // height={imageSize.height}
          >
            {imageSize && (
              <Stage
                width={canvasWidth}
                height={canvasHeight}
                ref={stageRef}
                onTouchStart={handleMouseDownAndTouchStart}
                onMouseDown={handleMouseDownAndTouchStart}
                // onWheel={handleWheel}
                x={0}
                y={0}
                style={{
                  // margin: "2.5rem 23%",
                  // transform: "translateX(-180px)",
                  backgroundColor: "#f5f5f5",
                }}
                // style={{ border: "1px solid black" }}
              >
                <Layer x={pos.x} y={pos.y}>
                  <Rect
                    width={imageSize.width}
                    height={imageSize.height}
                    fillPatternImage={patternImage}
                    fillPatternScale={{ x: 1, y: 1 }}
                    fillPatternRepeat="repeat"
                  />
                </Layer>
                <Layer x={pos.x} y={pos.y}>
                  {/* <Rect
                    width={imageSize.width}
                    height={imageSize.height}
                    fill="red"
                  /> */}
                  <CanvasImage
                    // isSelected={selectedE}
                    // src={imageSelected}
                    rectWidth={imageSize.width}
                    rectHeight={imageSize.height}
                    onSelect={() => {
                      setSelectE("rect");
                    }}
                    colorRect={colorRect}
                    isSelected={selectedE === "rect"}
                  />
                </Layer>
                <Layer
                  x={pos.x}
                  y={pos.y}
                  // scale={{ x: 0, y: 0 }}
                >
                  {/* get multiple image ! */}
                  {/* <Group>{board}</Group> */}
                  {/* {imageSelected.map((src, index) => (
            <CanvasImage
              key={index}
              customKey={index}
              src={src}
              onSelect={() => {
                setSelectE(index);
              }}
              isSelected={selectedE === index}

              // shapeRef={(el) => (shapeRefs.current[index] = el)}
              // isSelected={selectedImage === index}
              // onSelect={() => onSelect(shapeRefs.current[index])}
              // onTransform={(newAttrs) => onTransform(index, newAttrs)}
            />
          ))} */}
                  {/* get once a time image ! */}

                  <CanvasImage
                    // isSelected={selectedE}
                    src={imageSelected}
                    // onSelect={setSelectE}
                    imageWidth={imageSize.width}
                    imageHeight={imageSize.height}
                    onSelect={() => {
                      setSelectE("image");
                    }}
                    isSelected={selectedE === "image"}
                  />
                </Layer>
              </Stage>
            )}
            {process && (
                  // <p>test</p>
                  <Stack
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    zIndex={"999"}
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
            {/* </Box> */}
          </Box>
          
        </Flex>
      </Container>
    </>
  );
}
