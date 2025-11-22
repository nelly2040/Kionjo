// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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

// Admin Components - FIXED: Use different import names
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products'; // FIXED: Changed import name
import ProductForm from './pages/admin/ProductForm';
import Users from './pages/admin/Users';

function App() {
  return (
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
      <Route path="orders" element={<OrdersPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  </AdminLayout>
);

// Placeholder components for admin routes
const OrdersPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-charcoal mb-8">Order Management</h1>
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="bg-kenyan-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📦</span>
      </div>
      <h2 className="text-xl font-semibold text-charcoal mb-2">Orders Management</h2>
      <p className="text-gray-600 mb-4">Complete order tracking and management system</p>
      <p className="text-sm text-gray-500">This feature will be implemented in the backend phase</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-charcoal mb-8">Admin Settings</h1>
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="bg-kenyan-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚙️</span>
      </div>
      <h2 className="text-xl font-semibold text-charcoal mb-2">System Settings</h2>
      <p className="text-gray-600 mb-4">Configure your store settings and preferences</p>
      <p className="text-sm text-gray-500">This feature will be implemented in the backend phase</p>
    </div>
  </div>
);

export default App;