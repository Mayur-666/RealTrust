import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminAuth from "./pages/AdminAuth";

function App() {
  return (
    <Routes>
      {/* <Route path="/test" element={< />} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin-auth" element={<AdminAuth />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="admin-page" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
