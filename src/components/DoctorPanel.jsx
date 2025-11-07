import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function DoctorPanel({ auth }) {
  const headers = useMemo(() => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${auth?.token}` }), [auth]);
  const [summary, setSummary] = useState({ total_patients: 0, active_alerts: 0, new_messages: 0 });
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [error, setError] = useState('');

  const loadSummary = async () => {
    try {
      const res = await fetch(`${API_BASE}/doctor/summary`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to load summary');
      setSummary(data);
    } catch (e) { setError(e.message); }
  };

  const loadPatients = async () => {
    try {
      const res = await fetch(`${API_BASE}/doctor/patients`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to load patients');
      setPatients(data);
    } catch (e) { setError(e.message); }
  };

  const loadAlerts = async (patientId) => {
    try {
      const res = await fetch(`${API_BASE}/doctor/patients/${patientId}/alerts`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to load alerts');
      setAlerts(data);
    } catch (e) { setError(e.message); }
  };

  useEffect(() => { loadSummary(); loadPatients(); }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-white md:px-8">
      <div className="mb-3 text-sm text-white/70">Logged in as Doctor: <span className="font-medium text-white">{auth?.user?.name}</span></div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 text-base font-semibold">Overview</h3>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-md bg-black/40 p-3">
              <div className="text-xs text-white/60">Patients</div>
              <div className="text-lg font-semibold">{summary.total_patients}</div>
            </div>
            <div className="rounded-md bg-black/40 p-3">
              <div className="text-xs text-white/60">Active Alerts</div>
              <div className="text-lg font-semibold">{summary.active_alerts}</div>
            </div>
            <div className="rounded-md bg-black/40 p-3">
              <div className="text-xs text-white/60">New Messages</div>
              <div className="text-lg font-semibold">{summary.new_messages}</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold">Patients</h3>
            <button onClick={loadPatients} className="rounded-md bg-white/10 px-3 py-1.5 text-xs">Refresh</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {patients.map(p => (
              <button key={p.id} onClick={()=>{ setSelected(p); loadAlerts(p.id); }} className="rounded-lg border border-white/10 bg-black/40 p-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.name}</div>
                  {p.alert_count > 0 && <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-300">{p.alert_count} alerts</span>}
                </div>
                <div className="mt-1 text-xs text-white/70">{p.email}</div>
                {p.latest_vitals && (
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
                    <span>HR: {p.latest_vitals.heartRate}</span>
                    <span>SpO₂: {p.latest_vitals.spo2}%</span>
                    <span>Temp: {p.latest_vitals.temperature}°C</span>
                    <span>BP: {p.latest_vitals.bpSystolic}/{p.latest_vitals.bpDiastolic}</span>
                    <span>Resp: {p.latest_vitals.respirationRate}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && alerts && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold">{selected.name} — Detail</h3>
            <button onClick={()=>loadAlerts(selected.id)} className="rounded-md bg-white/10 px-3 py-1.5 text-xs">Refresh</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium">Alerts (latest)</h4>
              <ul className="mt-2 max-h-56 space-y-2 overflow-auto text-sm">
                {alerts.items?.map((a, i) => (
                  <li key={i} className="rounded-lg border border-white/10 bg-black/40 p-3">
                    <div className="text-xs text-white/60">{new Date(a.created_at).toLocaleString()}</div>
                    <div className="text-white">{a.type} — {a.message}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Cumulative summary</h4>
              <div className="mt-2 rounded-lg border border-white/10 bg-black/40 p-3 text-sm">
                <div>Total alerts: <span className="font-semibold">{alerts.total}</span></div>
                <div className="mt-2 text-white/80">
                  {Object.entries(alerts.byType || {}).map(([k, v]) => (
                    <div key={k} className="flex justify-between"><span>{k}</span><span className="font-semibold">{v}</span></div>
                  ))}
                  {Object.keys(alerts.byType || {}).length === 0 && <div className="text-white/60">No alerts yet.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <div className="mt-4 rounded-md bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
    </section>
  );
}
