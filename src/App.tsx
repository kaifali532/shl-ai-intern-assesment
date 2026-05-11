import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Advisor from './components/Advisor';
import Catalog from './components/Catalog';
import Frameworks from './components/Frameworks';

export default function App() {
  const [page, setPage] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'advisor' | 'catalog' | 'frameworks'>('advisor');

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (page === 'landing') {
    return <LandingPage onStart={() => setPage('app')} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans text-[#0F172A] overflow-hidden">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 bg-white shrink-0 relative z-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('landing')}>
          <div className="w-8 h-8 bg-[#2563EB] rounded-sm flex items-center justify-center text-white font-bold text-lg italic shadow-sm">S</div>
          <span className="font-bold tracking-tight text-xl uppercase hidden sm:block">Assessment<span className="text-[#2563EB]">Intelligence</span></span>
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold tracking-widest uppercase text-slate-500 h-full relative">
          <button 
            onClick={() => setActiveTab('advisor')}
            className={`h-full border-b-2 px-1 transition-colors ${activeTab === 'advisor' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent hover:text-slate-900'}`}
          >
            Advisor
          </button>
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`h-full border-b-2 px-1 transition-colors hidden md:flex items-center ${activeTab === 'catalog' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent hover:text-slate-900'}`}
          >
            Catalog
          </button>
          <button 
            onClick={() => setActiveTab('frameworks')}
            className={`h-full border-b-2 px-1 transition-colors hidden md:flex items-center ${activeTab === 'frameworks' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent hover:text-slate-900'}`}
          >
            Frameworks
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-slate-200 hidden sm:flex items-center justify-center hover:bg-slate-300 transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            >
              <span className="text-slate-500 font-bold text-xs">US</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-30 font-sans">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 normal-case tracking-normal">User Settings</p>
                </div>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 normal-case tracking-normal"
                >
                  Profile
                </button>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 normal-case tracking-normal"
                >
                  Preferences
                </button>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setPage('landing');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 normal-case tracking-normal"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="flex flex-1 overflow-hidden">
        {activeTab === 'advisor' && <Advisor />}
        {activeTab === 'catalog' && <Catalog />}
        {activeTab === 'frameworks' && <Frameworks />}
      </main>

      {/* Footer Status Bar */}
      <footer className="h-10 border-t border-slate-200 bg-white flex items-center justify-between px-4 sm:px-8 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
        <div className="flex gap-4 sm:gap-6">
          <span className="hidden sm:inline">System Status</span>
          <span className="text-emerald-500">Operational</span>
        </div>
        <div className="hidden md:block">
          SHL SYSTEM PROMPT v2.1 • COMPLIANCE ACTIVE
        </div>
      </footer>
    </div>
  );
}


