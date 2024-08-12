import AiToolsLayout from "../Layout/AiToolsLayout";
import Enhander from "../pages/AiTools/Enhancer";
import Sketch from "../pages/AiTools/Sketch";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const routes = [
  { path: "/", component: Home },
  { path: "/ai-tools/enhancer", layout: AiToolsLayout, component: Enhander },
  { path: "/ai-tools/sketch", layout: AiToolsLayout, component: Sketch },
  { path: "*", component: NotFound },
  // { path: "/ai-tools/change-age", layout: AiToolsLayout, component: ChangeAge },
  // {
  //   path: "/ai-tools/remove-text",
  //   layout: AiToolsLayout,
  //   component: RemoveText,
  // },
  // { path: "/ai-tools/enhancer", layout: AiToolsLayout, component: Enhancer },
  // {
  //   path: "/ai-tools/remove-background",
  //   layout: AiToolsLayout,
  //   component: RemoveBackground,
  // },
];

export { routes };
