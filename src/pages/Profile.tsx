import { useState } from 'react';
import { Pencil, Check, X, Mail, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/lib/toast';
import { supabase } from '@/lib/supabase';

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Profile() {
  const { profile, user, refreshProfile } = useAuth();

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
  const email = profile?.email || user?.email || '';
  const role = profile?.role || '';
  const headline = profile?.headline || '';
  const about = profile?.about || '';
  const location = profile?.location || '';
  const careerFocus = profile?.career_focus || '';
  const avatarUrl = profile?.avatar_url || '';
  const initials = getInitials(displayName);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(displayName);
  const [editHeadline, setEditHeadline] = useState(headline);
  const [editAbout, setEditAbout] = useState(about);
  const [editRole, setEditRole] = useState(role);
  const [editLocation, setEditLocation] = useState(location);
  const [editFocus, setEditFocus] = useState(careerFocus);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          headline: editHeadline.trim(),
          about: editAbout.trim(),
          role: editRole.trim(),
          location: editLocation.trim(),
          career_focus: editFocus.trim(),
        })
        .eq('user_id', user.id);

      if (error) {
        toast('Could not save profile', 'error');
      } else {
        await refreshProfile();
        toast('Profile updated', 'success');
        setEditing(false);
      }
    } catch {
      toast('Could not save profile', 'error');
    }
    setSaving(false);
  };

  const cancel = () => {
    setName(displayName);
    setEditHeadline(headline);
    setEditAbout(about);
    setEditRole(role);
    setEditLocation(location);
    setEditFocus(careerFocus);
    setEditing(false);
  };

  const noProfile = !profile;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {/* Header */}
      <section>
        <p className="section-label">Profile</p>
        <h1 className="mt-2 editorial-h1">Your professional identity</h1>
      </section>

      {/* Missing profile notice */}
      {noProfile && (
        <div className="rounded-2xl border border-mustard-200 bg-mustard-50 p-4 text-sm text-mustard-700">
          We couldn't find a profile linked to your account yet. Edit your details below to create one.
        </div>
      )}

      {/* Header card */}
      <section className="relative overflow-hidden rounded-4xl border border-ink-200/60 bg-white">
        <div className="h-28 bg-gradient-to-r from-coral-300 via-mustard-300 to-mint-300" />
        <div className="px-6 pb-6 sm:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-float"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-brand-400 to-brand-600 font-display text-2xl font-bold text-white shadow-float">
                  {initials}
                </div>
              )}
              <div className="pb-1">
                <h2 className="font-display text-2xl font-bold text-ink-950">{displayName}</h2>
                <p className="text-sm text-ink-500">{role || careerFocus || 'Add your role'}</p>
              </div>
            </div>
            <button
              onClick={() => setEditing((e) => !e)}
              className="btn-secondary btn-sm self-start sm:self-auto"
            >
              {editing ? <><X className="h-3.5 w-3.5" /> Cancel</> : <><Pencil className="h-3.5 w-3.5" /> Edit Profile</>}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink-500">
            <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {email}</span>
            {location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {location}</span>}
          </div>
        </div>
      </section>

      {/* Headline + About */}
      <section className="rounded-4xl border border-ink-200/60 bg-white p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-ink-950">Professional headline</h2>
        {editing ? (
          <input className="input mt-3" value={editHeadline} onChange={(e) => setEditHeadline(e.target.value)} placeholder="Add a headline" />
        ) : (
          <p className="mt-2 text-ink-700 text-pretty">{headline || 'No headline set yet.'}</p>
        )}

        <h2 className="mt-6 font-display text-lg font-semibold text-ink-950">About</h2>
        {editing ? (
          <textarea className="input mt-3 resize-none" rows={4} value={editAbout} onChange={(e) => setEditAbout(e.target.value)} placeholder="Tell us about yourself" />
        ) : (
          <p className="mt-2 leading-relaxed text-ink-700 text-pretty">{about || 'No about section set yet.'}</p>
        )}

        <h2 className="mt-6 font-display text-lg font-semibold text-ink-950">Name</h2>
        {editing ? (
          <input className="input mt-3" value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <p className="mt-2 text-ink-700 text-pretty">{displayName}</p>
        )}

        <h2 className="mt-6 font-display text-lg font-semibold text-ink-950">Role</h2>
        {editing ? (
          <input className="input mt-3" value={editRole} onChange={(e) => setEditRole(e.target.value)} placeholder="e.g. Data Science Student" />
        ) : (
          <p className="mt-2 text-ink-700 text-pretty">{role || 'No role set yet.'}</p>
        )}

        <h2 className="mt-6 font-display text-lg font-semibold text-ink-950">Location</h2>
        {editing ? (
          <input className="input mt-3" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="e.g. Bengaluru, India" />
        ) : (
          <p className="mt-2 text-ink-700 text-pretty">{location || 'No location set yet.'}</p>
        )}

        <h2 className="mt-6 font-display text-lg font-semibold text-ink-950">Career focus</h2>
        {editing ? (
          <input className="input mt-3" value={editFocus} onChange={(e) => setEditFocus(e.target.value)} placeholder="e.g. Data Science" />
        ) : (
          <p className="mt-2 text-ink-700 text-pretty">{careerFocus || 'Not set yet'}</p>
        )}

        {editing && (
          <button onClick={save} disabled={saving} className="btn-primary mt-5">
            <Check className="h-4 w-4" /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        )}
      </section>

      {/* Account info */}
      <section className="rounded-4xl border border-ink-200/60 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-brand-600" />
          <h2 className="font-display text-lg font-semibold text-ink-950">Account</h2>
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Email</p>
            <p className="mt-1 text-sm text-ink-700">{email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">User ID</p>
            <p className="mt-1 text-xs text-ink-500">{user?.id}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
