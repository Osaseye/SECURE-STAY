import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Page Not Found</h2>
            <p className="text-gray-500 mt-2 mb-8 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
