import React from 'react';
import { Activity, LineChart, MessageSquare, Lock } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Vitals Recording',
    desc: 'Capture heart rate, SpO₂, temperature, blood pressure, and respiration rate from simulated wearables.',
  },
  {
    icon: LineChart,
    title: 'Trends & Insights',
    desc: 'View 7‑day trends and simple threshold alerts for abnormal readings.',
  },
  {
    icon: MessageSquare,
    title: 'Realtime Chat',
    desc: 'Patients and doctors can exchange messages instantly using websockets.',
  },
  {
    icon: Lock,
    title: 'Secure Access',
    desc: 'Role‑based authentication with JWT for Patients and Doctors.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
      <h2 className="mb-8 text-2xl font-semibold text-white">Core capabilities</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5 text-white/90 backdrop-blur transition hover:bg-white/10">
            <Icon className="mb-3 h-6 w-6 text-sky-300" />
            <h3 className="text-base font-medium text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/80">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
