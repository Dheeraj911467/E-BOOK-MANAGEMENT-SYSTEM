import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Bookmark, 
  Share2, 
  Download, 
  Sliders, 
  Sun, 
  Moon,
  FileText
} from 'lucide-react';
import { PurchasedBook, Book } from '../types';

export const BookReaderModal: React.FC = () => {
  const { readingBook, closeReader, downloadBook, showToast } = useApp();
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<'sepia' | 'light' | 'dark'>('sepia');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = readingBook?.pages || 320;

  if (!readingBook) return null;

  const sampleChapters = [
    {
      title: 'Chapter 1: Foundations & Theoretical Models',
      subtitle: 'Introduction to Modern Architectural Tenets',
      content: `The advancement of knowledge relies upon careful observation, iterative experimentation, and disciplined synthesis of prior art. 
      
In this volume, we examine the systemic interactions between computational abstractions and hardware reality. As information density multiplies, the foundational assumptions of classical computing must be revisited to accommodate non-deterministic latency distributions and asynchronous consensus protocols.

Key Takeaways:
• Separation of interface from implementation allows systems to evolve gracefully under load.
• Deterministic testing paradigms provide the bedrocks upon which verifiable systems are constructed.
• Scalability is fundamentally an economic trade-off between consistency, latency, and data replication costs.

As the late computer scientist Alan Kay observed, "Perspective is worth 80 IQ points." Adopting a systems-level view empowers researchers and engineers to solve intractable bottlenecks before committing thousands of engineering hours to suboptimal paths.`
    },
    {
      title: 'Chapter 2: Structural Verification and Protocols',
      subtitle: 'Formal Methods and Empirical Proofs',
      content: `When dealing with distributed state machines, human intuition routinely fails in the presence of network partitions and unexpected fail-stop scenarios. 

Formal verification offers mathematical guarantees that invariants remain unbroken across arbitrary node failures. By mapping state transitions to rigorous algebraic predicates, one can prove absence of deadlock, starvation, and race conditions before deploying code to thousands of edge compute instances.

"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra

Consider the Paxos and Raft consensus protocols: while their conceptual frameworks differ in leader election mechanics, both ensure that all non-faulty nodes agree on a linearized sequence of log entries.`
    },
    {
      title: 'Chapter 3: Future Horizons & Practical Synthesis',
      subtitle: 'Next-Generation Applications in Research and Industry',
      content: `The trajectory of scientific publishing and software distribution converges on open, reproducible, and verifiable digital artifacts. 

As you progress through your academic and professional endeavors, treat documentation and code clarity as continuous acts of scholarly communication. A well-written treatise or clean library serves not merely its current author, but future generations of learners who build upon its foundations.`
    }
  ];

  const currentChapter = sampleChapters[((currentPage - 1) % sampleChapters.length)];

  const themeClasses = {
    sepia: 'bg-[#fbf0d9] text-[#433422] selection:bg-[#dfcca5]',
    light: 'bg-white text-slate-800 selection:bg-indigo-100',
    dark: 'bg-slate-900 text-slate-100 selection:bg-indigo-700'
  };

  const themeToolbar = {
    sepia: 'bg-[#f3e5c8] border-[#dfcca5] text-[#433422]',
    light: 'bg-slate-100 border-slate-200 text-slate-800',
    dark: 'bg-slate-800 border-slate-700 text-slate-200'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
      <div className={`w-full max-w-5xl h-[92vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-slate-300 transition-colors duration-200 ${themeClasses[theme]}`}>
        
        {/* Reader Header */}
        <div className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between transition-colors ${themeToolbar[theme]}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded bg-indigo-900 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-sm sm:text-base truncate">
                {readingBook.title}
              </h2>
              <p className="text-xs opacity-75 truncate">
                {readingBook.author} • Academic Digital Edition
              </p>
            </div>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme switcher */}
            <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded text-xs ${theme === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'opacity-60'}`}
                title="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`p-1.5 rounded text-xs ${theme === 'sepia' ? 'bg-[#dfcca5] font-bold text-[#433422] shadow-xs' : 'opacity-60'}`}
                title="Sepia book mode"
              >
                <span className="text-[11px] font-serif font-bold px-1">Aa</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded text-xs ${theme === 'dark' ? 'bg-slate-700 text-white shadow-xs' : 'opacity-60'}`}
                title="Night reading"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font size adjustments */}
            <button
              onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
              className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded"
              title="Decrease font size"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono w-6 text-center">{fontSize}</span>
            <button
              onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
              className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded"
              title="Increase font size"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Download */}
            <button
              onClick={() => downloadBook(readingBook)}
              className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded text-indigo-600 dark:text-indigo-400"
              title="Download offline copy"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={closeReader}
              className="p-1.5 hover:bg-red-500 hover:text-white rounded-lg transition ml-2"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Body (Book Content) */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-16 md:px-24 py-10 flex flex-col items-center">
          <div className="max-w-2xl w-full">
            {/* Chapter Header */}
            <div className="text-center pb-8 mb-8 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                Institutional Digital Press • Monograph Edition
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-2 mb-2 leading-tight">
                {currentChapter.title}
              </h1>
              <p className="font-serif italic opacity-75 text-sm sm:text-base">
                {currentChapter.subtitle}
              </p>
            </div>

            {/* Custom Excerpt if provided */}
            {readingBook.sampleExcerpt && currentPage === 1 && (
              <div className="mb-8 p-4 rounded-xl border border-indigo-900/20 bg-indigo-50/40 text-slate-800 text-sm italic font-serif leading-relaxed">
                <p className="font-bold text-xs uppercase tracking-wider text-indigo-950 mb-1.5 not-italic">
                  Original Text Excerpt:
                </p>
                {readingBook.sampleExcerpt}
              </div>
            )}

            {/* Main Content Paragraphs */}
            <div 
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
              className="font-serif space-y-6 text-justify"
            >
              {currentChapter.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Reading notes simulator */}
            <div className="mt-12 p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono space-y-1">
              <div className="flex items-center gap-1.5 font-bold opacity-80">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Patron Citation Note</span>
              </div>
              <p className="opacity-70">
                Cited in: E-Book Management System Digital Repository (2026). DOI: 10.1016/ebms.{readingBook.id}.v4
              </p>
            </div>
          </div>
        </div>

        {/* Reader Footer Navigation */}
        <div className={`px-4 sm:px-8 py-3 border-t flex items-center justify-between text-xs transition-colors ${themeToolbar[theme]}`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1 font-medium transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Section
            </button>
            <span className="hidden sm:inline opacity-75">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast('Page bookmarked to your research notes.');
              }}
              className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1 transition"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bookmark</span>
            </button>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-indigo-950 flex items-center gap-1 font-medium transition shadow-xs"
            >
              Next Section
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
