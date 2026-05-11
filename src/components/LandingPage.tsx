import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] font-sans text-[#0F172A] items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-3xl italic mb-8 shadow-xl">
          S
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight mb-6">
          <span className="text-slate-400">SHL Assessment</span>
          <br />
          <span className="text-[#2563EB]">Intelligence.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto italic">
          Discover the perfect assessments for your candidates through an intelligent conversational advisor powered by the latest SHL product catalog.
        </p>
        
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#2563EB] text-white font-bold tracking-widest uppercase text-sm rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
        >
          <div className="absolute inset-0 w-full h-full bg-blue-600 group-hover:scale-105 transition-transform origin-center"></div>
          <span className="relative flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </motion.div>
    </div>
  );
}
