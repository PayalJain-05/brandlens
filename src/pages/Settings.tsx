import { useState } from 'react';
import { User, Sliders, Plug, Bell, Shield, Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';
import { useAuth } from '@/context/AuthContext';

const sections = [
  { key: 'account', label: 'Account', Icon: User },
  { key: 'preferences', label: 'Profile preferences', Icon: Sliders },
  { key: 'sources', label: 'Connected sources', Icon: Plug },
  { key: 'notifications', label: 'Notifications', Icon: Bell },
  { key: 'privacy', label: 'Privacy', Icon: Shield },
  { key: 'appearance', label: 'Appearance', Icon: Palette },
] as const;

type Key = (typeof sections)[number]['key'];

export default function Settings() {
  const [active, setActive] = useState<Key>('account');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [theme, setTheme] = useState<'light' | 'system'>('light');
  const { profile, user } = useAuth();

  const displayName = profile?.name || '';
  const email = profile?.email || user?.email || '';
  const role = profile?.role || '';
  const careerFocus = profile?.career_focus || '';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 lg:text-4xl">Settings</h1>
        <p className="mt-2 text-ink-600">Manage your account and how BrandLens behaves.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Section nav */}
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Settings sections">
          {sections.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                'flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                active === key ? 'bg-ink-950 text-white shadow-soft' : 'text-ink-600 hover:bg-ink-100'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <div className="card p-6 sm:p-8">
          {active === 'account' && (
            <div className="space-y-5">
              <h2 className="font-display text-lg font-semibold text-ink-950">Account</h2>
              <div>
                <label className="label" htmlFor="name">Full name</label>
                <input id="name" className="input" defaultValue={displayName} />
              </div>
              <div>
                <label className="label" htmlFor="email">Email</label>
                <input id="email" type="email" className="input" defaultValue={email} readOnly />
              </div>
              <button onClick={() => toast('Account saved', 'success')} className="btn-primary">Save changes</button>
            </div>
          )}

          {active === 'preferences' && (
            <div className="space-y-5">
              <h2 className="font-display text-lg font-semibold text-ink-950">Profile preferences</h2>
              <div>
                <label className="label" htmlFor="role">Professional role</label>
                <input id="role" className="input" defaultValue={role} />
              </div>
              <div>
                <label className="label" htmlFor="focus">Primary focus</label>
                <select id="focus" className="input">
                  <option>Data Science</option>
                  <option>Product Analytics</option>
                  <option>Business Intelligence</option>
                </select>
              </div>
              <button onClick={() => toast('Preferences saved', 'success')} className="btn-primary">Save</button>
            </div>
          )}

          {active === 'sources' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink-950">Connected sources</h2>
              <p className="text-sm text-ink-500">Your sources are managed through the upload page.</p>
            </div>
          )}

          {active === 'notifications' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink-950">Notifications</h2>
              {[
                { label: 'Email notifications', desc: 'New analysis results and weekly tips', value: emailNotifs, set: setEmailNotifs },
                { label: 'Push notifications', desc: 'Reminders for your action plan', value: pushNotifs, set: setPushNotifs },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-xl border border-ink-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink-800">{row.label}</p>
                    <p className="text-xs text-ink-400">{row.desc}</p>
                  </div>
                  <button
                    onClick={() => { row.set(!row.value); toast(row.value ? 'Notifications off' : 'Notifications on', 'default'); }}
                    className={cn('relative h-6 w-11 rounded-full transition-colors', row.value ? 'bg-ink-950' : 'bg-ink-300')}
                    role="switch"
                    aria-checked={row.value}
                  >
                    <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform', row.value ? 'translate-x-[22px]' : 'translate-x-0.5')} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {active === 'privacy' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink-950">Privacy</h2>
              <p className="text-sm text-ink-600">Your data is only used to analyze your professional identity. We never scrape LinkedIn.</p>
              <button onClick={() => toast('Request submitted', 'success')} className="btn-secondary">Download my data</button>
              <button onClick={() => toast('Account deletion requires confirmation', 'error')} className="btn-ghost text-coral-600 hover:bg-coral-50">Delete my account</button>
            </div>
          )}

          {active === 'appearance' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-ink-950">Appearance</h2>
              <div className="grid grid-cols-2 gap-3">
                {(['light', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTheme(t); toast('Theme updated', 'default'); }}
                    className={cn(
                      'rounded-xl border p-4 text-left transition-colors',
                      theme === t ? 'border-ink-900 bg-ink-100' : 'border-ink-200 hover:border-ink-400'
                    )}
                  >
                    <p className="text-sm font-semibold capitalize text-ink-800">{t}</p>
                    <p className="text-xs text-ink-500">{t === 'light' ? 'Always light' : 'Match system'}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
