export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: 'Computer Science' | 'Fiction' | 'Science' | 'Business' | 'Self-Development' | 'History' | 'Mathematics';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  description: string;
  longDescription?: string;
  pages: number;
  language: string;
  publicationYear: number;
  publisher: string;
  badge?: string;
  format: 'ePub + PDF' | 'PDF Replica' | 'Interactive Web Reader' | 'ePub';
  tableOfContents?: string[];
  sampleExcerpt?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
  selectedFormat?: string;
}

export interface PurchasedBook {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  pages: number;
  format: string;
  purchaseDate: string;
  orderId: string;
  readingProgress?: number; // 0 - 100%
  lastReadDate?: string;
  fileSize?: string;
  sampleExcerpt?: string;
}

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  role: 'student' | 'faculty' | 'researcher' | 'admin';
  department?: string;
  membershipId?: string;
  avatarUrl?: string;
  joinedDate?: string;
  libraryNotesCount?: number;
  bio?: string;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  institution: string;
  studentFacultyId: string;
  billingAddress: string;
  city: string;
  country: string;
  postalCode: string;
  paymentMethod: 'card' | 'institutional_grant' | 'campus_wallet';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  grantCode?: string;
}

export interface OrderRecord {
  id: string;
  userId: string;
  userEmail: string;
  fullName: string;
  items: {
    bookId: string;
    title: string;
    price: number;
    quantity: number;
    coverImage: string;
  }[];
  totalAmount: number;
  subtotal: number;
  tax: number;
  discount: number;
  createdAt: string;
  paymentMethod: string;
  status: 'completed';
}
