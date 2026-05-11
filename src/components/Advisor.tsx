import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { createSHLChatSession } from '../lib/gemini';
import { Message, SHLResponse } from '../lib/types';
import { motion, AnimatePresence } from 'motion/react';

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am the SHL Assessment Recommender. Tell me about the role you are hiring for, and I can help you find the right SHL assessments.',
      data: {
        reply: 'Hello! I am the SHL Assessment Recommender. Tell me about the role you are hiring for, and I can help you find the right assessments.',
        recommendations: [],
        end_of_conversation: false
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const session = createSHLChatSession();
      setChatSession(session);
    } catch (err) {
      console.error("Failed to initialize chat session", err);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMessage.text });
      const responseText = response.text;
      
      let parsedData: SHLResponse | undefined;
      try {
        if (responseText) {
          parsedData = JSON.parse(responseText.trim());
        }
      } catch (parseErr) {
        console.error("Failed to parse AI response as JSON:", responseText);
      }

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: parsedData?.reply || 'Sorry, I encountered an error formatting my response.',
        data: parsedData
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      // In bold typography theme, error is shown in the chat
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: 'Sorry, I encountered an error while communicating with the server.',
          isError: true,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const isConversationComplete = messages.length > 0 && messages[messages.length - 1].data?.end_of_conversation;

  // Extract latest recommendations for the right panel
  const latestRecommendationsMessage = [...messages].reverse().find(m => m.data?.recommendations && m.data.recommendations.length > 0);
  const latestRecommendations = latestRecommendationsMessage?.data?.recommendations || [];

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar: Chat History */}
      <section className="w-full lg:w-[380px] xl:w-[420px] border-r border-slate-200 flex flex-col bg-white shrink-0 h-full">
        <div className="p-6 border-b border-slate-100 hidden sm:block">
           <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Active Session</h2>
           <p className="text-sm font-medium">Recommender Assistant</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isModel = msg.role === 'model';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col gap-2 max-w-[90%] ${isModel ? 'items-end ml-auto' : 'items-start mr-auto'}`}
                >
                  <div className={`p-4 text-sm leading-relaxed ${
                    isModel
                      ? msg.isError
                        ? 'bg-rose-50 text-rose-800 rounded-2xl rounded-tr-none shadow-lg shadow-rose-100 border border-rose-200' 
                        : 'bg-[#2563EB] text-white rounded-2xl rounded-tr-none shadow-lg shadow-blue-100'
                      : 'bg-slate-100 text-slate-900 rounded-2xl rounded-tl-none'
                  }`}>
                    {msg.text}

                    {/* Display recommendations inline for mobile ONLY; Desktop shows them in the big right panel */}
                    <div className="lg:hidden mt-4 space-y-3">
                      {msg.data?.recommendations?.map((rec, idx) => (
                         <a key={idx} href={rec.url} target="_blank" rel="noopener noreferrer" className="block bg-white border border-slate-200 p-4 text-slate-900">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-bold uppercase tracking-tight leading-tight">{rec.name}</h4>
                              <span className="font-mono text-[9px] px-1.5 py-0.5 border border-slate-200 bg-slate-50 text-slate-500 whitespace-nowrap ml-2">TYPE: {rec.test_type}</span>
                           </div>
                           <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-blue-200 pb-0.5 mt-2 inline-block">View details</span>
                         </a>
                      ))}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${isModel ? 'text-blue-400 mr-2' : 'text-slate-400 ml-2'}`}>
                    {isModel ? 'AI Agent' : 'User'}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-end gap-2 ml-auto max-w-[90%]">
              <div className="bg-[#2563EB] text-white p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed shadow-lg shadow-blue-100 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-white/80" />
                Processing...
              </div>
              <span className="text-[10px] font-bold text-blue-400 uppercase mr-2">AI Agent</span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {isConversationComplete ? (
            <div className="h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-800 text-sm font-bold uppercase tracking-wide">Complete</span>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] py-1.5 px-3 rounded-full font-bold uppercase tracking-wider transition-colors"
              >
                Start Over
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="h-12 bg-white border border-slate-200 rounded-full flex items-center px-4 justify-between focus-within:border-[#2563EB] transition-colors relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your refinement..."
                className="w-full h-full bg-transparent outline-none text-sm italic text-slate-800 placeholder-slate-400 pr-10"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 bg-[#2563EB] hover:bg-blue-700 disabled:bg-slate-300 rounded-full flex items-center justify-center text-white transition-colors absolute right-2 top-1/2 -translate-y-1/2 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Main Panel: Results & Catalog Data (Desktop) */}
      <section className="hidden lg:flex flex-1 flex-col bg-[#F8FAFC] overflow-y-auto w-full h-full">
        {/* Big Display Typography Header */}
        <header className="p-10 pb-4 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md z-10">
          <h1 className="text-[60px] xl:text-[84px] font-black leading-[0.85] tracking-tighter uppercase transition-colors">
            <span className="text-slate-300">Proposed</span><br/>
            <span className={latestRecommendations.length > 0 ? "text-[#2563EB]" : "text-slate-300 transition-colors"}>Shortlist.</span>
          </h1>
          <div className="mt-8 flex gap-4 items-center flex-wrap">
            <span className={`px-3 py-1 ${latestRecommendations.length > 0 ? "bg-blue-100 text-[#2563EB]" : "bg-slate-200 text-slate-500"} text-[10px] font-bold uppercase tracking-wider rounded transition-colors`}>
              {latestRecommendations.length} Matches Found
            </span>
            <span className="text-xs text-slate-400 font-medium italic">Based on Official SHL Catalog Data</span>
          </div>
        </header>

        {/* Results Grid */}
        <div className="px-10 flex-1 grid grid-cols-1 gap-4 pt-4 pb-10 max-w-4xl">
          {latestRecommendations.length === 0 ? (
             <div className="pt-20 lg:pt-32 text-center opacity-40">
                <div className="w-24 h-24 mx-auto mb-6 border-4 border-dashed border-slate-300 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 font-bold text-3xl italic">S</span>
                </div>
                <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-[11px]">Awaiting assessment context...</p>
             </div>
          ) : (
             latestRecommendations.map((rec, idx) => (
               <a href={rec.url} target="_blank" rel="noopener noreferrer" key={idx} className="bg-white border border-slate-200 p-6 flex group hover:border-[#2563EB] transition-colors block">
                  <div className="w-16 sm:w-20 shrink-0">
                    <span className="text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900 leading-tight">
                        {rec.name}
                      </h3>
                      <span className="font-mono text-[10px] px-2 py-1 border border-slate-200 bg-slate-50 text-slate-500 whitespace-nowrap self-start">TYPE: {rec.test_type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 mb-4 truncate italic">Top relevant selection for required profile constraint.</p>
                    <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-widest border-b-2 border-blue-200 pb-1 flex items-center w-max gap-1">
                      View assessment details <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
               </a>
             ))
          )}
        </div>
      </section>
    </div>
  );
}
