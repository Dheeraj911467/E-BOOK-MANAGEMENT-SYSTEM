import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  BookOpen, 
  CreditCard,
  FileCheck
} from 'lucide-react';

export const Cart: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartSubtotal, 
    cartTax, 
    cartFinalTotal, 
    setActiveTab, 
    viewBookDetails 
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-14 shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
            You haven't selected any digital e-books or university manuscripts for purchase yet.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('browse')}
              className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-950 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow"
            >
              Browse Library Collections
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Institutional Patron Desk
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
            Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All Items
        </button>
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
            {cart.map((item) => (
              <div key={item.book.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Book Info */}
                <div className="flex items-start gap-4">
                  <div 
                    onClick={() => viewBookDetails(item.book)}
                    className="w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden bg-slate-100 shadow-sm shrink-0 cursor-pointer border border-slate-200"
                  >
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.book.category}
                    </span>
                    <h3 
                      onClick={() => viewBookDetails(item.book)}
                      className="font-serif font-bold text-sm sm:text-base text-slate-900 hover:text-indigo-900 cursor-pointer leading-snug"
                    >
                      {item.book.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      By <span className="text-slate-800 font-medium">{item.book.author}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Format: {item.selectedFormat || item.book.format}
                    </p>
                  </div>
                </div>

                {/* Pricing, Quantity Controls & Remove */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-slate-200 text-slate-600 transition"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-slate-200 text-slate-600 transition"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal for line item */}
                  <div className="text-right">
                    <div className="font-serif font-bold text-base text-slate-900">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      (${item.book.price.toFixed(2)} each)
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.book.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Remove book from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Continue Browsing Books
            </button>
          </div>
        </div>

        {/* Right Side: Order Summary Calculation & Checkout Action */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 sticky top-24">
            <h2 className="font-serif font-bold text-slate-950 text-lg border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Catalogue Subtotal</span>
                <span className="font-mono font-medium text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Educational Platform Fee (5%)</span>
                <span className="font-mono font-medium text-slate-900">${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-700 font-medium">
                <span>Academic Library Grant</span>
                <span className="font-mono">FREE Instant Delivery</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between text-base font-bold text-slate-950">
                <span className="font-serif">Total Due</span>
                <span className="font-serif text-xl font-extrabold text-slate-900 font-mono">
                  ${cartFinalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('checkout')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-indigo-950 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Reassurances */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Permanent lifetime personal access included</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Automatically added to your My Books library</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
