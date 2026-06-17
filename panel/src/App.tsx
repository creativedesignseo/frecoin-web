import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './store/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Servicios from './pages/Servicios';
import Contenido from './pages/Contenido';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Layout>
                <Leads />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/servicios"
          element={
            <ProtectedRoute>
              <Layout>
                <Servicios />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contenido"
          element={
            <ProtectedRoute>
              <Layout>
                <Contenido />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Las secciones restantes (blog, servicios, contenido, usuarios) se añaden por fases. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
