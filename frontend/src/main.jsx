import React from "react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sendmoney from "./pages/Sendmoney.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedroute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/send"
        element={
          <ProtectedRoute>
            <Sendmoney />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
