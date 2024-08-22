import axios from "axios";
import {
  calculateImageMd5,
  decrypt,
  encryptController,
  encryptMd5,
  normalizePath,
} from "./utils";
import userApiRequest from "../apiRequest/user";
// import { useDispatch } from "react-redux";
// import store from "../redux/store/store";
// import { Logout, logout } from "../redux/Reducer/auth";
// import store from "../redux/store/store";

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

// let LogoutRequest = null;
// export const isClient = () => typeof window !== "undefined";
/*global process*/
const request = async (method, url, options) => {
  let body = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders =
    body instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {
          "Content-Type": "application/json",
        };

  const user = localStorage.getItem("tokenUser");
  // const sessionToken = user ? JSON.parse(user).jwt : null;
  if (user) {
    baseHeaders["Authorization"] = `Bearer ${user}`;
    console.log("Authorization", baseHeaders["x-access-token"]);
  }
  // console.log(
  //   "import.meta.env.VITE_API_ENDPOINT_USER",
  //   import.meta.env.VITE_API_ENDPOINT_USER
  // );
  const baseUrl = options?.baseUrl ?? import.meta.env.VITE_API_ENDPOINT_USER;

  options?.baseUrl === import.meta.env.VITE_API_ENDPOINT_AI &&
    (baseHeaders["Content-Type"] = "multipart/form-data");
  console.log("options", options);
  console.log("url", url);
  if (
    options?.baseUrl === import.meta.env.VITE_API_ENDPOINT_AI &&
    options?.body
  ) {
    let { image_original, ...rest } = options.body;
    let image_md5 = image_original;
    image_md5 = await calculateImageMd5(image_md5);
    const dataEncrypt = encryptController(image_md5, rest);
    // console.log("data chưa mã hóa là", image_original, rest);

    // const data = {
    //   image_original: image_original,
    //   data: dataEncrypt,
    // };
    const formData = new FormData();
    formData.append("image_original", image_original);
    formData.append("data", dataEncrypt);
    // console.log(data);
    // options.body = data;
    body = formData;
  }
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  console.log(fullUrl);

  console.log("param", options?.params);
  if (options?.baseUrl === import.meta.env.VITE_API_ENDPOINT_AI) {
    console.log("body", options?.body);
    console.log("test");
  }
  try {
    const data = {
      method,
      url: fullUrl,
      headers: {
        // "accept-language": localStorage.getItem("language") || "en",
        // 'Content-Type': 'multipart/form-data',
        ...baseHeaders,
        ...options?.headers,
      },
      params: options?.params,

      data: body,
    };
    console.log("data", data);
    const res = await axios(data);
    const payload = res.data;
    console.log("payload", {
      status: res.status,
      payload,
    });

    // handleResponse(url, payload);
    if (
      options?.baseUrl === import.meta.env.VITE_API_ENDPOINT_AI &&
      options?.body
    ) {
      console.log(payload);
      
      const dataDecript = decrypt(payload);
      console.log("dataDecript", dataDecript);
    }
    return {
      status: res.status,
      payload,
    };
  } catch (error) {
    let status = 502;
    let errorMessage = error.message;
    console.log("error", error);
    if (error.message === "Network Error") {
      // console.log("error1", error);
      errorMessage = "Server is not available. Please try again later.";
    }
    if (error.response) {
      console.log("error2", error);

      errorMessage = error.response.data.message ?? error.response.statusText;
      if (error.response.status) {
        status = error.response.status;
        // console.log("hi", error.response.status);
        if (error.response.status >= 400) {
          if (error.response.status === ENTITY_ERROR_STATUS) {
            status = error.response.status;
          } else if (error.response.status === AUTHENTICATION_ERROR_STATUS) {
            handleAuthenticationError(baseHeaders, baseUrl);
          } else {
            status = error.response.status;
          }
        }
      }
    }

    const data = {
      status: status,
      error: errorMessage,
    };

    console.log("data error", data);
    return data;
  }
};
const handleAuthenticationError = async (baseHeaders, endpoint) => {
  console.log("baseHeaders", baseHeaders.length);
  const { GetToken } = userApiRequest;

  if (!baseHeaders.length) {
    console.log("Generate token");

    const response = await GetToken();

    console.log("response token", response.payload);
    localStorage.setItem("tokenUser", response.payload);
  }
  // if (baseHeaders["x-access-token"] === null) {
  //   const token = await userApiRequest.GetToken();
  //   console.log("token", token);

  //   // localStorage.setItem("userInfoBasic", JSON.stringify(token));
  // } else {
  //   // localStorage.removeItem("userInfoBasic");
  // }
  // dispatch(authError());
  // store.dispatch(Logout());
  // endpoint === import.meta.env.VITE_API_ENDPOINT_IMAGE
  //   ? (window.location.href = "/login")
  //   : (baseHeaders["x-access-token"] = null && (window.location.href = "/"));

  // console.log("baseHeaders", baseHeaders);
  // localStorage.removeItem("userInfoBasic");
};

// const handleResponse = (url, payload) => {
//   if (["/login", "/register"].some((item) => item === normalizePath(url))) {
//     const { token, expiresAt } = payload.data || {};
//     if (token && expiresAt) {
//       localStorage.setItem("sessionToken", token);
//       localStorage.setItem("sessionTokenExpiresAt", expiresAt);
//     }
//   } else if ("/logout" === normalizePath(url)) {
//     localStorage.removeItem("sessionToken");
//     localStorage.removeItem("sessionTokenExpiresAt");
//   }
// };

const http = {
  get(url, options) {
    // console.log("login", url, password);
    return request("GET", url, options);
  },
  post(url, body, options) {
    return request("POST", url, { ...options, body });
  },
  put(url, body, options) {
    return request("PUT", url, { ...options, body });
  },
  delete(url, options) {
    return request("DELETE", url, { ...options });
  },
};

export default http;
