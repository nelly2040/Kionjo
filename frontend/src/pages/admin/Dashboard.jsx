// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { usersAPI, ordersAPI, productsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch data in parallel
      const [usersResponse, ordersResponse, productsResponse] = await Promise.all([
        usersAPI.getAll({ limit: 1000 }), // Get all users for count
        ordersAPI.getAll({ limit: 5 }),   // Get recent orders
        productsAPI.getAll({ limit: 1000 }) // Get all products for count
      ]);

      setStats({
        totalUsers: usersResponse.count || 0,
        totalOrders: ordersResponse.total || 0,
        totalProducts: productsResponse.total || 0,
        recentOrders: ordersResponse.orders || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Access denied. Admin privileges required.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-kenyan-gold">
          <div className="flex items-center">
            <div className="bg-kenyan-gold rounded-full p-3 mr-4">
              <span className="text-kenyan-brown text-xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-charcoal">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-maasai-red">
          <div className="flex items-center">
            <div className="bg-maasai-red rounded-full p-3 mr-4">
              <span className="text-white text-xl">📦</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-charcoal">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-kenyan-brown">
          <div className="flex items-center">
            <div className="bg-kenyan-brown rounded-full p-3 mr-4">
              <span className="text-kenyan-gold text-xl">🛍️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-charcoal">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-4">Recent Orders</h2>
        {stats.recentOrders.length > 0 ? (
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order._id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {order.user?.firstName} {order.user?.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total?.toFixed(2)}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No recent orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;