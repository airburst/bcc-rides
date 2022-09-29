import { lazy } from "react";
import {
  createBrowserRouter,
  Route,
} from "react-router-dom";

const Home = lazy(() => import('./pages/Home'));
// const UserProfile = lazy(() => import('./pages/UserProfile'));
const Admin = lazy(() => import('./pages/Admin'));
const Logout = lazy(() => import('./pages/Logout'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;