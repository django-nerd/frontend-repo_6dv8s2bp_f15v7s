import React from 'react';
import Spline from '@splinetool/react-spline';
import { HeartPulse, Shield, Stethoscope } from 'lucide-react';

export default function HeroCover() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient to improve text contrast; doesn't block Spline interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-24 md:px-10 lg:px-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur">
          <Shield className="h-3.5 w-3.5" /> Secure • HIPAA-conscious MVP
        </span>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          NeuroLink Health
        </h1>
        <p className="max-w-2xl text-base text-white/80 sm:text-lg">
          A cross‑platform health monitoring ecosystem for patients and doctors.
          Record vitals, view trends, chat in real time, and get alerted on what
          matters — all in one place.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/80">
          <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
            <HeartPulse className="h-4 w-4 text-pink-400" /> Real‑time Vitals
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
            <Stethoscope className="h-4 w-4 text-sky-400" /> Doctor Dashboard
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
            <Shield className="h-4 w-4 text-emerald-400" /> JWT Auth
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#features"
            className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Explore Features
          </a>
          <a
            href="#cta"
            className="rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
