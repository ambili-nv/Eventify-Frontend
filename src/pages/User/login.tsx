import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import Header from '../../components/Navbar';
import {validateLogin} from '../../../utils/validations'
import showToast from '../../../utils/toaster';
import { BASE_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
    const [userData,setUserData] = useState<any|null>(null)
    const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate:validateLogin,
    onSubmit: (values) => {
      console.log('Login:', values);
      setUserData(values)
    },
  });

  const token = localStorage.getItem('access_token'); // Replace with your token key

  useEffect(() => {
      if (token) {
          navigate('/');
      }
  }, [token, navigate]);

  useEffect(()=>{
    const loginUser = async()=>{
        try {
            const response = await axios.post(`${BASE_URL}/login`,userData)
            const access_token = response.data.token;
            localStorage.setItem("access_token", access_token);
            showToast(response.data.message, "success");
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
            showToast('Login failed, please check your credentials', 'error');
        }
    }
    if (userData) {
        loginUser();
      }
  },[userData])

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-orange-200">
        <div className="max-w-md w-full p-8 mx-4 bg-white bg-opacity-80 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg">
          <h2 className="text-3xl font-semibold text-center text-orange-600 mb-6">Welcome Back</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 transition duration-300"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 transition duration-300"
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>
          
          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
