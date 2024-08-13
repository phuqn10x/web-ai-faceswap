import http from "../lib/http";

const userApiRequest = {
  // GetInfoUser: async () => await http.get(`/v1/account/info`),
  // UpdateUser: async (body) => await http.put(`/v1/account/info`, body),
  // ChangePassword: async (password, comfirmPassword) =>
  //   await http.put(`/v1/account/update-password`, {
  //     password: password,
  //     confirm_password: comfirmPassword,
  //   }),
  // DeleteUser: async () => await http.put(`/v1/account/delete-account`),
  // UpdateAvatar: async (body) =>
  //   await http.post(`v1/amopics/avatar`, body, {
  //     baseUrl: import.meta.env.VITE_API_ENDPOINT_IMAGE,
  //   }),

  GetToken: async () =>
    await http.post(`/account/get-token`, {
      signature: "tsNRDPGv9T5qRMeHwDTSWdsGyJc=",
      package_name: "com.facechanger.agingapp.futureself",
      device_id: "iphone_12_ios15.0_legit_notfake1102",
      firebase_token: "firebase_fromphu",
      os: "web",
    }),
};

export default userApiRequest;
