import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/page.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./app/register/page.tsx";
import Login from "./app/login/page.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import Dashboard from "./app/(dashboard)/dashboard/page.tsx";
import Layout from "./app/(dashboard)/layout.tsx";
import Timer from "./app/timer/page.tsx";

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
              { path: "timer", element: <Timer /> },
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
