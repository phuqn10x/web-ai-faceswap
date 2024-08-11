// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Mainlayout from "./Layout/index";
import { Fragment, useEffect } from "react";
import useFontFaceObserver from "use-font-face-observer";

function App() {
  const isFontLoaded = useFontFaceObserver([
    { family: "Mulish Variable" }, // Same name you have in your CSS
  ]);

  useEffect(() => {
    console.log("Is font loaded?", isFontLoaded);
  }, [isFontLoaded]);
  return (
    <div>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.component;
          let Layout = Mainlayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                isFontLoaded && (
                  <Layout>
                    <Page />
                  </Layout>
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
