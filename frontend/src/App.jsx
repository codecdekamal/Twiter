import Homepage from "./components/Homepage/homepage";
import { createPortal } from "react-dom";
import Login from "./components/Login/login";
import Register from "./components/Login/Register";
import Logout from "./components/Login/logout";
import ProfilePage from "./components/Profile/ProfilePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/register", element: <Register /> },
  // { path: "/tweet", element: <Tweet /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/profilePage/:userID", element: <ProfilePage /> },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
