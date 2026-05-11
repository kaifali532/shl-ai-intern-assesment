import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

const frameworksData = [
  { name: "Cognitive Ability", description: "Measures reasoning and problem-solving skills." },
  { name: "Personality", description: "Evaluates behavioral traits and work style." },
  { name: "Technical Skills", description: "Assesses job-specific technical abilities." }
];

export default function Frameworks() {
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
            Assessment <span className="text-[#2563EB]">Frameworks</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium italic">
            Understanding the dimensions of assessment
          </p>
        </header>

        <div className="space-y-4">
          {frameworksData.map((framework, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 p-6 sm:p-8 flex items-start gap-4 sm:gap-6 group hover:border-slate-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-[#2563EB] transition-colors text-slate-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-2">
                  {framework.name}
                </h3>
                <p className="text-slate-500 leading-relaxed italic">
                  {framework.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
