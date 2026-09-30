import React from 'react';
import { BookOpen, ShieldCheck, Mail, ArrowUpRight, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-serif text-base font-bold text-white tracking-tight">
                E-Book Management System
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated university academic press, digital repository, and open research monograph distribution platform.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Institutional Copyright Protection</span>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Repository Index
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('browse')} className="hover:text-white transition">
                  Browse All Disciplines
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-white transition">
                  Computer Science & Algorithms
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-white transition">
                  Physical Sciences & Quantum
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-white transition">
                  Economics & Strategy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-white transition">
                  World History & Classics
                </button>
              </li>
            </ul>
          </div>

          {/* Patron Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Patron Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('my-books')} className="hover:text-white transition">
                  My Digital Bookshelf
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cart')} className="hover:text-white transition">
                  Shopping Cart & Loans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-white transition">
                  Institutional ID & Profile
                </button>
              </li>
              <li>
                <span className="text-slate-500">Offline ePub / PDF Reader</span>
              </li>
              <li>
                <span className="text-slate-500">Academic Citation Generator (BibTeX)</span>
              </li>
            </ul>
          </div>

          {/* Institutional Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Academic Compliance
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Materials made available under educational Fair Use and university electronic lending licensing agreements.
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-400">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>University Demo Project</span>
              </div>
              Frontend e-book system architecture demonstrator with persistent cart & reader workflow.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 E-Book Management System. University Academic Repository & Library Prototype. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">About Project</span>
            <span className="hover:text-slate-400 cursor-pointer">Library Catalog</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Access</span>
            <span className="hover:text-slate-400 cursor-pointer">Help & Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
