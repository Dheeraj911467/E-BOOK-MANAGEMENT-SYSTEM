import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw,
  BookOpen,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES } from '../data/sampleBooks';

export const BrowseBooks: React.FC = () => {
  const { books } = useApp();

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'title'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    books.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [books]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedFormat('all');
    setMaxPrice(100);
    setMinRating(0);
    setSortBy('featured');
  };

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search filter (title, author, isbn, description)
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(query);
          const matchAuthor = book.author.toLowerCase().includes(query);
          const matchIsbn = book.isbn.toLowerCase().includes(query);
          const matchCat = book.category.toLowerCase().includes(query);
          if (!matchTitle && !matchAuthor && !matchIsbn && !matchCat) return false;
        }

        // Category filter
        if (selectedCategories.length > 0) {
          if (!selectedCategories.includes(book.category)) return false;
        }

        // Price filter
        if (book.price > maxPrice) return false;

        // Rating filter
        if (book.rating < minRating) return false;

        // Format filter
        if (selectedFormat !== 'all') {
          if (!book.format.toLowerCase().includes(selectedFormat.toLowerCase())) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0; // default featured
      });
  }, [books, searchTerm, selectedCategories, maxPrice, minRating, selectedFormat, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Breadcrumb & Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
              Library Repository • Academic & Trade Catalog
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
              Browse Digital Collections
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Discover, read, and cite 140,000+ digital texts, peer-reviewed journals, and literary publications.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            Active System Session: <span className="font-semibold text-slate-800">Spring 2026 Semester</span>
          </div>
        </div>

        {/* Global Catalog Search Bar */}
        <div className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, topic, ISBN, or keywords..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-800"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Curated quick tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-500">
          <span className="font-medium mr-1 text-[11px] uppercase tracking-wider text-slate-400">Curated Tags:</span>
          {['Artificial Intelligence', 'Postcolonial Theory', 'Computational Discrete Math', 'Modern European History', 'Macroeconomic Governance'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-600 text-[11px] border border-slate-200 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Left Filter Sidebar */}
        <div className={`md:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-900" />
              <h2 className="font-serif font-bold text-slate-900 text-base">Filters</h2>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-indigo-900 hover:text-indigo-950 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          {/* Categories Checklist */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Disciplines & Categories
            </h3>
            <div className="space-y-2">
              {CATEGORIES.filter(c => c !== 'All Disciplines').map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 cursor-pointer py-0.5 group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-slate-300 text-indigo-900 focus:ring-indigo-900/20"
                      />
                      <span className={`group-hover:text-indigo-900 ${isSelected ? 'font-bold text-indigo-950' : ''}`}>
                        {cat}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider text-slate-500">
                Price Cap
              </span>
              <span className="font-bold font-mono text-slate-900">${maxPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$10</span>
              <span>$50</span>
              <span>$100</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Minimum Rating
            </h3>
            <div className="space-y-1.5 text-xs">
              {[4.8, 4.5, 4.0, 0].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                    className="text-indigo-900 focus:ring-indigo-900/20"
                  />
                  <span>{r === 0 ? 'All Ratings' : `${r} ★ & above`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Format
            </h3>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Formats' },
                { id: 'epub', label: 'ePub (Reflowable)' },
                { id: 'pdf', label: 'PDF (Academic Print Replica)' },
                { id: 'interactive', label: 'Interactive Web Reader' },
              ].map((f) => (
                <label key={f.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="format"
                    checked={selectedFormat === f.id}
                    onChange={() => setSelectedFormat(f.id)}
                    className="text-indigo-900 focus:ring-indigo-900/20"
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Area: Results Bar & Books Grid */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Controls bar: Results Count & Sort Dropdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="text-xs text-slate-600">
              Showing <span className="font-bold text-slate-900">{filteredBooks.length}</span> of {books.length} E-Books
              {selectedCategories.length > 0 && (
                <span className="ml-1 text-slate-400">
                  (Filtered: {selectedCategories.join(', ')})
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-900"
                >
                  <option value="featured">Most Popular / Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title">Alphabetical (A - Z)</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 ${viewMode === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Books List or Grid */}
          {filteredBooks.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">
                No matching e-books found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We could not find any titles matching your search criteria or active filters. Try broadening your keywords.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-indigo-950 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} viewMode="list" />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
