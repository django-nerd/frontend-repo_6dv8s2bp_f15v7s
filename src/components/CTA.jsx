import React from 'react';

export default function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold">Ready to explore NeuroLink Health?</h3>
            <p className="mt-1 text-sm text-white/80">This MVP showcases the core building blocks across web, mobile, and backend.</p>
          </div>
          <div className="flex gap-3">
            <a href="#features" className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60">See Features</a>
            <a href="#" className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40">View Docs</a>
          </div>
        </div>
      </div>
    </section>
  );
}
