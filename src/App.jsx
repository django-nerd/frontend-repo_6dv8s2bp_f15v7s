import React, { useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import FeatureGrid from './components/FeatureGrid';
import LivePreviewPanel from './components/LivePreviewPanel';
import CTA from './components/CTA';
import AuthPanel from './components/AuthPanel';
import PatientPanel from './components/PatientPanel';
import DoctorPanel from './components/DoctorPanel';

function App() {
  const [auth, setAuth] = useState(null);
  const role = auth?.user?.role;

  return (
    <div className="min-h-screen w-full bg-black font-inter text-white">
      <HeroCover />
      <AuthPanel onAuth={setAuth} />

      {!auth && (
        <>
          <FeatureGrid />
          <LivePreviewPanel />
          <CTA />
        </>
      )}

      {auth && role === 'patient' && <PatientPanel auth={auth} />}
      {auth && role === 'doctor' && <DoctorPanel auth={auth} />}

      <footer className="mx-auto max-w-7xl px-6 pb-12 text-xs text-white/50 md:px-10 lg:px-16">
        © {new Date().getFullYear()} NeuroLink Health — MVP concept
      </footer>
    </div>
  );
}

export default App;
