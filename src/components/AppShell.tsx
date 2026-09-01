import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ToastViewport from '@/components/ToastViewport';
import { useAuth } from '@/context/AuthContext';

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { profile, user } = useAuth();

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url || '';
  const initials = getInitials(displayName);

  return (
    <div className="relative min-h-screen bg-ink-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink-200/60 bg-ink-50/85 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <div className="relative hidden flex-1 sm:block sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              placeholder="Search projects, skills, insights…"
              className="w-full rounded-full border border-ink-200 bg-white py-2 pl-9 pr-4 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              aria-label="Search"
            />
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
            <button
              onClick={() => navigate('/setup')}
              className="btn-primary btn-sm hidden sm:inline-flex"
            >
              <Plus className="h-4 w-4" />
              New Analysis
            </button>
            <button
              className="relative rounded-full p-2 text-ink-600 hover:bg-ink-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral-500 ring-2 ring-ink-50" />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold text-white overflow-hidden"
              aria-label="Your profile"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>
      </div>

      <ToastViewport />
    </div>
  );
}
