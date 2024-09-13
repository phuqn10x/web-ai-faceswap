// import { useEffect } from "react";
import { useEffect } from "react";
import ButtonUploadImage from "../../components/Buttons/ButtonUploadImage";
import Heros from "../../components/Heros";
import { useImage } from "../../Context/ImageContext";
// import HandleImageAdvanced from "./HandleImageAdvanced";
import HandleImageBasic from "./HandleImageBasic";

function HerosAI({ apiRequest, formDataFields, title, description, advanced }) {
  const { image, setImage, setAdvanced } = useImage();
  // useEffect(() => {
  //   if (image) {
  //     // console.log(image[0]);
  //   }
  // }, [image]);
  useEffect(() => {
    advanced ? setAdvanced(advanced) : setAdvanced(false);
  }, [location, setAdvanced, advanced]);
  return !image ? (
    <Heros
      title={title}
      description={description}
      ButtonElement={<ButtonUploadImage />}
    />
  ) : (
    <>
      {!advanced && (
        <HandleImageBasic
          image={image[0]}
          setImage={setImage}
          apiRequest={apiRequest}
          formDataFields={formDataFields}
          // setOption={setOptions}
        />
      )}
    </>
  );
}

export default HerosAI;
