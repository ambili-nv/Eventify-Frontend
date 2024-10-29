import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import Header from '../../components/Navbar';
import { Link,useNavigate } from 'react-router-dom';
import { validateSignUp } from '../../../utils/validations';
import showToast from '../../../utils/toaster';
import { BASE_URL } from '../../../constants';
import axios from 'axios';

const RegisterForm: React.FC = () => {
    const [submittedData, setSubmittedData] = useState<any | null>(null);
    const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate:validateSignUp,
    onSubmit: (values) => {
      console.log('Register:', values);
      setSubmittedData(values)
    },
  });

  useEffect(() => {
    const registerUser = async () => {
        if (submittedData) {
            try {
                const response = await axios.post(`${BASE_URL}/register`, submittedData);
                console.log('Registration Successful:', response.data);
                showToast(response.data.message, "success");
                navigate('/login');
            } catch (error) {
                console.error('Registration Error:', error);
                showToast('Already registered, please login', 'error');
            }
        }
    };

    registerUser();
}, [submittedData]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-orange-200">
        <div className="max-w-md w-full p-8 mx-4 bg-white bg-opacity-80 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg">
          <h2 className="text-3xl font-semibold text-center text-orange-600 mb-6">Create an Account</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 transition duration-300"
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 transition duration-300"
                placeholder="Confirm your password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Register
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
