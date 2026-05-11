import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const catalogData = [
  {
    name: "SHL Verify Coding",
    url: "https://www.shl.com/solutions/products/product-catalog/view/shl-verify-coding/",
    test_type: "K"
  },
  {
    name: "SHL General Ability Test",
    url: "https://www.shl.com/solutions/products/product-catalog/view/verify-interactive-g-plus/",
    test_type: "C"
  },
  {
    name: "OPQ32 Personality Test",
    url: "https://www.shl.com/solutions/products/product-catalog/view/opq32r/",
    test_type: "P"
  }
];

export default function Catalog() {
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
            Product <span className="text-[#2563EB]">Catalog</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium italic">
            Top selections from the official SHL portfolio
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogData.map((item, idx) => (
            <motion.a 
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 p-6 flex flex-col group hover:border-[#2563EB] hover:shadow-lg hover:shadow-blue-50 transition-all rounded-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs px-2 py-1 bg-slate-100 text-slate-600 border border-slate-200">
                  TYPE: {item.test_type}
                </span>
                <span className="text-slate-300 group-hover:text-[#2563EB] transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight leading-tight flex-1">
                {item.name}
              </h3>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details <ArrowRightIcon className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
