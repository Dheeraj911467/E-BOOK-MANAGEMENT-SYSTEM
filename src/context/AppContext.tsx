import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot, 
  serverTimestamp, 
  writeBatch 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Book, CartItem, PurchasedBook, UserProfile, CheckoutDetails } from '../types';
import { SAMPLE_BOOKS } from '../data/sampleBooks';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Auth state
  currentUser: UserProfile | null;
  firebaseUser: User | null;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithDemo: (email: string, role?: 'student' | 'faculty' | 'admin') => Promise<void>;
  registerDemo: (name: string, email: string, password?: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;

  // Books catalogue
  books: Book[];
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number, format?: string) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartFinalTotal: number;

  // Purchased books (My Books)
  purchasedBooks: PurchasedBook[];
  checkoutOrder: (details: CheckoutDetails) => Promise<{ success: boolean; orderId: string }>;
  downloadBook: (book: PurchasedBook | Book) => void;
  readingBook: PurchasedBook | Book | null;
  openReader: (book: PurchasedBook | Book) => void;
  closeReader: () => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewBookDetails: (book: Book) => void;
  
  // Notification toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'ebook_app_user_profile';
const LOCAL_STORAGE_CART_KEY = 'ebook_app_cart_items';
const LOCAL_STORAGE_MY_BOOKS_KEY = 'ebook_app_purchased_books';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(true);

  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Purchased Books state with persistence & Firestore sync
  const [purchasedBooks, setPurchasedBooks] = useState<PurchasedBook[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_MY_BOOKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default starter item for instant demonstration
    return [
      {
        id: 'starter-cs-01',
        bookId: 'book-cs-01',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        coverImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=700&q=80',
        category: 'Computer Science',
        pages: 464,
        format: 'ePub + PDF',
        purchaseDate: 'Sept 15, 2026',
        orderId: 'ORD-882190',
        readingProgress: 42,
        lastReadDate: 'Yesterday',
        fileSize: '14.8 MB',
        sampleExcerpt: SAMPLE_BOOKS[0].sampleExcerpt
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<PurchasedBook | Book | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed for cart', e);
    }
  }, [cart]);

  // Sync user to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    } catch (e) {
      console.warn('LocalStorage save failed for user', e);
    }
  }, [currentUser]);

  // Sync purchased books to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MY_BOOKS_KEY, JSON.stringify(purchasedBooks));
    } catch (e) {
      console.warn('LocalStorage save failed for purchased books', e);
    }
  }, [purchasedBooks]);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            const profile: UserProfile = {
              uid: user.uid,
              fullName: data.fullName || user.displayName || 'University Scholar',
              email: user.email || '',
              role: data.role || 'student',
              department: data.department || 'Computer Science & Engineering',
              membershipId: data.membershipId || `LIB-${user.uid.slice(0, 6).toUpperCase()}`,
              avatarUrl: user.photoURL || undefined,
              joinedDate: data.joinedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              libraryNotesCount: data.libraryNotesCount || 12,
              bio: data.bio || 'Academic researcher and avid reader.'
            };
            setCurrentUser(profile);
          } else {
            // New user doc creation
            const newProfile: UserProfile = {
              uid: user.uid,
              fullName: user.displayName || 'University Scholar',
              email: user.email || '',
              role: 'student',
              department: 'General Academic Studies',
              membershipId: `LIB-${user.uid.slice(0, 6).toUpperCase()}`,
              avatarUrl: user.photoURL || undefined,
              joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              libraryNotesCount: 4,
              bio: 'Active reader exploring institutional repository collections.'
            };
            await setDoc(userDocRef, {
              uid: newProfile.uid,
              fullName: newProfile.fullName,
              email: newProfile.email,
              role: newProfile.role,
              department: newProfile.department,
              membershipId: newProfile.membershipId,
              avatarUrl: newProfile.avatarUrl || '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setCurrentUser(newProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
          // Fallback graceful profile
          if (!currentUser) {
            setCurrentUser({
              uid: user.uid,
              fullName: user.displayName || 'University Scholar',
              email: user.email || 'scholar@university.edu',
              role: 'student',
              department: 'Academic Studies',
              membershipId: `LIB-${user.uid.slice(0, 6).toUpperCase()}`
            });
          }
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore purchased books if logged into Firebase
  useEffect(() => {
    if (!firebaseUser?.uid) return;
    const subColPath = `users/${firebaseUser.uid}/purchased_books`;
    const unsubscribe = onSnapshot(
      collection(db, subColPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: PurchasedBook[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              bookId: data.bookId || docSnap.id,
              title: data.title || '',
              author: data.author || '',
              coverImage: data.coverUrl || data.coverImage || '',
              category: data.category || 'General',
              pages: data.pages || 350,
              format: data.format || 'ePub + PDF',
              purchaseDate: data.purchaseDate || 'Recent',
              orderId: data.orderId || 'ORD-SYNC',
              readingProgress: data.readingProgress || 15,
              lastReadDate: 'Recently accessed',
              fileSize: '12.4 MB'
            });
          });
          setPurchasedBooks(prev => {
            // merge unique by bookId
            const map = new Map<string, PurchasedBook>();
            list.forEach(item => map.set(item.bookId, item));
            prev.forEach(item => {
              if (!map.has(item.bookId)) map.set(item.bookId, item);
            });
            return Array.from(map.values());
          });
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, subColPath);
      }
    );
    return () => unsubscribe();
  }, [firebaseUser]);

  // Google Login
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const res = await signInWithPopup(auth, provider);
      showToast(`Welcome back, ${res.user.displayName || 'Scholar'}!`);
      setActiveTab('home');
    } catch (error: any) {
      console.error('Google Sign In failed:', error);
      showToast(error.message || 'Google Sign-in could not be completed.', 'error');
    }
  };

  // Demo Login (Simulated / LocalStorage)
  const loginWithDemo = async (email: string, role: 'student' | 'faculty' | 'admin' = 'student') => {
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const nameMap: Record<string, string> = {
      'student@campus.edu': 'Alex Rivers',
      'admin@library.edu': 'Dean Eleanor Vance',
      'faculty@university.edu': 'Prof. Julian Sterling'
    };
    const demoProfile: UserProfile = {
      uid: 'demo-' + Math.random().toString(36).substring(2, 9),
      fullName: nameMap[email.toLowerCase()] || email.split('@')[0].replace('.', ' '),
      email,
      role: email.includes('admin') ? 'admin' : role,
      department: email.includes('admin') ? 'Library Dean & Archives' : 'Computer Science & Technology',
      membershipId: `PATRON-${Math.floor(100000 + Math.random() * 900000)}`,
      joinedDate: 'Fall Semester 2025',
      libraryNotesCount: 18,
      bio: 'Enrolled in academic digital repository borrowing privileges.'
    };
    setCurrentUser(demoProfile);
    setAuthLoading(false);
    showToast(`Signed in successfully as ${demoProfile.fullName}`);
    setActiveTab('home');
  };

  // Demo Registration
  const registerDemo = async (name: string, email: string) => {
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 450));
    const newProfile: UserProfile = {
      uid: 'demo-' + Math.random().toString(36).substring(2, 9),
      fullName: name,
      email,
      role: 'student',
      department: 'University Academic Division',
      membershipId: `PATRON-${Math.floor(100000 + Math.random() * 900000)}`,
      joinedDate: 'Spring Semester 2026',
      libraryNotesCount: 0,
      bio: 'New member in the digital university repository.'
    };
    setCurrentUser(newProfile);
    setAuthLoading(false);
    showToast(`Account successfully created for ${name}!`);
    setActiveTab('home');
  };

  // Update profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);

    if (firebaseUser?.uid) {
      try {
        await setDoc(doc(db, 'users', firebaseUser.uid), updated, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${firebaseUser.uid}`);
      }
    }
    showToast('Your profile preferences have been updated.');
  };

  // Logout
  const logout = async () => {
    try {
      if (firebaseUser) {
        await fbSignOut(auth);
      }
    } catch (e) {
      console.warn('Signout err', e);
    }
    setCurrentUser(null);
    setFirebaseUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    showToast('Signed out of library session.', 'info');
    setActiveTab('home');
  };

  // Cart operations
  const addToCart = (book: Book, quantity: number = 1, format?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity, selectedFormat: format || book.format }];
    });
    showToast(`"${book.title.slice(0, 30)}..." added to your Cart!`);
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.book.id === bookId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartTotalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return Number(cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0).toFixed(2));
  }, [cart]);

  const cartTax = useMemo(() => {
    return Number((cartSubtotal * 0.05).toFixed(2)); // 5% digital educational tax/processing
  }, [cartSubtotal]);

  const cartFinalTotal = useMemo(() => {
    return Number((cartSubtotal + cartTax).toFixed(2));
  }, [cartSubtotal, cartTax]);

  // Checkout order
  const checkoutOrder = async (details: CheckoutDetails): Promise<{ success: boolean; orderId: string }> => {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newPurchases: PurchasedBook[] = cart.map((item, idx) => ({
      id: `${orderId}-${idx}`,
      bookId: item.book.id,
      title: item.book.title,
      author: item.book.author,
      coverImage: item.book.coverImage,
      category: item.book.category,
      pages: item.book.pages,
      format: item.selectedFormat || item.book.format,
      purchaseDate: nowStr,
      orderId: orderId,
      readingProgress: 0,
      lastReadDate: 'Just purchased',
      fileSize: `${(10 + Math.random() * 12).toFixed(1)} MB`,
      sampleExcerpt: item.book.sampleExcerpt
    }));

    // Update local purchased books (avoid duplicate IDs)
    setPurchasedBooks(prev => {
      const existingIds = new Set(prev.map(b => b.bookId));
      const filtered = newPurchases.filter(b => !existingIds.has(b.bookId));
      return [...filtered, ...prev];
    });

    // If authenticated in Firestore, persist purchase & order
    if (firebaseUser?.uid) {
      try {
        const batch = writeBatch(db);
        const orderRef = doc(db, 'orders', orderId);
        batch.set(orderRef, {
          id: orderId,
          userId: firebaseUser.uid,
          userEmail: firebaseUser.email || details.email,
          fullName: details.fullName,
          totalAmount: cartFinalTotal,
          items: cart.map(i => ({
            bookId: i.book.id,
            title: i.book.title,
            price: i.book.price,
            quantity: i.quantity,
            coverImage: i.book.coverImage
          })),
          status: 'completed',
          paymentMethod: details.paymentMethod,
          createdAt: new Date().toISOString()
        });

        // Add each purchased book to subcollection
        newPurchases.forEach(pb => {
          const docRef = doc(db, `users/${firebaseUser.uid}/purchased_books`, pb.bookId);
          batch.set(docRef, {
            bookId: pb.bookId,
            title: pb.title,
            author: pb.author,
            category: pb.category,
            coverUrl: pb.coverImage,
            price: cart.find(c => c.book.id === pb.bookId)?.book.price || 29.99,
            purchaseDate: pb.purchaseDate,
            orderId: pb.orderId,
            format: pb.format,
            userId: firebaseUser.uid
          });
        });

        await batch.commit();
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'orders');
      }
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    clearCart();
    return { success: true, orderId };
  };

  // Simulated download
  const downloadBook = (book: PurchasedBook | Book) => {
    const filename = `${book.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.pdf`;
    const dummyContent = `%PDF-1.4
% E-Book Management System Digital Repository
% Title: ${book.title}
% Author: ${book.author}
% Authorized Institutional Copy
% License: Academic Reading Grant
`;
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded: ${filename}`);
  };

  const openReader = (book: PurchasedBook | Book) => {
    setReadingBook(book);
  };

  const closeReader = () => {
    setReadingBook(null);
  };

  const viewBookDetails = (book: Book) => {
    setSelectedBook(book);
    setActiveTab('book-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        firebaseUser,
        authLoading,
        loginWithGoogle,
        loginWithDemo,
        registerDemo,
        updateProfile,
        logout,
        books: SAMPLE_BOOKS,
        selectedBook,
        setSelectedBook,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartTax,
        cartFinalTotal,
        purchasedBooks,
        checkoutOrder,
        downloadBook,
        readingBook,
        openReader,
        closeReader,
        activeTab,
        setActiveTab,
        viewBookDetails,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
