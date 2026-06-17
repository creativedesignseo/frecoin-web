import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard, FileText, Wrench, Type, Inbox, Users, LogOut, Menu, X,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';

interface NavItem { label: string; to: string; icon: typeof LayoutDashboard; soon?: boolean; superOnly?: boolean; }

const NAV: NavItem[] = [
  { label: 'Inicio', to: '/', icon: LayoutDashboard },
  { label: 'Blog', to: '/blog', icon: FileText, soon: true },
  { label: 'Servicios', to: '/servicios', icon: Wrench, soon: true },
  { label: 'Contenido', to: '/contenido', icon: Type, soon: true },
  { label: 'Leads', to: '/leads', icon: Inbox },
  { label: 'Usuarios', to: '/usuarios', icon: Users, soon: true, superOnly: true },
];

export function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const items = NAV.filter((n) => !n.superOnly || user?.role === 'super_admin');

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="mb-6 px-2">
        <span className="text-lg font-extrabold tracking-tight text-brand">FRECOIN</span>
        <p className="text-xs text-white/50">Panel de administración</p>
      </div>
      {items.map((n) => {
        const active = location.pathname === n.to;
        return (
          <Link
            key={n.to}
            to={n.soon ? location.pathname : n.to}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? 'bg-brand text-brand-ink' : 'text-white/70 hover:bg-white/10 hover:text-white'
            } ${n.soon ? 'cursor-default opacity-50' : ''}`}
          >
            <n.icon className="h-4.5 w-4.5" />
            <span className="flex-1">{n.label}</span>
            {n.soon && <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase">pronto</span>}
          </Link>
        );
      })}
      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="px-2 pb-3 text-xs text-white/60">
          <div className="font-semibold text-white/90">{user?.name || user?.email}</div>
          <div>{user?.role === 'super_admin' ? 'Super administrador' : 'Administrador'}</div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5" /> Cerrar sesión
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex h-full">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 bg-brand-ink md:block">{sidebar}</aside>

      {/* Sidebar móvil */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-brand-ink">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-neutral-200 bg-white px-4 md:px-6">
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu className="h-6 w-6" />
          </button>
          {open && <X className="h-6 w-6 md:hidden" onClick={() => setOpen(false)} />}
          <span className="text-sm font-semibold text-neutral-500">frecoin.es</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
