/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookReaderModal } from './components/BookReaderModal';

// Pages
import { Home } from './pages/Home';
import { BrowseBooks } from './pages/BrowseBooks';
import { BookDetails } from './pages/BookDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { MyBooks } from './pages/MyBooks';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Categories } from './pages/Categories';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, toast } = useApp();

  // Route selector
  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'browse':
        return <BrowseBooks />;
      case 'categories':
        return <Categories />;
      case 'book-details':
        return <BookDetails />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'my-books':
        return <MyBooks />;
      case 'profile':
        return <Profile />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Primary Navigation Bar */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Primary Global Footer */}
      <Footer />

      {/* Global Interactive Reading Modal */}
      <BookReaderModal />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2.5 text-xs font-medium ${
            toast.type === 'error'
              ? 'bg-red-950 text-white border-red-800'
              : toast.type === 'info'
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-slate-950 text-white border-slate-800'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
