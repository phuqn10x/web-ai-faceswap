import http from "../lib/http";
// const formData = new FormData();

/*global process*/
const aiApiRequest = {
  enhancer: async (formData) =>
    await http.post(`v1/tools/enhance_image`, formData, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_AI,
    }),
  ageTransform: async (formData) =>
    await http.post(`v1/tools/predict_age`, formData, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_AI,
    }),
  removeBackground: async (formData) =>
    await http.post(`v1/tools/remove_background`, formData, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_AI,
    }),

  removeText: async (formData) =>
    await http.post(`v1/tools/text_remover`, formData, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_AI,
    }),

  artTransform: async (formData) =>
    await http.post(`v1/tools/predict_art`, formData, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_AI,
    }),

  sketch: async (formData) =>
    await http.post(`v1/tools/predict_sketch_be`, formData, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_AI,
    }),
};

export default aiApiRequest;
