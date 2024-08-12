import http from "../lib/http";

const authApiRequest = {
  login: async (email, password, type, avatar) =>
    await http.get(`/v1/account/login`, {
      params: {
        email: email,
        password: password,
        type: type,
        ...(avatar && { avatar: avatar }),
      },
    }),
  signUp: async (body) => await http.post("/v1/account/sign-up", body),
  verifyEmail: async (email) =>
    await http.get(`/v1/account/send-code-signup`, {
      params: { email: email },
    }),
  codeForgotPassword: async (email) =>
    await http.get(`v1/account/forgot-password`, { params: { email: email } }),
  checkCodeForgotPassword: async (email, verificationCode) =>
    await http.get(`v1/account/check-code-forgot-password`, {
      params: { email: email, code: verificationCode },
    }),
  changePassword: async (email, password, verificationCode) =>
    await http.put(
      `v1/account/change-password`,
      { password: password, code: verificationCode },
      { params: { email: email } }
    ),
};

export default authApiRequest;
