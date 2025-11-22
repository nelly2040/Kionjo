// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone, Edit2, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { user, updateProfile } = useAuth();

  // Load orders when orders tab is selected
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      loadOrders();
    }
  }, [activeTab, user]);

  // Load wishlist when wishlist tab is selected
  useEffect(() => {
    if (activeTab === 'wishlist' && user) {
      loadWishlist();
    }
  }, [activeTab, user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getMyOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    try {
      setLoading(true);
      // For now, using mock data since wishlist endpoint might not be implemented
      // In real app, you'd call: const response = await wishlistAPI.getMyWishlist();
      const mockWishlist = [
        {
          id: 4,
          name: 'Kitenge Fabric Dress',
          price: 65.75,
          image: 'https://images.unsplash.com/photo-1585487000115-33b64cffd1e9?w=400&h=400&fit=crop'
        },
        {
          id: 6,
          name: 'Beaded Leather Sandals',
          price: 55.25,
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop'
        }
      ];
      setWishlist(mockWishlist);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address
      });
      
      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  // Use real user data from AuthContext
  const userData = user || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    }
  };

  // Handle input changes for editable fields
  const handleInputChange = (field, value) => {
    // In a real app, you'd update the local state and then send to backend on save
    // For now, we'll just update the context through updateProfile on save
    console.log(`Field ${field} changed to:`, value);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-kenyan-brown text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-kenyan-gold rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-kenyan-brown" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-kenyan-gold">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex -mb-px">
            {[
              { id: 'profile', name: 'Profile', icon: User },
              { id: 'orders', name: 'Orders', icon: ShoppingBag },
              { id: 'wishlist', name: 'Wishlist', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-maasai-red text-maasai-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-charcoal">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 bg-kenyan-brown text-white px-4 py-2 rounded-lg hover:bg-kenyan-chocolate transition duration-200"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={userData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100"
                    placeholder="Add phone number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={userData.address?.street || ''}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="City"
                    value={userData.address?.city || ''}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    disabled={!isEditing}
                    className="border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={userData.address?.postalCode || ''}
                    onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                    disabled={!isEditing}
                    className="border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-maasai-red text-white rounded-lg hover:bg-red-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-charcoal mb-6">Order History</h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maasai-red mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No orders yet</p>
                  <a href="/products" className="text-kenyan-brown hover:underline mt-2 inline-block">
                    Start shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id || order.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order {order.orderNumber || order.id}</h3>
                          <p className="text-gray-600 text-sm">
                            Placed on {new Date(order.createdAt || order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total?.toFixed(2)}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            order.status === 'delivered' || order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'shipped' || order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items?.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-bold text-charcoal mb-6">My Wishlist</h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maasai-red mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading wishlist...</p>
                </div>
              ) : wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your wishlist is empty</p>
                  <a href="/products" className="text-kenyan-brown hover:underline mt-2 inline-block">
                    Discover products
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-kenyan-chocolate font-bold mb-4">${product.price}</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-kenyan-brown text-white py-2 rounded-lg hover:bg-kenyan-chocolate transition duration-200">
                            Add to Cart
                          </button>
                          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Heart className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;