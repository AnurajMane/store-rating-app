import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import StoreOwnerDashboard from "../pages/StoreOwnerDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
              ]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute
              allowedRoles={[
                "USER",
              ]}
            >
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store-owner"
          element={
            <ProtectedRoute
              allowedRoles={[
                "STORE_OWNER",
              ]}
            >
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;