import aiApiRequest from "../../../apiRequest/ai";
import HerosAI from "../HerosAI";

function Sketch() {
  const { sketch } = aiApiRequest;

  return (
    <>
      <HerosAI
        title={"AI Sketch"}
        description={
          "Effortlessly turn your photos into masterpieces with FaceSwap AI portrait generator, creating personalized, eye-catching portraits in just a few seconds."
        }
        apiRequest={sketch}
       
      />
    </>
  );
}

export default Sketch;
