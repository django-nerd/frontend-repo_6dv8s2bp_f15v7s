import React from 'react';
import HeroCover from './components/HeroCover';
import FeatureGrid from './components/FeatureGrid';
import LivePreviewPanel from './components/LivePreviewPanel';
import CTA from './components/CTA';

function App() {
  return (
    <div className="min-h-screen w-full bg-black font-inter text-white">
      <HeroCover />
      <FeatureGrid />
      <LivePreviewPanel />
      <CTA />
      <footer className="mx-auto max-w-7xl px-6 pb-12 text-xs text-white/50 md:px-10 lg:px-16">
        © {new Date().getFullYear()} NeuroLink Health — MVP concept
      </footer>
    </div>
  );
}

export default App;
