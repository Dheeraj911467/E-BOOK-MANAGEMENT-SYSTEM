import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Globe, 
  Calendar, 
  Building, 
  Check, 
  Share2, 
  Bookmark,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Book } from '../types';

export const BookDetails: React.FC = () => {
  const { 
    selectedBook, 
    books, 
    setActiveTab, 
    addToCart, 
    cart, 
    openReader, 
    downloadBook,
    showToast 
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'overview' | 'toc' | 'excerpt'>('overview');
  const [selectedFormat, setSelectedFormat] = useState<string>('ePub + PDF');

  // Fallback if no selected book
  const book: Book = selectedBook || books[0];
  const isInCart = cart.some(item => item.book.id === book.id);

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart(book, 1, selectedFormat);
    }
    setActiveTab('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('browse')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </button>

        <div className="text-xs text-slate-400 font-mono hidden sm:block">
          Repository Item #{book.id} • ISBN {book.isbn}
        </div>
      </div>

      {/* Main Book Spotlight Showcase */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Book Cover Presentation with academic shadow */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none"></div>
              {book.badge && (
                <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  {book.badge}
                </span>
              )}
            </div>

            {/* Quick interactive buttons underneath */}
            <div className="w-full max-w-xs mt-6 flex gap-2">
              <button
                onClick={() => openReader(book)}
                className="flex-1 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-indigo-200"
              >
                <BookOpen className="w-4 h-4" />
                Read Preview
              </button>
              <button
                onClick={() => downloadBook(book)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-200"
                title="Download Sample Chapter"
              >
                <FileText className="w-4 h-4" />
                Sample
              </button>
            </div>
          </div>

          {/* Right Column: Complete Metadata, Pricing, Actions */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top metadata tags */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md">
                  {book.category}
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {book.format}
                </span>
                <div className="flex items-center text-amber-500 bg-amber-50 px-2.5 py-1 rounded-md text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span className="text-slate-900">{book.rating}</span>
                  <span className="text-slate-400 font-normal ml-1">({book.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight">
                {book.title}
              </h1>

              <p className="text-base text-slate-700 font-medium">
                Written by <span className="text-slate-950 font-bold">{book.author}</span>
              </p>
            </div>

            {/* Price Box & Format selection */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Single Institutional Digital License</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-slate-950">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded ml-2">
                    Save {(100 - (book.price / (book.originalPrice || book.price)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Format dropdown */}
              <div className="w-full sm:w-auto">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Distribution Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full sm:w-auto text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                >
                  <option value="ePub + PDF">ePub + PDF (Full Bundle)</option>
                  <option value="PDF Replica">PDF (Print Replica)</option>
                  <option value="Interactive Web Reader">Interactive Web Reader</option>
                  <option value="ePub">ePub Standard</option>
                </select>
              </div>
            </div>

            {/* Core Action Buttons: Add to Cart & Buy Now */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => addToCart(book, 1, selectedFormat)}
                className={`w-full sm:w-auto flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-sm ${
                  isInCart
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-900 hover:bg-indigo-950 text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart ({cart.find(i => i.book.id === book.id)?.quantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Buy Now (Proceed to Checkout)
              </button>
            </div>

            {/* Book Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium block">Total Pages</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-700" />
                  {book.pages} pages
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium block">Language</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-700" />
                  {book.language}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium block">Publication Year</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-700" />
                  {book.publicationYear}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 font-medium block">Publisher</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5 truncate" title={book.publisher}>
                  <Building className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  {book.publisher}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Content Sections: Overview, Table of Contents, Excerpt */}
        <div className="mt-12 border-t border-slate-200 pt-6">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTabSub('overview')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTabSub === 'overview'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Overview & Abstract
            </button>
            <button
              onClick={() => setActiveTabSub('toc')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTabSub === 'toc'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Table of Contents
            </button>
            <button
              onClick={() => setActiveTabSub('excerpt')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTabSub === 'excerpt'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Sample Excerpt
            </button>
          </div>

          <div className="py-6">
            {activeTabSub === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Book Abstract & Description
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {book.longDescription || book.description}
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">Citation Information (MLA / Chicago Style):</div>
                  <p className="font-mono text-[11px] text-slate-500">
                    {book.author}. <em>{book.title}</em>. {book.publisher}, {book.publicationYear}. ISBN: {book.isbn}.
                  </p>
                </div>
              </div>
            )}

            {activeTabSub === 'toc' && (
              <div className="max-w-2xl space-y-3">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Table of Contents
                </h3>
                {book.tableOfContents && book.tableOfContents.length > 0 ? (
                  <ul className="space-y-2">
                    {book.tableOfContents.map((chapter, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-mono text-slate-700 border border-slate-200">
                        <span className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500">
                    Detailed chapter contents available upon acquisition or in the digital reader.
                  </p>
                )}
              </div>
            )}

            {activeTabSub === 'excerpt' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Author's Opening Excerpt
                </h3>
                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 font-serif text-slate-800 text-sm leading-relaxed whitespace-pre-line italic">
                  {book.sampleExcerpt || book.description}
                </div>
                <button
                  onClick={() => openReader(book)}
                  className="px-4 py-2 bg-indigo-900 text-white rounded-lg text-xs font-semibold hover:bg-indigo-950 transition"
                >
                  Launch Fullscreen Reader
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
