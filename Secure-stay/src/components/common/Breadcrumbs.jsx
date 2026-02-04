import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <div className="bg-gray-50 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
            <li>
            <Link to="/" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Home size={16} />
                <span className="sr-only">Home</span>
            </Link>
            </li>
            {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

            return (
                <li key={name} className="flex items-center">
                <ChevronRight size={16} className="text-gray-400 mx-1" />
                {isLast ? (
                    <span className="text-sm font-medium text-gray-900" aria-current="page">
                    {displayName}
                    </span>
                ) : (
                    <Link
                    to={routeTo}
                    className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                    {displayName}
                    </Link>
                )}
                </li>
            );
            })}
        </ol>
        </nav>
    </div>
  );
};

export default Breadcrumbs;
