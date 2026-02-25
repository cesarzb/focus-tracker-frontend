import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <App /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [],
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
