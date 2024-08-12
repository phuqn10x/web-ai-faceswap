// import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme/customTheme.jsx";
import App from "./App.jsx";
import { ToastProvider } from "./Context/ToastContext.jsx";
import { ToastContainer } from "react-toastify";

import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "nprogress/nprogress.css";
import "./theme/nprogress.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <ChakraProvider theme={customTheme}>
    <ToastProvider>
      <ToastContainer />
      <Router>
        <App />
      </Router>
    </ToastProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
