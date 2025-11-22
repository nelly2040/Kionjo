// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingCart, BarChart3, Settings, Plus } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 30,
    totalUsers: 125,
    totalOrders: 89,
    revenue: 4567.89
  });

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 145.99, status: 'Delivered', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Sarah Smith', amount: 78.00, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: 225.50, status: 'Processing', date: '2024-01-13' },
    { id: 'ORD-004', customer: 'Emily Brown', amount: 92.75, status: 'Pending', date: '2024-01-12' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Admin Dashboard</h1>
        <Link
          to="/admin/products/new"
          className="bg-maasai-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-kenyan-gold rounded-full p-3 mr-4">
              <Package className="h-6 w-6 text-kenyan-brown" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-charcoal">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-kenyan-gold rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-kenyan-brown" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-charcoal">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-kenyan-gold rounded-full p-3 mr-4">
              <ShoppingCart className="h-6 w-6 text-kenyan-brown" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-charcoal">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-kenyan-gold rounded-full p-3 mr-4">
              <BarChart3 className="h-6 w-6 text-kenyan-brown" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-charcoal">${stats.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-charcoal mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-semibold text-charcoal">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-kenyan-chocolate">${order.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/admin/orders"
            className="block text-center mt-4 text-kenyan-brown hover:text-kenyan-chocolate font-semibold"
          >
            View All Orders
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-charcoal mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/products"
              className="bg-cream rounded-lg p-4 text-center hover:bg-kenyan-gold transition duration-200"
            >
              <Package className="h-8 w-8 text-kenyan-brown mx-auto mb-2" />
              <p className="font-semibold text-charcoal">Manage Products</p>
            </Link>
            <Link
              to="/admin/users"
              className="bg-cream rounded-lg p-4 text-center hover:bg-kenyan-gold transition duration-200"
            >
              <Users className="h-8 w-8 text-kenyan-brown mx-auto mb-2" />
              <p className="font-semibold text-charcoal">Manage Users</p>
            </Link>
            <Link
              to="/admin/orders"
              className="bg-cream rounded-lg p-4 text-center hover:bg-kenyan-gold transition duration-200"
            >
              <ShoppingCart className="h-8 w-8 text-kenyan-brown mx-auto mb-2" />
              <p className="font-semibold text-charcoal">View Orders</p>
            </Link>
            <Link
              to="/admin/settings"
              className="bg-cream rounded-lg p-4 text-center hover:bg-kenyan-gold transition duration-200"
            >
              <Settings className="h-8 w-8 text-kenyan-brown mx-auto mb-2" />
              <p className="font-semibold text-charcoal">Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;