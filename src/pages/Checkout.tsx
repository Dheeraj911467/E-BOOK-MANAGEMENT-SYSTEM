import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  Check, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { CheckoutDetails } from '../types';

export const Checkout: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartTax, 
    cartFinalTotal, 
    currentUser, 
    checkoutOrder, 
    setActiveTab, 
    showToast 
  } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ id: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: currentUser?.fullName || 'Alex Rivers',
    email: currentUser?.email || 'alex.rivers@university.edu',
    institution: 'University College & Digital Research Lab',
    studentFacultyId: currentUser?.membershipId || 'PATRON-982142',
    billingAddress: '450 University Campus Boulevard',
    city: 'Cambridge',
    country: 'United States',
    postalCode: '02138',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    grantCode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid academic email is required';
    if (!formData.billingAddress.trim()) errs.billingAddress = 'Address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await checkoutOrder(formData);
      if (res.success) {
        setCompletedOrder({ id: res.orderId });
        showToast('Order confirmed! E-books added to My Books.');
      }
    } catch (e: any) {
      showToast('Error processing simulated order.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transaction Approved & Authorized
            </span>
            <h1 className="font-serif text-3xl font-extrabold text-slate-950">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your academic e-books have been permanently activated on your patron account.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-left text-xs font-mono space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Order Reference:</span>
              <span className="font-bold text-slate-900">{completedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Patron Email:</span>
              <span className="text-slate-900 truncate">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Licensing Status:</span>
              <span className="text-emerald-700 font-bold">Perpetual Access</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('my-books')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-indigo-950 text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Go to "My Books" (Start Reading)
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm rounded-xl transition"
            >
              Browse More Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-900">Checkout Cart is Empty</h2>
        <p className="text-xs text-slate-500">Please choose books to checkout.</p>
        <button
          onClick={() => setActiveTab('browse')}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <button
            onClick={() => setActiveTab('cart')}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Cart
          </button>
          <h1 className="font-serif text-3xl font-bold text-slate-950">
            Checkout & Acquisition License
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Demo Gateway</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Form for Billing & Simulated Payment */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Step 1: Patron Details */}
            <div>
              <h2 className="font-serif font-bold text-slate-950 text-base mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>Patron & Academic Institution</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Affiliated Institution
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student / Faculty Patron ID
                  </label>
                  <input
                    type="text"
                    value={formData.studentFacultyId}
                    onChange={(e) => setFormData({ ...formData, studentFacultyId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Billing Address */}
            <div className="border-t border-slate-100 pt-6">
              <h2 className="font-serif font-bold text-slate-950 text-base mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>Billing Address & Location</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress}
                    onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                  />
                  {errors.billingAddress && <p className="text-[11px] text-red-500 mt-0.5">{errors.billingAddress}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                  />
                  {errors.city && <p className="text-[11px] text-red-500 mt-0.5">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 focus:outline-none"
                  />
                  {errors.postalCode && <p className="text-[11px] text-red-500 mt-0.5">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="border-t border-slate-100 pt-6">
              <h2 className="font-serif font-bold text-slate-950 text-base mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">3</span>
                <span>Payment Method (Simulated Demo)</span>
              </h2>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${formData.paymentMethod === 'card' ? 'border-indigo-900 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="text-indigo-900"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">Credit / Debit Card (Demo)</span>
                      <span className="text-[11px] text-slate-500">Instant activation with secure sample processing</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-indigo-900" />
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${formData.paymentMethod === 'institutional_grant' ? 'border-indigo-900 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'institutional_grant'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'institutional_grant' })}
                      className="text-indigo-900"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">University Research Grant / Department Voucher</span>
                      <span className="text-[11px] text-slate-500">Directly invoiced to affiliated department faculty funds</span>
                    </div>
                  </div>
                  <Building2 className="w-5 h-5 text-indigo-900" />
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-[11px] text-slate-500">Demo Card Information pre-filled:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="col-span-2">
                      <input
                        type="text"
                        readOnly
                        value={formData.cardNumber}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded font-mono text-slate-700"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        readOnly
                        value={formData.cardExpiry}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded font-mono text-slate-700 text-center"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        readOnly
                        value={formData.cardCvc}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded font-mono text-slate-700 text-center"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-indigo-950 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Authorizing Order & Activating E-Books...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order & Authorize Acquisition (${cartFinalTotal.toFixed(2)})</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                This is a simulated demo checkout. No real financial credit card charges are incurred.
              </p>
            </div>

          </form>
        </div>

        {/* Right Side: Order Summary & Selected Books */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 sticky top-24">
            <h2 className="font-serif font-bold text-slate-950 text-base border-b border-slate-100 pb-3">
              Selected Digital E-Books ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>

            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.book.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-12 h-16 rounded object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs text-slate-900 truncate">
                      {item.book.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.book.author}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono mt-1">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-bold text-slate-900">${(item.book.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Processing:</span>
                <span className="font-mono">${cartTax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Due:</span>
                <span className="font-serif text-lg text-slate-950">${cartFinalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Immediately upon completing checkout, these titles will appear in your <strong>My Books</strong> library ready to read online or download.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
