import http from "../lib/http";

const imageHandler = {
  // getHDimage: async (result) => {
  //   const response = await http.get(result.replace("temp", "original"), {
  //     baseUrl: import.meta.env.VITE_API_ENDPOINT_IMAGE,
  //   });
  //   if (!response.error) {
  //     return new Blob([response.payload], { type: "image/png" });
  //   } else {
  //     return response;
  //   }
  // },
  getProcessedQueue: async (id) => await http.get(`tools/get-by-id/${id}`),
};

export default imageHandler;
