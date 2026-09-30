import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { 
  Laptop, 
  BookMarked, 
  TrendingUp, 
  Sparkles, 
  GraduationCap, 
  Binary, 
  Compass, 
  ArrowRight,
  Filter
} from 'lucide-react';

export const Categories: React.FC = () => {
  const { books, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Computer Science');

  const categoryMetadata = [
    { 
      name: 'Computer Science', 
      desc: 'Algorithms, distributed systems, clean architecture, compiler construction, and software engineering.',
      icon: Laptop,
      count: books.filter(b => b.category === 'Computer Science').length
    },
    { 
      name: 'Fiction', 
      desc: 'Classic literature, postcolonial narratives, Pulitzer prize-winning novels, and literary analysis.',
      icon: BookMarked,
      count: books.filter(b => b.category === 'Fiction').length
    },
    { 
      name: 'Science', 
      desc: 'Astrophysics, quantum mechanics, cosmology, particle dynamics, and empirical research.',
      icon: Sparkles,
      count: books.filter(b => b.category === 'Science').length
    },
    { 
      name: 'Business', 
      desc: 'Competitive strategy, industry analysis, entrepreneurial methodologies, and corporate finance.',
      icon: TrendingUp,
      count: books.filter(b => b.category === 'Business').length
    },
    { 
      name: 'Self-Development', 
      desc: 'Cognitive behavioral psychology, deliberate practice, habit architecture, and personal productivity.',
      icon: Compass,
      count: books.filter(b => b.category === 'Self-Development').length
    },
    { 
      name: 'History', 
      desc: 'Human evolution, classical Mediterranean archaeology, economic anthropology, and civilization studies.',
      icon: GraduationCap,
      count: books.filter(b => b.category === 'History').length
    },
    { 
      name: 'Mathematics', 
      desc: 'Linear algebra, proof techniques, abstract vector spaces, and foundational discrete mathematics.',
      icon: Binary,
      count: books.filter(b => b.category === 'Mathematics').length
    }
  ];

  const currentCategoryData = categoryMetadata.find(c => c.name === selectedCategory) || categoryMetadata[0];
  const booksInCurrentCategory = books.filter(b => b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Library Taxonomic Taxonomy
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
          Academic Disciplines & Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Curated subject indices structured for systematic academic research and self-paced study.
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {categoryMetadata.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-900 bg-indigo-50/70 shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-900' : 'text-slate-400'}`} />
                <span className="text-[10px] font-mono text-slate-400 font-semibold">{cat.count}</span>
              </div>
              <div>
                <h4 className={`text-xs font-serif font-bold leading-tight ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                  {cat.name}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Spotlight Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded">
              Active Category Focus
            </span>
            <span className="text-xs text-slate-400 font-mono">{booksInCurrentCategory.length} titles available</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-950 mt-2">
            {currentCategoryData.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {currentCategoryData.desc}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('browse')}
          className="shrink-0 px-4 py-2 bg-slate-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <span>Open Full Filter Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Books in this Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {booksInCurrentCategory.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

    </div>
  );
};
