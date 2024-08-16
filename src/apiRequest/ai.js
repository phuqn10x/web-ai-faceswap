import http from "../lib/http";
// const formData = new FormData();

/*global process*/
// const baseUrl = import.meta.env.VITE_API_ENDPOINT_AI;
const aiApiRequest = {
  // enhancer: async (formData) =>
  //   await http.post(`v1/tools/enhance_image`, formData, {
  //     baseUrl: baseUrl,
  //   }),
  // ageTransform: async (formData) =>
  //   await http.post(`v1/tools/predict_age`, formData, {
  //     baseUrl: baseUrl,
  //   }),
  // removeBackground: async (formData) =>
  //   await http.post(`v1/tools/remove_background`, formData, {
  //     baseUrl: baseUrl,
  //   }),

  // removeText: async (formData) =>
  //   await http.post(`v1/tools/text_remover`, formData, {
  //     baseUrl: baseUrl,
  //   }),

  // artTransform: async (formData) =>
  //   await http.post(`v1/tools/predict_art`, formData, {
  //     baseUrl: baseUrl,
  //   }),

  // sketch: async (formData) =>
  //   await http.post(`v1/tools/predict_sketch_be`, formData, {
  //     baseUrl: baseUrl,
  //   }),
  art: async (formData) =>
    await http.post(`/tools/predict-art`, formData, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  artStyle: async () =>
    await http.get(`/tools/predict-art`, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  sketch: async (formData) =>
    await http.post(`/tools/predict-sketch`, formData, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  age: async (formData) =>
    await http.post(`/tools/predict-age`, formData, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  changeSky: async (formData) =>
    await http.post(`/tools/change-sky`, formData, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  changeSkyStyle: async () =>
    await http.get(`/tools/change-sky`, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  enhance: async (formData) =>
    await http.post(`/tools/enhance-image`, formData, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
  textRemove: async (formData) =>
    await http.post(`/tools/text-remover`, formData, {
      baseUrl: import.meta.env.VITE_API_ENDPOINT_AI,
    }),
};

export default aiApiRequest;
