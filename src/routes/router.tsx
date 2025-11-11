import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "./Home";
import Projects from "./Projects";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/proyectos", element: <Projects /> },
    ],
  },
]);

export default router;