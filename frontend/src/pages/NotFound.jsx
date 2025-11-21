// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-6xl font-bold text-kenyan-brown mb-4">404</div>
          <h1 className="text-2xl font-bold text-charcoal mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-maasai-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200 flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full border border-kenyan-brown text-kenyan-brown py-3 px-6 rounded-lg font-semibold hover:bg-kenyan-brown hover:text-white transition duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;