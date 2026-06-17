import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, setCsrf, type AdminUser } from '../lib/api';

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Al montar, revalida la sesión existente (cookie) contra la BD.
  useEffect(() => {
    let active = true;
    api.whoami()
      .then((res) => { if (active) { setUser(res.user); setCsrf(res.csrf); } })
      .catch(() => { if (active) { setUser(null); setCsrf(null); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    setCsrf(res.csrf);
    setUser(res.user);
  };

  const logout = async () => {
    try { await api.logout(); } finally {
      setCsrf(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
