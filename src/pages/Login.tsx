import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

export const Login: React.FC = () => {
  const { loginWithDemo, loginWithGoogle, setActiveTab, showToast } = useApp();
  
  const [email, setEmail] = useState('student@campus.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = 'Email or Patron ID is required';
    } else if (!email.includes('@')) {
      errs.email = 'Please enter a valid institutional email';
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await loginWithDemo(email, email.includes('admin') ? 'admin' : 'student');
    } catch {
      showToast('Could not complete sign in', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Top Back Link */}
      <div className="max-w-md w-full mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Catalog Home</span>
        </button>
        <span className="text-[11px] font-mono text-slate-400 uppercase">
          University Repository
        </span>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Academic Card Top Stripe */}
        <div className="h-1.5 bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-600"></div>

        <div className="p-8 sm:p-10 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-indigo-400 flex items-center justify-center mx-auto shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500">
              Welcome back! Sign in to access your digital library, textbooks, and reading notes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email / Patron ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                University Email or Patron ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campus.edu"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Account Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Demo accounts: use any sample password or credentials below.', 'info')}
                  className="text-[11px] text-indigo-900 hover:text-indigo-950 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-indigo-900 focus:ring-indigo-900/20"
                />
                <span className="text-xs text-slate-600">Keep me signed in on this workstation</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-indigo-950 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Google Sign-in with Firebase Auth */}
          <div className="space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                Or Continue With
              </span>
            </div>

            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-2.5 transition shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign In with University Google Account</span>
            </button>
          </div>

          {/* Quick Demo Credentials Info Callout */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-700" />
              <span>University Demo Credentials</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono space-y-0.5 pt-1">
              <div><strong>Student:</strong> student@campus.edu</div>
              <div><strong>Admin:</strong> admin@library.edu</div>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
            Don't have an account?{' '}
            <button
              onClick={() => setActiveTab('register')}
              className="font-bold text-indigo-900 hover:text-indigo-950 underline"
            >
              Create Account
            </button>
          </div>

        </div>

      </div>

      <div className="text-center mt-6 text-xs text-slate-400">
        Protected by Campus SSO & Multi-Factor Identity Services.
      </div>
    </div>
  );
};
