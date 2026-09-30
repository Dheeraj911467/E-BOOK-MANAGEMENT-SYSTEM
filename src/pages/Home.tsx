import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Laptop, 
  Bookmark, 
  TrendingUp, 
  Layers, 
  Star,
  CheckCircle2,
  BookMarked
} from 'lucide-react';
import { BookCard } from '../components/BookCard';

export const Home: React.FC = () => {
  const { books, setActiveTab, viewBookDetails, addToCart } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [heroDiscipline, setHeroDiscipline] = useState('All Disciplines');

  // Featured book (Principles of Distributed Systems)
  const featuredBook = books.find(b => b.id === 'book-cs-03') || books[0];

  // Popular books
  const popularBooks = books.slice(0, 4);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('browse');
  };

  const disciplineCards = [
    { title: 'Computer Science & Tech', count: '340+ books', icon: Laptop, category: 'Computer Science' },
    { title: 'Literature & Fiction', count: '520+ books', icon: BookMarked, category: 'Fiction' },
    { title: 'Economics & Business', count: '210+ books', icon: TrendingUp, category: 'Business' },
    { title: 'Physical Sciences', count: '180+ books', icon: Sparkles, category: 'Science' },
    { title: 'History & Philosophy', count: '290+ books', icon: GraduationCap, category: 'History' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-900 text-xs font-semibold tracking-wide">
              <GraduationCap className="w-4 h-4 text-indigo-700" />
              <span>Official University Academic Digital Press & Repository</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              Discover Your Next Great Read
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore thousands of curated academic textbooks, classic literature, and contemporary research papers available instantly on any device.
            </p>

            {/* Centralized Search Bar */}
            <form 
              onSubmit={handleHeroSubmit}
              className="mt-6 p-2 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 w-full sm:w-auto px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={heroDiscipline}
                  onChange={(e) => setHeroDiscipline(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option>All Disciplines</option>
                  <option>Computer Science</option>
                  <option>Fiction</option>
                  <option>Science</option>
                  <option>Business</option>
                  <option>History</option>
                </select>
              </div>

              <div className="flex items-center gap-2 flex-1 w-full px-3">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search by title, author, DOI, or ISBN..."
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-indigo-950 text-white text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setActiveTab('browse')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-950 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition"
              >
                Browse All Books
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition"
              >
                Explore University Collections
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Book Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Book Cover with 3D drop shadow */}
            <div className="md:col-span-4 flex justify-center">
              <div 
                onClick={() => viewBookDetails(featuredBook)}
                className="relative cursor-pointer group"
              >
                <div className="w-48 sm:w-56 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105 border border-slate-200">
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded shadow">
                  Staff Pick
                </span>
              </div>
            </div>

            {/* Book Content Summary */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-slate-500">ISBN: {featuredBook.isbn}</span>
                <span className="text-slate-300">•</span>
                <span className="bg-indigo-50 text-indigo-900 font-semibold px-2 py-0.5 rounded text-[11px]">
                  Academic Monograph
                </span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-bold text-slate-800">{featuredBook.rating}</span>
                  <span className="text-slate-400 ml-1">({featuredBook.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 
                onClick={() => viewBookDetails(featuredBook)}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 hover:text-indigo-900 cursor-pointer transition leading-tight"
              >
                {featuredBook.title}
              </h2>

              <p className="text-sm text-slate-600 font-medium">
                By <span className="text-slate-900">{featuredBook.author}</span> • {featuredBook.publisher}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {featuredBook.description}
              </p>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-serif font-bold text-slate-950">
                  ${featuredBook.price.toFixed(2)}
                </span>
                {featuredBook.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${featuredBook.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md">
                  Digital Instant Access Included
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => addToCart(featuredBook)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-950 text-white text-sm font-semibold rounded-lg transition shadow flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => viewBookDetails(featuredBook)}
                  className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Titles & Recommended Readings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-950">
              Popular Titles & Recommended Readings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated high-circulation books across computer science, literature, and general science.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="text-xs font-semibold text-indigo-900 hover:text-indigo-950 flex items-center gap-1 group"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Academic Disciplines Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-950">
            Browse Academic Disciplines
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Categorized indices aligned with Dewey Decimal and Library of Congress classification structures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {disciplineCards.map((disc, idx) => {
            const Icon = disc.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab('categories')}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-400 hover:shadow-md cursor-pointer transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center mb-3 group-hover:bg-indigo-900 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-sm group-hover:text-indigo-900 transition">
                    {disc.title}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 mt-3 font-mono">
                  {disc.count}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Repository Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-8 sm:p-10 border border-slate-800">
          <div className="max-w-3xl space-y-3">
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-wider">
              Academic Library Advantage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Built for Scholars, Students, and Researchers
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every acquired title remains permanently accessible in your digital bookshelf with built-in distraction-free reading, customizable fonts, and offline capability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-800">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-slate-800 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Instant Cloud Sync</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless synchronization with Firebase Firestore to retain your purchases and progress across sessions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-slate-800 text-indigo-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Open Academic Formats</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download verified sample PDF & ePub files formatted for academic e-readers and tablet study.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-slate-800 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Institutional Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protected by multi-factor authentication, campus SSO tokens, and verifiable patron IDs.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
