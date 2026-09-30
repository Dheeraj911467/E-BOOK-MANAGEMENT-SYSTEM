import React from 'react';
import { Book } from '../types';
import { Star, ShoppingCart, Eye, BookOpen, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BookCardProps {
  book: Book;
  viewMode?: 'grid' | 'list';
}

export const BookCard: React.FC<BookCardProps> = ({ book, viewMode = 'grid' }) => {
  const { viewBookDetails, addToCart, cart } = useApp();
  const isInCart = cart.some(item => item.book.id === book.id);

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-indigo-300 hover:shadow-md transition group">
        <div 
          onClick={() => viewBookDetails(book)}
          className="w-24 h-32 sm:w-28 sm:h-36 shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-sm cursor-pointer relative group/img"
        >
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {book.badge && (
            <span className="absolute top-1 left-1 bg-slate-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shadow">
              {book.badge}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
              {book.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{book.format}</span>
          </div>

          <h3 
            onClick={() => viewBookDetails(book)}
            className="font-serif font-bold text-slate-900 text-base sm:text-lg hover:text-indigo-900 cursor-pointer line-clamp-1 group-hover:text-indigo-900 transition"
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-600 mb-2">By <span className="font-medium text-slate-800">{book.author}</span></p>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {book.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-bold text-slate-800">{book.rating}</span>
              <span className="text-slate-400 ml-0.5">({book.reviewsCount})</span>
            </div>
            <span>•</span>
            <span>{book.pages} pages</span>
            <span>•</span>
            <span>{book.publicationYear}</span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
          <div className="text-left sm:text-right">
            <div className="text-xl font-bold font-serif text-slate-900">
              ${book.price.toFixed(2)}
            </div>
            {book.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => viewBookDetails(book)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Details
            </button>
            <button
              onClick={() => addToCart(book)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 shadow-sm ${
                isInCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-900 hover:bg-indigo-950 text-white'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col group">
      
      {/* Book Cover Container with academic styling */}
      <div 
        onClick={() => viewBookDetails(book)}
        className="relative aspect-[3/4] bg-slate-100 overflow-hidden cursor-pointer p-4 flex items-center justify-center border-b border-slate-100 group/cover"
      >
        <div className="w-full h-full relative shadow-md group-hover/cover:scale-105 group-hover/cover:shadow-xl transition-all duration-300 rounded overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle book spine overlay effect */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Badge */}
        {book.badge && (
          <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
            {book.badge}
          </span>
        )}

        {/* Format tag */}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur text-slate-700 border border-slate-200 text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
          {book.format.split(' ')[0]}
        </span>
      </div>

      {/* Book Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
              {book.category}
            </span>
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-bold text-slate-800 text-xs">{book.rating}</span>
              <span className="text-slate-400 text-[11px] ml-0.5">({book.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => viewBookDetails(book)}
            className="font-serif font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-indigo-900 cursor-pointer transition mb-1"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-1 mb-2">
            By <span className="text-slate-800 font-medium">{book.author}</span>
          </p>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-serif text-slate-900">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Digital Access</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => viewBookDetails(book)}
              className="p-2 text-slate-600 hover:text-indigo-900 hover:bg-slate-100 rounded-lg transition"
              title="View Book Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => addToCart(book)}
              className={`p-2 rounded-lg transition shadow-sm ${
                isInCart
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-900 hover:bg-indigo-950 text-white'
              }`}
              title={isInCart ? 'Already in cart' : 'Add to Cart'}
            >
              {isInCart ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
