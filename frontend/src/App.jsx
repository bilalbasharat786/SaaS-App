import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaaSLayout from "./components/SaaSLayout";
import Login from "./pages/Login";
import RegisterTenant from "./pages/RegisterTenant";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ManageUsers from "./pages/ManageUsers";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterTenant />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<SaaSLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
