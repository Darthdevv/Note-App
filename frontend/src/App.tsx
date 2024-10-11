import Home from "./pages/Home/Home";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Error from "./pages/Error/Error";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import "preline/preline";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "*",
          element: <Error />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
