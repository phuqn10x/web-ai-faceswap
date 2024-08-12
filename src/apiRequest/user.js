import http from "../lib/http";

const userApiRequest = {
  GetInfoUser: async () => await http.get(`/v1/account/info`),
  UpdateUser: async (body) => await http.put(`/v1/account/info`, body),
  ChangePassword: async (password, comfirmPassword) =>
    await http.put(`/v1/account/update-password`, {
      password: password,
      confirm_password: comfirmPassword,
    }),
  DeleteUser: async () => await http.put(`/v1/account/delete-account`),
  UpdateAvatar: async (body) =>
    await http.post(`v1/amopics/avatar`, body, {
      baseUrl: process.env.REACT_APP_API_ENDPOINT_IMAGE,
    }),
};

export default userApiRequest;
