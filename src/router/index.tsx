import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import Styles from "@/styles";
import useAuthContext from "@/store/authContext";
import useModalContext from "@/store/modalContext";

const App = lazy(() => import("@/pages/app"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const Loading = lazy(() => import("@/pages/loading"));
const NotFound = lazy(() => import("@/pages/404"));

const Router = () => {
  const {isAuthenticated} = useAuthContext();
  const {isModalOpen} = useModalContext();

  const PublicRouter = () =>
    !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  const PrivateRoutes = () =>
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

  return (
    <BrowserRouter>
      <Styles isModalOpen={isModalOpen} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicRouter />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<App />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
