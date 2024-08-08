// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Mainlayout from "./Layout/index";
import { Fragment } from "react";
function App() {
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
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
