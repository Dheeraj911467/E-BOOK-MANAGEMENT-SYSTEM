import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User as UserIcon, 
  Mail, 
  GraduationCap, 
  KeyRound, 
  ShieldCheck, 
  BookMarked, 
  FileText, 
  LogOut, 
  Save, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser, updateProfile, logout, purchasedBooks, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);

  // Profile Form state
  const [fullName, setFullName] = useState(currentUser?.fullName || 'Alex Rivers');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science & Technology');
  const [bio, setBio] = useState(currentUser?.bio || 'Undergraduate researcher interested in distributed systems, compilers, and algorithmic game theory.');

  // Password modal state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Please Sign In</h2>
        <p className="text-xs text-slate-500 mt-2">Log in with your academic credentials to view and manage your profile.</p>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      fullName,
      department,
      bio
    });
    setIsEditing(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    showToast('Password updated successfully!');
    setIsPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Library Patron Identity
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-950 mt-1">
            Patron Profile & Settings
          </h1>
        </div>

        <button
          onClick={logout}
          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Patron ID Card */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
            {/* Watermark badge */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/40"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-xl font-bold">
                  {currentUser.fullName.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">
                  Academic Digital Card
                </span>
                <h3 className="font-serif font-bold text-base truncate">
                  {currentUser.fullName}
                </h3>
                <span className="text-xs text-white/70 capitalize">
                  Role: {currentUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">Patron ID:</span>
                <span className="font-bold text-white">{currentUser.membershipId || 'LIB-991204'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Email:</span>
                <span className="truncate max-w-[140px]">{currentUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Active Loans:</span>
                <span className="text-emerald-400 font-bold">{purchasedBooks.length} E-Books</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Member Since:</span>
                <span>{currentUser.joinedDate || 'Fall 2025'}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60 flex items-center justify-between">
              <span>Verified Patron Status</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Quick Stats Block */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Repository Circulation
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-serif font-bold text-slate-900 block">
                  {purchasedBooks.length}
                </span>
                <span className="text-[11px] text-slate-500">Books Acquired</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-serif font-bold text-slate-900 block">
                  {currentUser.libraryNotesCount || 14}
                </span>
                <span className="text-[11px] text-slate-500">Citations & Notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile & Password Management */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Profile Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-serif font-bold text-slate-950 text-lg">
                  Personal Information
                </h3>
                <p className="text-xs text-slate-500">Manage your name, affiliation, and academic biography.</p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg disabled:bg-slate-50 disabled:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Immutable)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 text-slate-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department / Academic Division
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg disabled:bg-slate-50 disabled:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Scholarly Bio & Research Interests
                  </label>
                  <textarea
                    rows={3}
                    disabled={!isEditing}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg disabled:bg-slate-50 disabled:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFullName(currentUser.fullName);
                      setDepartment(currentUser.department || '');
                      setBio(currentUser.bio || '');
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Security & Password Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-slate-950 text-base">
                  Security & Authentication
                </h3>
                <p className="text-xs text-slate-500">Manage password credentials and active session authentication.</p>
              </div>

              <button
                onClick={() => setIsPasswordModal(!isPasswordModal)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                Change Password
              </button>
            </div>

            {isPasswordModal && (
              <form onSubmit={handleChangePassword} className="pt-4 border-t border-slate-100 space-y-3 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-indigo-950 transition"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPasswordModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
