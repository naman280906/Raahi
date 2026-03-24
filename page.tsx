"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Navigation, School, Plane, Car, Clock, Sparkles, 
  ChevronRight, Users, Leaf, Compass, Send, Bot, Loader2, Zap, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATABASE CONSTANTS ---
const CAMPUS_LOCATIONS = [
  "University Building", "Boys Hostel Block", "Girls Hostel Block", 
  "Chemistry Lab", "BEL Lab", "Tech Park", "TP Ground", 
  "TP Ganeshum Auditorium", "SRM Hospital"
];

const INDIA_CITIES = [
  "Srinagar", "Jammu", "Delhi", "Mumbai", "Bengaluru", 
  "Chennai", "Kolkata", "Guwahati", "Ahmedabad", "Haridwar", "Leh", "Kochi"
];

const SCENARIOS = ["Normal", "08:00 AM", "09:45 AM", "12:00 PM", "03:00 PM"];
const FILTERS = ["fastest", "cheapest", "greenest"];

// --- 1. CAMPUS DASHBOARD ---
const CampusView = ({ result, time }: { result: any, time: string }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
      <div className="bg-[#0B1221] border border-orange-500/20 p-5 rounded-2xl shadow-lg shadow-orange-500/5 text-center">
        <div className="text-orange-500 text-[10px] font-black tracking-widest mb-1 italic uppercase">WALK_ETA</div>
        <div className="text-2xl font-black text-white">{result ? `${result.totalTime} MINS` : "--"}</div>
      </div>
      <div className="bg-[#0B1221] border border-orange-500/20 p-5 rounded-2xl shadow-lg shadow-orange-500/5">
        <div className="text-orange-500 text-[10px] font-black tracking-widest mb-1 italic uppercase">TIME_BLOCK</div>
        <div className="text-xs font-bold text-white uppercase">{time}</div>
      </div>
      <div className="bg-[#0B1221] border border-orange-500/20 p-5 rounded-2xl shadow-lg shadow-orange-500/5">
        <div className="text-orange-500 text-[10px] font-black tracking-widest mb-1 italic uppercase">ALGO</div>
        <div className="text-xs font-bold text-emerald-400">DIJKSTRA-ACTIVE</div>
      </div>
    </div>
    <AnimatePresence>
      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-[#0B1221] to-[#1E293B] border border-orange-500/40 p-8 rounded-[32px] shadow-2xl">
          <h3 className="text-white font-black mb-6 uppercase tracking-tighter text-sm italic border-l-4 border-orange-500 pl-4">Campus Route Output</h3>
          <div className="flex flex-wrap items-center gap-3">
            {result.path.map((node: string, i: number) => (
              <React.Fragment key={i}>
                <div className="bg-[#020617] px-4 py-2 rounded-xl border border-slate-800 text-[10px] font-bold text-white uppercase">
                  {node}
                </div>
                {i < result.path.length - 1 && <ChevronRight size={14} className="text-orange-500" />}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-8 text-slate-500 text-xs italic font-medium">"{result.explanation}"</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- 2. TRAVELER DASHBOARD (Pan-India) ---
const TravelView = ({ result, filter }: { result: any, filter: string }) => (
  <div className="space-y-6">
    <div className="bg-[#0B1221] border border-orange-500/20 p-8 rounded-[40px] shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-black italic uppercase tracking-tighter text-xl flex items-center gap-2">
          <Plane className="text-orange-500" /> Pan-India Optimization
        </h3>
        <div className="bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-orange-500/30">
          {filter} prioritized
        </div>
      </div>
      {result ? (
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800 shadow-inner">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Estimated Journey</p>
                 <div className="text-xl font-black text-white italic">{result.summary?.totalTime || result.totalTime}</div>
              </div>
              <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800 shadow-inner">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Factor</p>
                 <div className="text-xs font-black text-emerald-400 uppercase tracking-tighter italic">Low CO₂ Path Found</div>
              </div>
           </div>
           <div className="space-y-2 border-l-2 border-slate-800 ml-3 pl-8">
              {result.path.map((city: string, i: number) => (
                <div key={i} className="relative py-2">
                  <div className="absolute left-[-42px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#020617] border-2 border-orange-500 flex items-center justify-center text-[9px] font-bold text-white">{i+1}</div>
                  <h4 className="text-white font-bold text-sm tracking-widest uppercase">{city}</h4>
                  <p className="text-slate-600 text-[9px] uppercase font-black">{i === 0 ? "Source" : i === result.path.length-1 ? "Destination" : "Transit"}</p>
                </div>
              ))}
           </div>
        </div>
      ) : (
        <div className="py-20 text-center opacity-20 italic font-black uppercase tracking-[0.4em] text-xs">Enter Origin and Destination Hubs</div>
      )}
    </div>
  </div>
);

// --- 3. COMMUTE & CHAT (Kept from Previous UI) ---
const AIChatDashboard = () => (
    <div className="bg-[#0B1221] border border-orange-500/10 h-[450px] rounded-[40px] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-800 text-[10px] font-black uppercase text-orange-500 italic flex items-center gap-2">
            <Sparkles size={14}/> Raahi Neural Terminal
        </div>
        <div className="flex-1 p-8 text-sm italic opacity-30 font-bold flex items-center justify-center">Raahi Intelligence is awaiting sync...</div>
        <div className="p-6 bg-slate-950 flex gap-3">
           <input className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs outline-none focus:border-orange-500 font-bold uppercase tracking-widest" placeholder="TYPE QUERY..." />
           <button className="bg-orange-600 text-white px-6 rounded-xl shadow-lg shadow-orange-600/20"><Send size={18}/></button>
        </div>
    </div>
);

// --- MAIN RAHAHI MASTER APPLICATION ---
export default function RaahiApp() {
  const [tab, setTab] = useState('campus');
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [selectedTime, setSelectedTime] = useState("Normal");
  const [selectedFilter, setSelectedFilter] = useState("fastest");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState("");

  const LOCATIONS = tab === 'campus' ? CAMPUS_LOCATIONS : INDIA_CITIES;

  const calculate = async () => {
    if (!source || !dest) return setErr("PLEASE SPECIFY NODES FOR CALCULATION.");
    if (source === dest) return setErr("SOURCE AND DESTINATION CANNOT BE THE SAME.");
    setLoading(true); setErr(""); setResult(null);
    try {
      const res = await fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, destination: dest, time: selectedTime, filter: selectedFilter, mode: tab })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (e: any) { setErr(e.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 font-sans p-6 lg:p-12 selection:bg-orange-600">
      {/* BRANDING HEADER */}
      <nav className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center mb-24 gap-8">
        <div className="flex flex-col items-center lg:items-start gap-1">
          <img src="/logo.png" alt="Raahi Logo" className="h-14 lg:h-18 w-auto hover:scale-105 transition-transform cursor-pointer" />
        </div>
        
        <div className="flex bg-[#0B1221] p-1.5 rounded-[26px] border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {[
            { id: 'campus', label: 'Campus', icon: <School size={13}/> },
            { id: 'travel', label: 'Traveler', icon: <Plane size={13}/> },
            { id: 'commute', label: 'Commute', icon: <Car size={13}/> },
            { id: 'chat', label: 'Neural Bot', icon: <Sparkles size={13}/> }
          ].map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setSource(""); setDest(""); setResult(null); }} 
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 
              ${tab === t.id ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-600/30' : 'text-slate-600 hover:text-white'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONSOLE AREA */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* INPUT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-[#0B1221] border-2 border-slate-800/60 p-10 rounded-[45px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-orange-600/5 blur-[60px] rounded-full group-hover:bg-orange-600/10 transition-colors"></div>
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-12 flex items-center gap-3">
               <Zap size={14} className="fill-indigo-500" /> NAV_SYSTEM v10.4
            </h2>
            
            <div className="space-y-6 relative z-10">
               <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 flex justify-between">
                    <span>Source Origin</span> <MapPin size={10} className="text-orange-500" />
                 </label>
                 <select value={source} onChange={(e)=>setSource(e.target.value)} 
                    className="w-full bg-[#020617] border border-slate-800/80 rounded-2xl py-5 px-5 text-xs font-bold text-white focus:border-orange-500 outline-none appearance-none cursor-pointer">
                    <option value="">-- SELECT --</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 flex justify-between">
                    <span>Destination Hub</span> <Navigation size={10} className="text-orange-500" />
                 </label>
                 <select value={dest} onChange={(e)=>setDest(e.target.value)} 
                    className="w-full bg-[#020617] border border-slate-800/80 rounded-2xl py-5 px-5 text-xs font-bold text-white focus:border-orange-500 outline-none appearance-none cursor-pointer">
                    <option value="">-- SELECT --</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                 </select>
               </div>

               {/* DYNAMIC SCENARIOS (Depends on Tab) */}
               {tab === 'campus' ? (
                  <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                    <label className="text-[9px] font-black text-orange-500/60 uppercase tracking-widest ml-2">Time Constraint Context</label>
                    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#020617] border border-slate-800 rounded-2xl py-4 px-4 text-xs font-bold text-orange-400 focus:border-orange-500 outline-none appearance-none tracking-tighter cursor-pointer">
                      {SCENARIOS.map(s => <option key={s} value={s}>{s} SYNC</option>)}
                    </select>
                  </div>
               ) : (
                  <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                    <label className="text-[9px] font-black text-orange-500/60 uppercase tracking-widest ml-2 italic">Search Preference Header</label>
                    <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full bg-[#020617] border border-slate-800 rounded-2xl py-4 px-4 text-xs font-bold text-emerald-400 focus:border-orange-500 outline-none appearance-none tracking-tighter uppercase cursor-pointer">
                      {FILTERS.map(f => <option key={f} value={f}>Optimise: {f}</option>)}
                    </select>
                  </div>
               )}
            </div>

            {err && <div className="mt-8 p-4 bg-red-950/20 border border-red-900/40 rounded-xl text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{err}</div>}
            
            <button onClick={calculate} disabled={loading} 
              className="w-full mt-12 bg-gradient-to-r from-orange-600 to-amber-500 hover:scale-[1.02] text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-orange-600/40 tracking-[0.3em] text-[10px] uppercase group disabled:opacity-30">
              {loading ? <Loader2 className="animate-spin" size={18}/> : "Initiate Raahi Engine"} 
              {!loading && <Zap size={18} fill="white" />}
            </button>
          </section>

          <div className="bg-[#0B1221]/50 border border-slate-800 p-8 rounded-[40px] flex flex-col gap-4 italic opacity-80">
             <AlertTriangle className="text-orange-600" size={20} />
             <p className="text-[10px] font-medium leading-relaxed tracking-tight uppercase">Multi-modal datasets for Northern, Western and Southern India segments synchronized. Neural routing available.</p>
          </div>
        </div>

        {/* OUTPUT COLUMN */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             <motion.div key={tab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
               {tab === 'campus' && <CampusView result={result} time={selectedTime} />}
               {tab === 'travel' && <TravelView result={result} filter={selectedFilter} />}
               {tab === 'chat' && <AIChatDashboard />}
               {tab === 'commute' && (
                  <div className="p-20 border border-slate-800 border-dashed rounded-[60px] text-center italic text-slate-800 font-bold uppercase tracking-[0.5em] flex flex-col items-center">
                    <Car size={40} className="mb-4" /> LOCAL_COMMUTE_STATION_OFFLINE
                  </div>
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}