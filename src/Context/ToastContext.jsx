import { createContext, useContext } from "react";
import { useToast as chakraUseToast } from "@chakra-ui/react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toast = chakraUseToast();

  const showToast = (message, type = "success", position = "top-right") => {
    toast({
      title: message,
      status: type,
      duration: 2000,
      isClosable: true,
      position: position,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
