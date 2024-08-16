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
  Skeleton,
  SkeletonText,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FaArrowsAlt,
  FaFillDrip,
  FaImage,
  FaTextHeight,
  FaTint,
} from "react-icons/fa";
// import aiApiRequest from "../../apiRequest/ai";
// import ButtonMain from "../../components/Buttons/ButtonMain";
// import imageHandler from "../../apiRequest/imageHandler";
// import ScrollContainer from "cm-react-indiana-drag-scroll";
import "cm-react-indiana-drag-scroll/dist/style.css";
// import { ArtsStyleComponent } from "./Art";
const CanvasImage = ({
  src,
  onSelect,
  isSelected,
  rectWidth,
  rectHeight,
  imageWidth,
  imageHeight,
  editable,
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
          draggable={editable}
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
          draggable={editable}
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
export default function HandleImageAdvanced() {
  const canvasWidth = 1300;
  const canvasHeight = 810;
  const stageRef = useRef();
  const {
    image: imageContext,
    advanced,
    imageSelected,
    setImageSelected,
    loading,
  } = useImages();
  // const [imageSelected, setImageSelected] = useState([]);
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
  // const { artStyle, art } = aiApiRequest;
  // const { getProcessedQueue } = imageHandler;
  // const [styles, setStyles] = useState();
  // const [selected, setSelected] = useState("Images");

  // useEffect(() => {
  //   console.log("test");

  //   const getArtStyle = async () => {
  //     const response = await artStyle();
  //     if (!response.error) {
  //       console.log("response", response.payload);
  //       setStyles(response.payload);
  //     } else {
  //       throw response.error;
  //     }
  //   };
  //   getArtStyle();
  // }, []);
  // const [selectedStyle, setSelectedStyle] = useState();
  // const [idQueue, setIdQueue] = useState();
  // const handleSelectStyle = (styles) => {
  //   console.log("Selected style:", styles);
  //   setSelectedStyle(styles);
  //   // Thực hiện các hành động khác như cập nhật state hoặc gọi API.
  // };

  // const intervalIdRef = useRef(null);
  // const handleGenerate = async () => {
  //   setIdQueue(null);
  //   if (imageContext) {
  //     // console.log("imageSelected", imageSelected);
  //     console.log("Generating style:", selectedStyle);
  //     const formData = new FormData();
  //     // console.log("image", imageContext);
  //     formData.append("image_original", imageContext[0]);
  //     formData.append("style", selectedStyle);
  //     formData.append("seed_take", "-1");
  //     formData.append("face_strength", "0.8");
  //     formData.append("appid", "1");
  //     formData.append("country", "1");
  //     formData.append("device_id", "1");
  //     formData.append("tier", "0");
  //     // Append additional formData fields dynamically
  //     // if (formDataFields) {
  //     //   console.log("testing form");
  //     //   Object.entries(formData).forEach(([key, value]) => {
  //     //     formData.append(key, value);
  //     //   });
  //     // }
  //     // console.log(formData.entries());

  //     const response = await art(formData);
  //     setIdQueue(response.payload._id);
  //     // console.log("formData", formData);
  //   }
  //   // setSelectedStyle(style);
  //   // Thực hiện các hành động khác như cập nhật state hoặc gọi API.
  // };
  // const [process, setProcess] = useState(false);

  // useEffect(() => {
  //   const processQueue = async () => {
  //     if (idQueue) {
  //       setProcess(true);
  //       console.log("idQueue", idQueue);
  //       const response = await getProcessedQueue(idQueue);
  //       console.log("getProcessedQueue", response);
  //       intervalIdRef.current = setInterval(async () => {
  //         const response = await getProcessedQueue(idQueue);
  //         console.log("getProcessedQueue", response);
  //         if (response.payload) {
  //           setImageSelected(response.payload.result.url);
  //           clearInterval(intervalIdRef.current);
  //           setProcess(false);
  //         }
  //       }, 2000);
  //     }
  //   };
  //   processQueue();
  // }, [idQueue]);
  return (
    <>
      <Container p={0} maxW={"full"} h={"89.5vh"}>
        <Flex
          // justifyContent={"center"}

          w={"full"}
          h={"calc(100%)"}
        >
          <Flex
            // flex={"25%"}
            w={"456px"}
            p={2}
            flex-direction="column"
            flex-shrink="0"
            height={"auto"}
          >
            {/* <ArtsStyleComponent setImageSelected={setImageSelected} /> */}
            {advanced.tools}
          </Flex>
          {/* <Box> */}
          <Box
          // flex={"75%"}

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
                {advanced.editImage && (
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
                )}

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
                  {advanced.editImage ? (
                    <CanvasImage
                      // isSelected={selectedE}
                      src={imageSelected}
                      // onSelect={setSelectE}
                      imageWidth={imageSize.width}
                      imageHeight={imageSize.height}
                      onSelect={() => {
                        setSelectE("image");
                      }}
                      editable
                      isSelected={selectedE === "image"}
                    />
                  ) : (
                    <CanvasImage
                      // isSelected={selectedE}
                      src={imageSelected}
                      // onSelect={setSelectE}
                      imageWidth={imageSize.width}
                      imageHeight={imageSize.height}
                      // editable={}
                      // onSelect={() => {
                      //   setSelectE("image");
                      // }}
                      // isSelected={selectedE === "image"}
                    />
                  )}
                </Layer>
              </Stage>
            )}
            {loading && (
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
