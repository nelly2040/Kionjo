// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext'; // Fixed: AuthContexts
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import Users from './pages/admin/Users';
import Orders from './pages/admin/Orders'; // ADD THIS IMPORT

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-cream flex flex-col">
            {/* Public Routes - Show Navbar & Footer */}
            <Routes>
              <Route path="/admin/*" element={
                // Admin routes don't show the public navbar/footer
                <AdminRoutes />
              } />
              <Route path="*" element={
                // Public routes show navbar and footer
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>

            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#8B4513',
                  color: '#FFD700',
                },
                success: {
                  iconTheme: {
                    primary: '#FFD700',
                    secondary: '#8B4513',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// Admin Routes Configuration (nested inside AdminLayout)
const AdminRoutes = () => (
  <AdminLayout>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="products/new" element={<ProductForm />} />
      <Route path="products/edit/:id" element={<ProductForm />} />
      <Route path="users" element={<Users />} />
      <Route path="orders" element={<Orders />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  </AdminLayout>
);

// Settings Page Component
const SettingsPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-charcoal mb-8">Admin Settings</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Store Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="bg-kenyan-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <span className="text-xl">🏪</span>
          </div>
          <h2 className="text-xl font-semibold text-charcoal">Store Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Kionjo Crafts"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="hello@kionjo.com"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="bg-kenyan-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <span className="text-xl">💳</span>
          </div>
          <h2 className="text-xl font-semibold text-charcoal">Payment Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripe Public Key
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="pk_test_..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripe Secret Key
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="sk_test_..."
            />
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="bg-kenyan-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <span className="text-xl">🚚</span>
          </div>
          <h2 className="text-xl font-semibold text-charcoal">Shipping Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Cost
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="15.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Free Shipping Threshold
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="100.00"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="bg-kenyan-gold rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <span className="text-xl">🔔</span>
          </div>
          <h2 className="text-xl font-semibold text-charcoal">Notifications</h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-kenyan-brown" defaultChecked />
            <span className="ml-2 text-sm text-gray-700">Email notifications for new orders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-kenyan-brown" defaultChecked />
            <span className="ml-2 text-sm text-gray-700">Low stock alerts</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-kenyan-brown" />
            <span className="ml-2 text-sm text-gray-700">Weekly sales reports</span>
          </label>
        </div>
      </div>
    </div>

    {/* Save Settings Button */}
    <div className="mt-8 flex justify-end">
      <button className="bg-maasai-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200 font-semibold">
        Save Settings
      </button>
    </div>
  </div>
);

export default App;