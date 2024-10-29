import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios'; // Import axios
import uploadImagesToCloudinary from '../../API/ImageUpload';
import showToast from '../../../utils/toaster';
import { BASE_URL } from '../../../constants';
import { validateService } from '../../../utils/validations';
import AdminHeader from '../../components/adminNavbar';
import axiosInstance from '../../../utils/axiosInstance'

const ServiceCreate: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [serviceData, setServiceData] = useState<any>(null); // State to hold the service data

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      //@ts-ignore
      price: '', // Change this to a number later
      description: '',
      location: '',
      contactDetails: {
        phone: '',
        email: '',
      },
    },
    validate: validateService, // Use the validation function
    onSubmit: (values) => {
      // Set the service data to be submitted
      setServiceData({
        ...values,
        price: Number(values.price), // Convert price to a number
      });
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImageFiles(Array.from(files));
      const previewUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreviewUrls(previewUrls);
    }
  };

  // useEffect to handle submission
  useEffect(() => {
    const submitService = async () => {
      if (!serviceData) return; // Exit if there's no data to submit
      try {
        // Upload images to Cloudinary
        const uploadedImageUrls = await uploadImagesToCloudinary(imageFiles);

        // Submit service details along with uploaded images
        const response = await axiosInstance.post(`${BASE_URL}/add-service`, {
          ...serviceData,
          images: uploadedImageUrls,  
        });

        // Handle the response
        if (response.data) {
          showToast('Service created successfully!', 'success');
          formik.resetForm();
          setImageFiles([]);
          setImagePreviewUrls([]);
        } else {
          showToast('Failed to create service', 'error');
        }
      } catch (error) {
        console.error('Error creating service:', error);
        showToast('Failed to create service', 'error');
      } finally {
        setServiceData(null); // Reset the service data after submission
      }
    };

    submitService();
  }, [serviceData, imageFiles]);

  return (
    <>
      <AdminHeader />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create New Service</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track field blur
              value={formik.values.title}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter service title"
              required
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track field blur
              value={formik.values.category}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">Select category</option>
              <option value="venue">Venue</option>
              <option value="photographer">Photographer/Videographer</option>
              <option value="dj">DJ/Musician</option>
              <option value="caterer">Caterer</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price per Day</label>
            <input
              type="number"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track field blur
              value={formik.values.price}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter price"
              required
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500">{formik.errors.price}</div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track field blur
              value={formik.values.description}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter service description"
              required
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track field blur
              value={formik.values.location}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter service location"
              required
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500">{formik.errors.location}</div>
            )}
          </div>

          {/* Contact Details Fields */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Contact Details</label>
            <div className="space-y-4">
              {/* Phone Number */}
              <div>
                <input
                  type="tel"
                  name="contactDetails.phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // Track field blur
                  value={formik.values.contactDetails.phone}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter phone number"
                  required
                />
                {formik.touched.contactDetails?.phone && formik.errors.contactDetails?.phone && (
                  <div className="text-red-500">{formik.errors.contactDetails.phone}</div>
                )}
              </div>

              {/* Email Address */}
              <div>
                <input
                  type="email"
                  name="contactDetails.email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // Track field blur
                  value={formik.values.contactDetails.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter email address"
                  required
                />
                {formik.touched.contactDetails?.email && formik.errors.contactDetails?.email && (
                  <div className="text-red-500">{formik.errors.contactDetails.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="block w-full text-gray-700 border border-gray-300 rounded-lg py-2 px-4"
            />
            {imagePreviewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <img key={index} src={url} alt="Preview" className="h-24 w-24 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
          >
            Create Service
          </button>
        </form>
      </div>
    </>
  );
};

export default ServiceCreate;
