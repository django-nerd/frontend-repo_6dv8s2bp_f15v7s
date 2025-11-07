import React, { useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function PatientPanel({ auth }) {
  const [form, setForm] = useState({ heartRate: 72, spo2: 98, temperature: 36.8, bpSystolic: 118, bpDiastolic: 76, respirationRate: 16 });
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const headers = useMemo(() => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${auth?.token}` }), [auth]);

  const fetchHistory = async () => {
    if (!auth?.user?.id) return;
    try {
      const res = await fetch(`${API_BASE}/vitals/${auth.user.id}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to load history');
      setHistory(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/vitals`, { method: 'POST', headers, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to submit');
      await fetchHistory();
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-white md:px-8">
      <div className="mb-3 text-sm text-white/70">Logged in as Patient: <span className="font-medium text-white">{auth?.user?.name}</span></div>
      <div className="grid gap-4 md:grid-cols-2">
        <form onSubmit={submit} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-base font-semibold">Add Vitals</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['heartRate','Heart Rate'],['spo2','SpO₂'],['temperature','Temperature'],['bpSystolic','BP Systolic'],['bpDiastolic','BP Diastolic'],['respirationRate','Respiration']
            ].map(([key, label]) => (
              <div key={key} className="col-span-2 sm:col-span-1">
                <label className="mb-1 block text-xs text-white/70">{label}</label>
                <input
                  value={form[key]}
                  onChange={(e)=> setForm(prev=>({...prev, [key]: Number(e.target.value)}))}
                  className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-white/30"
                  type="number"
                  step="any"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-red-400">{error}</div>
            <button disabled={sending} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-60">{sending ? 'Sending…' : 'Submit Vitals'}</button>
          </div>
        </form>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold">History (latest)</h3>
            <button onClick={fetchHistory} className="rounded-md bg-white/10 px-3 py-1.5 text-xs">Refresh</button>
          </div>
          <div className="max-h-64 overflow-auto text-sm">
            {history.length === 0 && <div className="text-white/60">No vitals yet. Submit above to add.</div>}
            <ul className="space-y-2">
              {history.map((h, idx) => (
                <li key={idx} className="rounded-lg border border-white/10 bg-black/40 p-3">
                  <div className="text-xs text-white/60">{new Date(h.timestamp).toLocaleString()}</div>
                  <div className="mt-1 grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
                    <span>HR: {h.heartRate}</span>
                    <span>SpO₂: {h.spo2}%</span>
                    <span>Temp: {h.temperature}°C</span>
                    <span>BP: {h.bpSystolic}/{h.bpDiastolic}</span>
                    <span>Resp: {h.respirationRate}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
