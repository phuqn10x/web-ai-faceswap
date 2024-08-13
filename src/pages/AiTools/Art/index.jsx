import aiApiRequest from "../../../apiRequest/ai";
import HerosAI from "../HerosAI";

function Art() {
  const { art } = aiApiRequest;
  return (
    <>
      <HerosAI
        title={"AI Art Generator"}
        description={
          "Effortlessly turn your photos into masterpieces with FaceSwap AI portrait generator, creating personalized, eye-catching portraits in just a few seconds."
        }
        apiRequest={art}
        advanced
      />
    </>
  );
}

export default Art;
