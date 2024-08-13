import {
  ImageProvider,
  useImage,
  //  useImage
} from "../../Context/ImageContext";
import UploadImage from "../../components/ui/UploadImage";
import HandleImageAdvanced from "../../pages/AiTools/HandleImageAdvanced";
import AdvancedOptLayout from "../AdvancedOtpLayout";
import MainLayout from "../MainLayout";
// import backgroundImage from "../../../assets/images/enhancer_bg.png";
// import HandleImageAdvanced from "../../../pages/AiTools/HandleImageAdvanced";
// import AdvancedOptLayout from "../AdvancedOptLayout";

function AiToolsLayout({ children }) {
  const { advanced, image } = useImage();

  return advanced && image ? (
    <AdvancedOptLayout>
      <HandleImageAdvanced />
    </AdvancedOptLayout>
  ) : (
    // children
    <MainLayout>
      <>{children}</>
    </MainLayout>
  );
}

export default function WrappedAiToolsLayout(props) {
  const boxStyles = {
    ".filepond--root": {
      height: "100% !important",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    ".filepond--wrapper": {
      height: "100%",
      width: "100%",
    },
    ".filepond--root .filepond--panel-root": {
      backgroundColor: "transparent",
    },
    ".filepond--root .filepond--list": {
      display: "none",
    },
    ".filepond--root .filepond--drop-label": {
      height: "100%",
    },
    ".filepond--root.filepond--drag-over .filepond--panel-root": {
      border: "2px dashed #438ff9",
      backgroundColor: "rgba(67, 143, 249, 0.5)",
    },
    ".filepond--root .filepond--credits": {
      display: "none",
    },
  };
  return (
    <ImageProvider>
      <UploadImage
        allowBrowse="false"
        allowPaste="true"
        // allowDrop="false"
        boxStyles={boxStyles}
        title={"Drop here !"}
        global
        instanceId="global"
      />
      <AiToolsLayout {...props} />
    </ImageProvider>
  );
}
