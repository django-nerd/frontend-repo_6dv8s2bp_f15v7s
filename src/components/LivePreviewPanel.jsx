import React from 'react';
import { Play, Smartphone, Monitor } from 'lucide-react';

export default function LivePreviewPanel() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10 lg:px-16">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-6 text-white shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/80">
            <Play className="h-4 w-4 text-emerald-400" />
            <span className="text-sm">MVP preview</span>
          </div>
          <div className="flex gap-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1"><Monitor className="h-3 w-3" /> Web</span>
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1"><Smartphone className="h-3 w-3" /> Mobile</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <h4 className="mb-2 text-sm font-medium text-white">Doctor Dashboard</h4>
            <p className="text-sm text-white/70">Login, see patients, view 7‑day vitals and chat in real time.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/60">
              <li>Recharts for trends</li>
              <li>WebSocket chat</li>
              <li>Alerts when thresholds are crossed</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <h4 className="mb-2 text-sm font-medium text-white">Patient App</h4>
            <p className="text-sm text-white/70">Register, simulate wearable data, send vitals, and chat with doctor.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/60">
              <li>Manual input or auto‑simulate feed</li>
              <li>History view</li>
              <li>Secure messaging</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
