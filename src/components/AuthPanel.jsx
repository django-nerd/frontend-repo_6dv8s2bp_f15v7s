import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AuthPanel({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [doctorCode, setDoctorCode] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('nlh_auth');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        onAuth(data);
      } catch {}
    }
  }, [onAuth]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = mode === 'login' ? `${API_BASE}/auth/login` : `${API_BASE}/auth/signup`;
      const body = mode === 'login'
        ? { email, password }
        : { name, email, password, role, doctor_code: doctorCode || undefined, doctor_email: doctorEmail || undefined };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Authentication failed');
      const auth = { token: data.access_token, user: data.user };
      localStorage.setItem('nlh_auth', JSON.stringify(auth));
      onAuth(auth);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('nlh_auth');
    onAuth(null);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 text-white md:px-8" id="auth">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Secure Access</h2>
          <p className="text-sm text-white/70">Sign up or log in. Choose Doctor or Patient at signup.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMode('login')} className={`rounded-md px-3 py-2 text-sm ${mode==='login'?'bg-white text-black':'bg-white/10 text-white'}`}>Login</button>
          <button onClick={() => setMode('signup')} className={`rounded-md px-3 py-2 text-sm ${mode==='signup'?'bg-white text-black':'bg-white/10 text-white'}`}>Sign Up</button>
          <button onClick={logout} className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm">Logout</button>
        </div>
      </div>

      <form onSubmit={submit} className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-black/40 p-4 sm:grid-cols-2">
        {mode === 'signup' && (
          <>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-white/70">Full Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30" />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-white/70">Role</label>
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </>
        )}
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs text-white/70">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30" />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs text-white/70">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30" />
        </div>
        {mode === 'signup' && role === 'patient' && (
          <>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-white/70">Doctor Code (optional)</label>
              <input value={doctorCode} onChange={(e)=>setDoctorCode(e.target.value)} className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30" />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-white/70">Doctor Email (optional)</label>
              <input type="email" value={doctorEmail} onChange={(e)=>setDoctorEmail(e.target.value)} className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30" />
            </div>
          </>
        )}
        <div className="sm:col-span-2 flex items-center justify-between">
          <div className="text-xs text-red-400">{error}</div>
          <button disabled={loading} type="submit" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-60">{loading ? 'Please wait…' : (mode==='login'?'Login':'Create account')}</button>
        </div>
      </form>
    </section>
  );
}
