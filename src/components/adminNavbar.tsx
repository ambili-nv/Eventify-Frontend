import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import showToast from '../../utils/toaster';

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear the token from local storage
    navigate('/admin/login'); // Redirect to the login page
    showToast('Logged out successfully', 'success');
  };

  // Function to apply active styling if the path matches the current location
  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-gray-100 border-b-2 border-white pb-1"
      : "hover:text-gray-200";

  return (
    <header className="bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg py-5">
      <div className="container mx-auto flex justify-between items-center px-5">
        
        {/* Brand Name */}
        <div
          className="text-3xl font-bold text-white cursor-pointer hover:text-gray-200 transition-colors duration-300"
          onClick={() => navigate('/')}
        >
          Eventify Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-lg text-white font-semibold">
          <span
            onClick={() => navigate('/services')}
            className={`${getLinkClass('/services')} cursor-pointer transition-colors duration-300`}
          >
            Services
          </span>
          <span
            onClick={() => navigate('/booking-history')}
            className={`${getLinkClass('/booking-history')} cursor-pointer transition-colors duration-300`}
          >
            Booking History
          </span>
          <span
            onClick={handleLogout}
            className="cursor-pointer hover:text-gray-200 transition-colors duration-300"
          >
            Logout
          </span>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
