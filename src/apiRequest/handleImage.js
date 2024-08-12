import http from "../lib/http";

const handleImage = {
  getHDimage: async (result) => {
    const response = await http.get(result.replace("temp", "original"), {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_IMAGE,
    });
    if (!response.error) {
      return new Blob([response.payload], { type: "image/png" });
    } else {
      return response;
    }
  },
};

export default handleImage;
