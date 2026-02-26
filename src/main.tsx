import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Layout from "./components/Layout/Layout.tsx";
import Hourglass from "./components/Hourglass/Hourglass.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <App /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "timer", element: <Hourglass /> },
            ],
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
