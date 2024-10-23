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
        index: true, // นี่จะตรงกับเส้นทางราก '/'
        element: <App />,
      },
      {
        path: "login", // ลบสแลชนำหน้าออก
        element: <Login />,
      },
      {
        path: "register", // ลบสแลชนำหน้าออก
        element: <Register />,
      },
      {
        path: "add", // ลบสแลชนำหน้าออก
        element: <AddStore />,
      },
      {
        path: "edit-store/:id", // ลบสแลชนำหน้าออก
        element: <EditStore />,
      },
    ],
  },
]);

export default router;
