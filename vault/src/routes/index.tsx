import { createBrowserRouter, Outlet } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const router = createBrowserRouter([
  {
    element: (
      <Outlet />
    ),
    children: [
      ...protectedRoutes,
      ...publicRoutes
    ]
  }
]);
