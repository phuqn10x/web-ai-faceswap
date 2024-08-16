// import { jwtDecode } from "jwt-decode";
// import { twMerge } from "tailwind-merge";
// import { clsx } from "clsx";
// import { useSelector } from "react-redux";
// import { selectData } from "../redux/Reducer/auth";
// import { useTranslation as originalUseTranslation } from "react-i18next";
//
// export const decodeJWT = (token) => {
//   return jwtDecode(token);
// };
// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }
import CryptoJS from "crypto-js";
export const normalizePath = (path) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

// export const useUserData = () => {
//   const user = useSelector(selectData);
//   return user;
// };

// Nhận tất cả namespaces cần dịch và trả về hàm t useT.t
// có thể Destructuring t từ useT như này { t } = useT("namespace1", "namespace2");
// export const useT = (...namespaces) => {
//   // useT nhận tất cả namespaces cần dịch
//   const { t: originalT } = originalUseTranslation();
//   // Destructuring t từ originalUseTranslation
//   const t = (key, ...args) => {
//     // lấy key và các args
//     for (let namespace of namespaces) {

//       // lặp qua các namespaces để xem key cần dịch có nằm trong namespace nào không ?
//       const translation = originalT(`${namespace}.${key}`, ...args);
//       // dịch key trong namespace cùng với các args
//       if (translation !== `${namespace}.${key}`) {
//         // check xem key cần dịch có giá trị dịch không ?
//         // kiểm tra nếu hàm translation khác với `${namespace}.${key}` thì trả về translation (giá trị dịch)
//         // vd:
//         // Get Started !== homepage.base2.button_start.title (có giá trị dịch)
//         // homepage.base2.button_start.title === homepage.base2.button_start.title (không có giá trị dịch)
//         return translation;
//       }
//     }
//     // console.log(`${namespaces}`);
//     // console.log("key", key,...args);
//     return originalT(key, ...args);
//     // còn nếu key cần dịch không nằm trong namespace nào thì trả về dịch chính key đó
//   };
//   return { t };
// };

export const handleErrorApi = ({ error, setError }) => {
  if (error) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  }
  // else {
  //   toast({
  //     title: "Lỗi",
  //     description: error?.payload?.message ?? "Lỗi không xác định",
  //     variant: "destructive",
  //     duration: duration ?? 5000,
  //   });
  // }
};
export const encrypt = (data) => {
  const key = CryptoJS.enc.Hex.parse(env.CRYPTO_RESPONSE_KEY); // 128-bit key
  const iv = CryptoJS.enc.Hex.parse(env.CRYPTO_RESPONSE_IV); // 128-bit IV
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
  }).toString();
  return ciphertext;
};

export const decrypt = (ciphertext) => {
  try {
    const key = CryptoJS.enc.Hex.parse(env.CRYPTO_REQUEST_KEY); // 128-bit key
    const iv = CryptoJS.enc.Hex.parse(env.CRYPTO_REQUEST_IV); // 128-bit IV
    const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  } catch (error) {
    return null;
  }
};

export const encryptMd5 = (fileBuffer) => {
  const wordArray = CryptoJS.lib.WordArray.create(fileBuffer);
  const hash = CryptoJS.MD5(wordArray).toString();
  return hash;
};
