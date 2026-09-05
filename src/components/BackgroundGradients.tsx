import React from 'react';

export const BackgroundGradients: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Deep dark canvas gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#060b18] to-black" />

      {/* Subtle liquid grid mesh */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Floating Orb 1 - Cyan / Sky */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-cyan-500/12 blur-[130px] animate-orb-1" />

      {/* Floating Orb 2 - Indigo / Violet */}
      <div className="absolute top-[35%] -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[150px] animate-orb-2" />

      {/* Floating Orb 3 - Emerald / Teal accent */}
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[140px] animate-orb-3" />

      {/* Floating Orb 4 - Subtle Blue center glow */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-blue-600/10 blur-[160px] animate-pulse-glow" />
    </div>
  );
};
