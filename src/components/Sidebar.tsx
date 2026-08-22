import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanSearch,
  Sparkles,
  AlertTriangle,
  ListChecks,
  FolderKanban,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const mainNav = [
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard, accent: 'text-ink-600' },
  { to: '/brand-audit', label: 'Brand Audit', Icon: ScanSearch, accent: 'text-brand-600' },
  { to: '/story-mining', label: 'Story Mining', Icon: Sparkles, accent: 'text-pink-600' },
  { to: '/gap-analysis', label: 'Gap Analysis', Icon: AlertTriangle, accent: 'text-coral-600' },
  { to: '/action-plan', label: 'Action Plan', Icon: ListChecks, accent: 'text-mustard-600' },
];

const secondaryNav = [
  { to: '/projects', label: 'Projects', Icon: FolderKanban, accent: 'text-sky-600' },
  { to: '/profile', label: 'Profile', Icon: UserIcon, accent: 'text-mint-600' },
  { to: '/settings', label: 'Settings', Icon: SettingsIcon, accent: 'text-ink-500' },
];

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
  const displayRole = profile?.role || profile?.career_focus || '';
  const avatarUrl = profile?.avatar_url || '';
  const initials = getInitials(displayName);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-ink-200 bg-ink-50 transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="orb h-8 w-8" aria-hidden="true" />
            <span className="font-display text-lg font-bold tracking-tight text-ink-950">
              BRAND<span className="text-brand-600">LENS</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-200 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Primary">
          <p className="section-label px-3 pb-2 pt-3">Analyze</p>
          <ul className="space-y-0.5">
            {mainNav.map(({ to, label, Icon, accent }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-brand-600 text-white shadow-soft'
                        : 'text-ink-600 hover:bg-white hover:text-ink-900 hover:shadow-soft'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-white' : accent, 'group-hover:accent-current')} />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mx-3 my-4 border-t border-ink-200" />

          <p className="section-label px-3 pb-2">Library</p>
          <ul className="space-y-0.5">
            {secondaryNav.map(({ to, label, Icon, accent }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-white text-ink-950 shadow-soft'
                        : 'text-ink-600 hover:bg-white hover:text-ink-900 hover:shadow-soft'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-brand-600' : accent)} />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User card */}
        <div className="border-t border-ink-200 p-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-2.5 py-2 shadow-soft">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="h-10 w-10 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-950">{displayName}</p>
              <p className="truncate text-xs text-ink-500">{displayRole || user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-coral-600"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
