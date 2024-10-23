import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Pages/Mainlayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddStore from "../Pages/AddStore";
import EditStore from "../Pages/editStore";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "add",
        element: <AddStore />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <App />,
      },
      {
        path: "edit-store/:id",
        element: <EditStore />,
      },
    ],
  },
]);

export default router;
