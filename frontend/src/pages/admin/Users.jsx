// src/pages/admin/Users.jsx
import React, { useState, useEffect } from 'react';
import { usersAPI, ordersAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.users || []);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const response = await ordersAPI.getAll();
      const userOrders = response.orders?.filter(order => order.user?._id === userId) || [];
      setUserOrders(prev => ({ ...prev, [userId]: userOrders }));
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  const toggleUserExpansion = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
      if (!userOrders[userId]) {
        fetchUserOrders(userId);
      }
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await usersAPI.update(userId, { role: newRole });
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      setError('Failed to update user role');
      console.error('Error updating user:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-charcoal">User Management</h1>
        <div className="text-sm text-gray-600">
          Total Users: {users.length}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <React.Fragment key={user._id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-kenyan-gold rounded-full flex items-center justify-center">
                        <span className="text-kenyan-brown font-semibold">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          User ID: {user._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{user.email}</div>
                    <div>{user.phone || 'No phone'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {userOrders[user._id]?.length || 0} orders
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleUserExpansion(user._id)}
                      className="text-kenyan-brown hover:text-kenyan-chocolate mr-3"
                    >
                      {expandedUser === user._id ? 'Hide Orders' : 'View Orders'}
                    </button>
                    <button
                      onClick={() => updateUserRole(user._id, user.role === 'admin' ? 'customer' : 'admin')}
                      className={`px-3 py-1 rounded text-xs ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
                
                {/* Expanded Orders View */}
                {expandedUser === user._id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-gray-50">
                      <div className="mb-2">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Order History for {user.firstName} {user.lastName}
                        </h4>
                        
                        {!userOrders[user._id] ? (
                          <div className="text-center py-4 text-gray-500">
                            Loading orders...
                          </div>
                        ) : userOrders[user._id].length === 0 ? (
                          <div className="text-center py-4 text-gray-500">
                            No orders found for this customer.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {userOrders[user._id].map((order) => (
                              <div key={order._id} className="border rounded-lg p-4 bg-white">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h5 className="font-semibold text-gray-900">
                                      Order {order.orderNumber}
                                    </h5>
                                    <p className="text-sm text-gray-600">
                                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                      ${order.total?.toFixed(2)}
                                    </p>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                      {order.status}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h6 className="font-medium text-gray-700 mb-2">Items:</h6>
                                    {order.items?.map((item, index) => (
                                      <div key={index} className="flex justify-between mb-1">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div>
                                    <h6 className="font-medium text-gray-700 mb-2">Shipping Address:</h6>
                                    <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                    <p>{order.shippingAddress?.address}</p>
                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                                    <p>{order.shippingAddress?.country}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <p className="text-gray-500 text-lg">No users found</p>
            <p className="text-gray-400 text-sm mt-2">
              Users will appear here once they register on your site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;