import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Pencil, Plus, LogOut, Upload } from 'lucide-react';
import api, { resolveImg } from '../api.js';

const EMPTY = {
  title: '', category: 'Full Stack', description: '',
  tech: '', image: '', liveUrl: '', githubUrl: '', featured: false, order: 0
};

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!token) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            try {
              const { data } = await api.post('/auth/login', { email, password });
              localStorage.setItem('token', data.token);
              setToken(data.token);
            } catch (err) {
              setError(err.response?.data?.message || 'Login failed');
            }
          }}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
        >
          <h1 className="font-display text-xl font-bold">Admin Login</h1>
          <p className="mt-1 text-xs text-white/40">Manage your portfolio projects.</p>

          <input
            className="glass-input mt-5" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <input
            className="glass-input mt-3" type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <button className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-semibold text-ink transition hover:bg-white/90">
            Sign In
          </button>
          <Link to="/" className="mt-4 block text-center text-xs text-white/40 hover:text-white">
            ← Back to portfolio
          </Link>
        </form>
      </div>
    );
  }

  return <Dashboard onLogout={() => { localStorage.removeItem('token'); setToken(null); }} />;
}

/* ─────────────────────────── DASHBOARD ─────────────────────────── */

function Dashboard({ onLogout }) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = () => api.get('/projects').then((r) => setProjects(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const reset = () => { setForm(EMPTY); setEditId(null); setMsg(''); };

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    const payload = {
      ...form,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      order: Number(form.order) || 0
    };
    try {
      if (editId) await api.put(`/projects/${editId}`, payload);
      else await api.post('/projects', payload);
      reset();
      load();
      setMsg('✅ Saved successfully');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || err.message));
    }
  };

  const edit = (p) => {
    setEditId(p._id);
    setForm({ ...p, tech: (p.tech || []).join(', ') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setMsg('❌ Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Project Manager</h1>
          <p className="mt-0.5 text-xs text-white/40">{projects.length} projects live</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5">
            View Site
          </Link>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ── Form ── */}
        <form
          onSubmit={submit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-2 lg:sticky lg:top-6 lg:self-start"
        >
          <h2 className="mb-4 font-display text-base font-semibold">
            {editId ? 'Edit Project' : 'Add New Project'}
          </h2>

          <input className="glass-input mb-3" placeholder="Title *" value={form.title} onChange={set('title')} required />
          <input className="glass-input mb-3" placeholder="Category" value={form.category} onChange={set('category')} />
          <textarea className="glass-input mb-3 resize-none" rows={3} placeholder="Description *" value={form.description} onChange={set('description')} required />
          <input className="glass-input mb-3" placeholder="Tech (comma separated)" value={form.tech} onChange={set('tech')} />
          <input className="glass-input mb-3" placeholder="Live URL" value={form.liveUrl} onChange={set('liveUrl')} />
          <input className="glass-input mb-3" placeholder="GitHub URL" value={form.githubUrl} onChange={set('githubUrl')} />

          <label className="mb-3 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-3 text-xs text-white/50 hover:border-indigo-400/40">
            <Upload size={14} />
            {uploading ? 'Uploading…' : form.image ? 'Change image' : 'Upload cover image'}
            <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
          </label>

          {form.image && (
            <img src={resolveImg(form.image)} alt="" className="mb-3 h-28 w-full rounded-xl object-cover" />
          )}

          <div className="mb-3 flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-white/60">
              <input type="checkbox" checked={form.featured} onChange={set('featured')} className="accent-indigo-500" />
              Featured
            </label>
            <input
              type="number" className="glass-input !w-24 !py-1.5" placeholder="Order"
              value={form.order} onChange={set('order')}
            />
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-xl bg-white py-2.5 text-sm font-semibold text-ink hover:bg-white/90">
              {editId ? 'Update' : 'Add Project'}
            </button>
            {editId && (
              <button type="button" onClick={reset} className="rounded-xl border border-white/15 px-4 text-sm text-white/60 hover:bg-white/5">
                Cancel
              </button>
            )}
          </div>
          {msg && <p className="mt-3 text-xs text-white/60">{msg}</p>}
        </form>

        {/* ── List ── */}
        <div className="space-y-3 lg:col-span-3">
          {projects.map((p) => (
            <div key={p._id} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-white/5">
                {p.image && <img src={resolveImg(p.image)} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold">{p.title}</p>
                <p className="mt-0.5 text-[11px] text-white/35">{p.category}</p>
                <p className="mt-1 line-clamp-1 text-xs text-white/40">{p.description}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5">
                <button onClick={() => edit(p)} className="rounded-lg border border-white/10 p-2 text-white/60 hover:bg-white/5">
                  <Pencil size={13} />
                </button>
                <button onClick={() => remove(p._id)} className="rounded-lg border border-red-400/20 p-2 text-red-400/80 hover:bg-red-400/10">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/10 py-12 text-center text-sm text-white/30">
              No projects yet. Add your first one →
            </p>
          )}
        </div>
      </div>
    </div>
  );
}