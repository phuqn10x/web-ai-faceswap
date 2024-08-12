import axios from "axios";
import { normalizePath } from "../lib/utils";
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
      ? {}
      : {
          "Content-Type": "application/json",
        };

  const user = localStorage.getItem("userInfoBasic");
  const sessionToken = user ? JSON.parse(user).jwt : null;
  if (sessionToken) {
    baseHeaders["x-access-token"] = `Bearer ${sessionToken}`;
    console.log("x-access-token", baseHeaders["x-access-token"]);
  }
  console.log(
    "process.env.REACT_APP_API_ENDPOINT_USER",
    process.env.REACT_APP_API_ENDPOINT_USER
  );
  const baseUrl = options?.baseUrl ?? process.env.REACT_APP_API_ENDPOINT_USER;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  console.log("param", options?.params);
  try {
    const data = {
      method,
      url: fullUrl,
      headers: {
        "accept-language": localStorage.getItem("language") || "en",
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
      // console.log("error2", error);

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
const handleAuthenticationError = (baseHeaders, endpoint) => {
  // dispatch(authError());
  // store.dispatch(Logout());
  endpoint === process.env.REACT_APP_API_ENDPOINT_IMAGE
    ? (window.location.href = "/login")
    : (baseHeaders["x-access-token"] = null && (window.location.href = "/"));

  // console.log("baseHeaders", baseHeaders);
  localStorage.removeItem("userInfoBasic");
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
