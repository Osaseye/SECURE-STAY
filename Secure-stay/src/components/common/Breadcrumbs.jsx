import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  // Custom mapping for specific routes
  const getBreadcrumbName = (name, index, arr) => {
    if (name === 'hotels' && arr[index + 1]) {
        return 'Hotels'; 
    }
    if (name === 'booking') return 'Secure Checkout';
    if (name === '1') return 'Grand Horizon'; // Mocking Main Hotel ID
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  // If we are on the booking page, don't show the global breadcrumb
  // because GuestFormPage has a custom one.
  if (location.pathname === '/booking') return null;

  return (
    <div className="bg-white border-b border-gray-200 hidden md:block print:hidden">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
            <li>
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors flex items-center">
                <span className="text-sm font-medium">Home</span>
            </Link>
            </li>
            {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = getBreadcrumbName(name, index, pathnames);

            return (
                <li key={name} className="flex items-center">
                <span className="material-icons-outlined text-base text-gray-400 mx-2">chevron_right</span>
                {isLast ? (
                    <span className="text-sm font-bold text-primary" aria-current="page">
                    {displayName}
                    </span>
                ) : (
                    <Link
                    to={routeTo}
                    className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
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
