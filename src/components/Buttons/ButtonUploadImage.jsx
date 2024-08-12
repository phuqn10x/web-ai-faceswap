import { chakra, Icon } from "@chakra-ui/react";
import ButtonMain from "./ButtonMain";

// Import React FilePond
import { registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useRef } from "react";
import UploadImage from "../ui/UploadImage";
// import UploadIcon from "../../assets/icons/upload.svg";
import { ReactComponent as Logo  } from "../../assets/icons/upload.svg";
// import { useT } from "../../lib/utils";
const UploadIcon = chakra(Logo);
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function ButtonUploadImage({
  isDisabled,
  props,
  propsButton,
  colorIcon = "white",
}) {
  //   const { t } = useT("button_upload");
  const filePondRef = useRef(null);
  const handleUploadClick = () => {
    // console.log("test");
    
    if (filePondRef.current) {
      filePondRef.current.browse();
    }
  };
  return (
    <ButtonMain
      onClick={handleUploadClick}
      title={"Upload Image"}
      fontSize="26px"
      fontWeight="800"
      subTitle={"Drop, paste image, or URL"}
      props={{ h: "5rem", w: "300px" }}
      propsButton={{
        leftIcon: <Icon as={UploadIcon} boxSize={9} color={colorIcon} />,
        isDisabled: isDisabled,
        ...propsButton,
      }}
      {...props}
    >
      <UploadImage
        allowDrop={"false"}
        ref={filePondRef}
        allowBrowse
        instanceId="local"
        position="unset"
      />
    </ButtonMain>
  );
}

export default ButtonUploadImage;
