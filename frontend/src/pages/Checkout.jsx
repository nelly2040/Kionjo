// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { CreditCard, Truck, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      setStep(3);
    }, 2000);
  };

  const subtotal = getCartTotal();
  const shipping = 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.items.length === 0 && step !== 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Your cart is empty</h2>
          <p className="text-yellow-700 mb-4">Add some products to your cart before checking out.</p>
          <a
            href="/products"
            className="bg-maasai-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= stepNumber ? 'bg-maasai-red text-white' : 'bg-gray-300 text-gray-600'
              } font-semibold`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-20 h-1 ${
                  step > stepNumber ? 'bg-maasai-red' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-maasai-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200 flex items-center justify-center"
                >
                  Continue to Payment
                  <CreditCard className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Payment Information</h2>
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-maasai-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                >
                  Place Order - ${total.toFixed(2)}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-charcoal mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been confirmed and will be shipped within 3-5 business days.
              </p>
              <div className="bg-cream rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• You will receive an email confirmation shortly</li>
                  <li>• Your order will be processed by our artisans</li>
                  <li>• We'll notify you when your order ships</li>
                  <li>• Expected delivery: 7-14 business days</li>
                </ul>
              </div>
              <div className="space-x-4">
                <a
                  href="/products"
                  className="bg-maasai-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                >
                  Continue Shopping
                </a>
                <a
                  href="/"
                  className="border border-kenyan-brown text-kenyan-brown px-6 py-3 rounded-lg font-semibold hover:bg-kenyan-brown hover:text-white transition duration-200"
                >
                  Back to Home
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 className="text-xl font-bold text-charcoal mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold text-charcoal">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over $100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;