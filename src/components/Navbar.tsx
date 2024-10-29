// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import showToast from '../../utils/toaster';

// const Header: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isLoggedIn = Boolean(localStorage.getItem('access_token'));

//   const handleLogout = () => {
//     localStorage.removeItem('access_token'); // Remove token
//     navigate('/login'); // Redirect to login page
//     showToast('Logout Successfully', 'success');
//   };

//   return (
//     <header className="bg-orange-300 shadow-lg py-5">
//       <div className="container mx-auto flex justify-between items-center px-5">

//         {/* Brand Name */}
//         <div className="text-3xl font-bold text-orange-600 hover:text-pink-600 transition-colors duration-300">
//           <Link to="/">Eventify</Link>
//         </div>

//         {/* Conditional Links */}
//         <div className="space-x-3 flex items-center">
//           {isLoggedIn ? (
//             <>
//               <span
//                 className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/'
//                     ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
//                     : 'text-orange-600 hover:underline'
//                   }`}
//               >
//                 Service
//               </span>
//               <Link to="/bookings">
//                 <span
//                   className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/bookings'
//                       ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
//                       : 'text-orange-600 hover:underline'
//                     }`}
//                 >
//                   Bookings
//                 </span>
//               </Link>

//               <Link to="/">

//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="px-5 py-2 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">
//                 <span
//                   className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/login'
//                       ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
//                       : 'text-orange-600 hover:underline'
//                     }`}
//                 >
//                   Login
//                 </span>
//               </Link>
//               <Link to="/register">
//                 <span
//                   className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/register'
//                       ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
//                       : 'text-orange-600 hover:underline'
//                     }`}
//                 >
//                   Register
//                 </span>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import showToast from '../../utils/toaster';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Remove token
    navigate('/login'); // Redirect to login page
    showToast('Logout Successfully', 'success');
  };

  return (
    <header className="bg-orange-300 shadow-lg py-5">
      <div className="container mx-auto flex justify-between items-center px-5">
        
        {/* Brand Name */}
        <div className="text-3xl font-bold text-orange-600 hover:text-pink-600 transition-colors duration-300">
          <Link to="/">Eventify</Link>
        </div>

        {/* Centered Links */}
        <div className="flex-1 flex justify-center space-x-8">
          {isLoggedIn ? (
            <>
              <Link to="/">
                <span
                  className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/'
                    ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
                    : 'text-orange-600 hover:underline'
                  }`}
                >
                  Service
                </span>
              </Link>
              <Link to="/bookings">
                <span
                  className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/bookings'
                    ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
                    : 'text-orange-600 hover:underline'
                  }`}
                >
                  Bookings
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <span
                  className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/login'
                    ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
                    : 'text-orange-600 hover:underline'
                  }`}
                >
                  Login
                </span>
              </Link>
              <Link to="/register">
                <span
                  className={`px-5 py-2 font-medium transition-all duration-300 cursor-pointer ${location.pathname === '/register'
                    ? 'text-orange-600 border-b-2 border-orange-600' // Underline when selected
                    : 'text-orange-600 hover:underline'
                  }`}
                >
                  Register
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Logout Button */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
