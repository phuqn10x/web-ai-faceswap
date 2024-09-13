import aiApiRequest from "../../../apiRequest/ai";
import HerosAI from "../HerosAI";

function Enhander() {
  const { enhance } = aiApiRequest;
  return (
    <>
      <HerosAI
        title={"Enhance Photos Quality online With AI"}
        description={
          "Elevate your images easily with SnapEdit's powerful AI Photo Enhancer feature"
        }
        apiRequest={enhance}
      />
    </>
  );
}

export default Enhander;
