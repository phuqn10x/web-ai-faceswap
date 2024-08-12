import { Box, Text } from "@chakra-ui/react";
import { FilePond, registerPlugin } from "react-filepond";
import { forwardRef, useEffect, useState } from "react";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useToast } from "../../Context/ToastContext";
import { useImage } from "../../Context/ImageContext";

registerPlugin(FilePondPluginFileValidateType);

const UploadImage = forwardRef(
  (
    {
      allowPaste = false,
      allowBrowse = false,
      allowMultiple = false,
      global,
      position = "fixed",
      labelIdle = "",
      title,
      allowDrop = true,
      boxStyles,
      instanceId,
    },
    ref
  ) => {
    const { setImage } = useImage([]);
    const [isDragging, setIsDragging] = useState(false);
    const [visible, setVisible] = useState(false);
    const { showToast } = useToast();
    const [localImages, setLocalImages] = useState({});
    useEffect(() => {
      setLocalImages(false);
    }, [localImages]);

    useEffect(() => {
      if (isDragging) {
        setVisible(true);
      } else {
        const timer = setTimeout(() => {
          setVisible(false);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [isDragging]);

    useEffect(() => {
      if (global) {
        const handleDragEnter = () => {
          setIsDragging(true);
        };

        const handleDragOver = (event) => {
          event.preventDefault();
        };

        const handleDragLeave = (event) => {
          if (
            event.relatedTarget === null ||
            event.relatedTarget.nodeName === "HTML"
          ) {
            setIsDragging(false);
          }
        };

        const handleDrop = () => {
          setIsDragging(false);
        };

        document.body.addEventListener("dragenter", handleDragEnter);
        document.body.addEventListener("dragover", handleDragOver);
        document.body.addEventListener("dragleave", handleDragLeave);
        document.body.addEventListener("drop", handleDrop);

        return () => {
          document.body.removeEventListener("dragenter", handleDragEnter);
          document.body.removeEventListener("dragover", handleDragOver);
          document.body.removeEventListener("dragleave", handleDragLeave);
          document.body.removeEventListener("drop", handleDrop);
        };
      } else {
        setIsDragging(true);
        setVisible(false);
      }
    }, [global]);
    // var i = 0;
    const handleAddFile = (error, fileItem) => {
      if (error) {
        showToast("File type not accepted !", "error");
        return;
      }
      const fileType = fileItem.file.type;
      const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];
      if (acceptedTypes.includes(fileType)) {
        setLocalImages((prevImages) => ({
          ...prevImages,
          [instanceId]: [...(prevImages[instanceId] ?? []), fileItem.file],
        }));
        if (!allowMultiple) {
          setImage([fileItem.file]);
        } else {
          setImage((prevImages) => [...(prevImages ?? []), fileItem.file]);
        }
        // console.log("setImage", [fileItem.file]);
      } else {
        showToast(`File type not accepted ! ${fileType}`, "error");
      }
    };

    return (
      <Box
        w="100%"
        h="100%"
        position={position}
        opacity={isDragging ? 1 : 0}
        zIndex={4}
        visibility={visible ? "visible" : "hidden"}
        transition="opacity 0.2s ease"
        display={global ?? "none"}
        __css={boxStyles}
      >
        <FilePond
          ref={ref}
          acceptedFileTypes={["image/*"]}
          files={localImages[instanceId] ?? []}
          onaddfile={handleAddFile}
          allowDrop={allowDrop}
          dropOnPage={allowDrop}
          dropOnElement={allowDrop}
          allowPaste={allowPaste}
          allowBrowse={allowBrowse}
          allowFileTypeValidation
          allowImagePreview={false}
          styleItemPanelAspectRatio={0}
          imagePreviewHeight={0}
          name="files"
          labelIdle={labelIdle}
          // maxFiles={5}
          // allowMultiple={allowMultiple} // Allow multiple files
        />

        <Box mx="auto">
          <Text
            textAlign="center"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontSize={"40px"}
            fontWeight={"800"}
            color={"white"}
            pointerEvents="none"
            zIndex={5}
          >
            {title}
          </Text>
          <Box
            mt={4}
            zIndex={6}
            textAlign="center"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontSize={"40px"}
            fontWeight={"800"}
            color={"white"}
            pointerEvents="none"
          ></Box>
        </Box>
      </Box>
    );
  }
);

export default UploadImage;
