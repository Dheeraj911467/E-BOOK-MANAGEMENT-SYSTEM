import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Download, 
  Bookmark, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle,
  Share2,
  FileText
} from 'lucide-react';
import { PurchasedBook } from '../types';

export const MyBooks: React.FC = () => {
  const { purchasedBooks, openReader, downloadBook, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(purchasedBooks.map(b => b.category)))];

  const filtered = purchasedBooks.filter(book => {
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory === 'All' || book.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Patron Personal Repository
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
            My Books ({purchasedBooks.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Your active digital lending rights, permanent acquisitions, and annotated textbooks.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('browse')}
          className="self-start sm:self-auto px-4 py-2 bg-slate-900 hover:bg-indigo-950 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
        >
          <span>Acquire More Books</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search my bookshelf..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-900/20 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bookshelf Display */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-slate-900 text-lg">No books in this view</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our academic library repository to add textbooks, literature, and monographs to your bookshelf.
          </p>
          <button
            onClick={() => setActiveTab('browse')}
            className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-indigo-950 transition"
          >
            Explore Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book) => {
            const progress = book.readingProgress || 20;

            return (
              <div
                key={book.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Book Card Upper */}
                <div className="p-5 flex gap-4">
                  {/* Cover */}
                  <div className="w-24 h-32 rounded-lg overflow-hidden bg-slate-100 shadow-md shrink-0 border border-slate-200 relative group cursor-pointer">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                      {book.category}
                    </span>

                    <h3 className="font-serif font-bold text-slate-950 text-sm leading-snug line-clamp-2">
                      {book.title}
                    </h3>

                    <p className="text-xs text-slate-600 truncate">
                      By <span className="font-medium text-slate-800">{book.author}</span>
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono space-y-0.5 pt-1">
                      <div className="flex items-center gap-1 truncate">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>Acquired: {book.purchaseDate}</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium">
                        Order #{book.orderId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reading Progress Indicator */}
                <div className="px-5 pb-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Reading Progress</span>
                    <span className="font-mono font-bold text-slate-800">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions Footer: Read & Download */}
                <div className="bg-slate-50 border-t border-slate-100 p-3.5 px-5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openReader(book)}
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Book</span>
                  </button>

                  <button
                    onClick={() => downloadBook(book)}
                    className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-2xs"
                    title="Download offline e-book file (PDF / ePub)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
