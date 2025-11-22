// src/pages/admin/Users.jsx
import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+254 712 345 678',
      location: 'Nairobi, Kenya',
      orders: 5,
      joined: '2023-11-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      phone: '+254 723 456 789',
      location: 'Mombasa, Kenya',
      orders: 12,
      joined: '2023-09-22',
      status: 'active'
    },
    // Add more users...
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Manage Users</h1>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users by name, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-kenyan-gold rounded-full flex items-center justify-center">
                <span className="text-kenyan-brown font-bold text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-charcoal">{user.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{user.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span>Orders:</span>
                <span className="font-semibold">{user.orders}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Joined:</span>
                <span>{new Date(user.joined).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-kenyan-brown text-white py-2 rounded-lg hover:bg-kenyan-chocolate transition duration-200">
                View Profile
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-200">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Users;