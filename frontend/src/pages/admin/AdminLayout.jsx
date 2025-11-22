// src/components/AdminLayout.jsx
import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Package, Users, ShoppingCart, BarChart3, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-kenyan-brown text-white">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-maasai-red rounded-full flex items-center justify-center">
              <span className="text-kenyan-gold font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                  isActiveLink(item.path)
                    ? 'bg-kenyan-gold text-kenyan-brown font-semibold'
                    : 'hover:bg-kenyan-chocolate'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-kenyan-chocolate">
          <Link
            to="/"
            className="flex items-center space-x-3 text-white hover:text-kenyan-gold transition duration-200 w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Back to Store</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;