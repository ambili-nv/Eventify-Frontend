// // src/pages/EditServicePage.tsx
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../../constants';
// import showToast from '../../../utils/toaster';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { validateService } from '../../../utils/validations';

// const EditServicePage: React.FC = () => {
//     const navigate = useNavigate();
//     const { serviceId } = useParams<{ serviceId: string }>();
//     const [existingImage, setExistingImage] = React.useState<string | null>(null);

//     const formik = useFormik({
//         initialValues: {
//             title: '',
//             category: '',
//             price: 0,
//             description: '',
//             location: '',
//             contactDetails: {
//                 phone: '',
//                 email: '',
//             },
//             image: '', // Add image field
//         },
//         validate: validateService,
//         onSubmit: async (values) => {
//             try {
//                 const updatedService = {
//                     title: values.title,
//                     category: values.category,
//                     price: values.price,
//                     description: values.description,
//                     location: values.location,
//                     contactDetails: {
//                         phone: values.contactDetails.phone,
//                         email: values.contactDetails.email,
//                     },
//                     image: existingImage || values.image, // Use existing image if not updating
//                 };
//                 await axios.put(`${BASE_URL}/edit-services/${serviceId}`, updatedService);
//                 showToast("Service updated successfully", "success");
//                 navigate('/services'); // Redirect to service list
//             } catch (error) {
//                 console.error("Error updating service:", error);
//                 showToast("Failed to update service", "error");
//             }
//         },
//     });

//     useEffect(() => {
//         const fetchService = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/services/${serviceId}`);
//                 const service = response.data;
                
//                 // Set existing image
//                 setExistingImage(service.images[0]); // Assuming you want to show the first image

//                 formik.setValues({
//                     title: service.title,
//                     category: service.category,
//                     price: service.price,
//                     description: service.description,
//                     location: service.location,
//                     contactDetails: {
//                         phone: service.contactDetails.phone,
//                         email: service.contactDetails.email,
//                     },
//                     image: service.images[0], // Add the existing image to the form state
//                 });
//             } catch (error) {
//                 console.error("Error fetching service:", error);
//                 showToast("Failed to fetch service details", "error");
//             }
//         };

//         fetchService();
//     }, [serviceId]);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setExistingImage(reader.result as string);
//                 formik.setFieldValue('image', reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-8">
//             <h2 className="text-3xl font-bold mb-6">Edit Service</h2>
//             <form onSubmit={formik.handleSubmit} className="space-y-4">
//                 {/* Existing Image Display */}
//                 {existingImage && (
//                     <div className="mb-4">
//                         <img src={existingImage} alt="Service" className="w-full h-auto mb-2 rounded-lg" />
//                         <p className="text-sm text-gray-500">Current Image</p>
//                     </div>
//                 )}
                
//                 <div>
//                     <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload New Image (optional)</label>
//                     <input
//                         type="file"
//                         id="image"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
//                     />
//                 </div>

//                 {/* Title Field */}
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={formik.values.title}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.title && formik.errors.title && (
//                         <div className="text-red-500 text-sm">{formik.errors.title}</div>
//                     )}
//                 </div>

//                 {/* Other Fields */}
//                 <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                     <input
//                         type="text"
//                         id="category"
//                         value={formik.values.category}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.category && formik.errors.category ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.category && formik.errors.category && (
//                         <div className="text-red-500 text-sm">{formik.errors.category}</div>
//                     )}
//                 </div>
//                 <div>
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//                     <input
//                         type="number"
//                         id="price"
//                         value={formik.values.price}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.price && formik.errors.price && (
//                         <div className="text-red-500 text-sm">{formik.errors.price}</div>
//                     )}
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                     <textarea
//                         id="description"
//                         value={formik.values.description}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.description && formik.errors.description && (
//                         <div className="text-red-500 text-sm">{formik.errors.description}</div>
//                     )}
//                 </div>
//                 <div>
//                     <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//                     <input
//                         type="text"
//                         id="location"
//                         value={formik.values.location}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.location && formik.errors.location && (
//                         <div className="text-red-500 text-sm">{formik.errors.location}</div>
//                     )}
//                 </div>
//                 <div>
//                     <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
//                     <input
//                         type="text"
//                         id="contactPhone"
//                         value={formik.values.contactDetails.phone}
//                         onChange={(e) => formik.setFieldValue('contactDetails.phone', e.target.value)}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.contactDetails?.phone && formik.errors.contactDetails?.phone ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.contactDetails?.phone && formik.errors.contactDetails?.phone && (
//                         <div className="text-red-500 text-sm">{formik.errors.contactDetails.phone}</div>
//                     )}
//                 </div>
//                 <div>
//                     <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
//                     <input
//                         type="email"
//                         id="contactEmail"
//                         value={formik.values.contactDetails.email}
//                         onChange={(e) => formik.setFieldValue('contactDetails.email', e.target.value)}
//                         onBlur={formik.handleBlur}
//                         className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.contactDetails?.email && formik.errors.contactDetails?.email ? 'border-red-500' : ''}`}
//                         required
//                     />
//                     {formik.touched.contactDetails?.email && formik.errors.contactDetails?.email && (
//                         <div className="text-red-500 text-sm">{formik.errors.contactDetails.email}</div>
//                     )}
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full py-2 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
//                 >
//                     Save Changes
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditServicePage;



import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import showToast from '../../../utils/toaster';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateService } from '../../../utils/validations';
import uploadImagesToCloudinary from '../../API/ImageUpload'; // Import your Cloudinary upload function

const EditServicePage: React.FC = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams<{ serviceId: string }>();
    const [existingImage, setExistingImage] = React.useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            price: 0,
            description: '',
            location: '',
            contactDetails: {
                phone: '',
                email: '',
            },
            image: '', // Add image field
        },
        validate: validateService,
        onSubmit: async (values) => {
            try {
                let uploadedImage = existingImage; // Default to existing image

                // Check if a new image is uploaded
                if (formik.values.image) {
                    //@ts-ignore
                    const uploadedImages = await uploadImagesToCloudinary([formik.values.image]);
                    //@ts-ignore
                    uploadedImage = uploadedImages[0]; // Get the uploaded image URL
                }

                const updatedService = {
                    title: values.title,
                    category: values.category,
                    price: values.price,
                    description: values.description,
                    location: values.location,
                    contactDetails: {
                        phone: values.contactDetails.phone,
                        email: values.contactDetails.email,
                    },
                    image: uploadedImage, // Use the uploaded or existing image
                };

                await axios.put(`${BASE_URL}/edit-services/${serviceId}`, updatedService);
                showToast("Service updated successfully", "success");
                navigate('/services'); // Redirect to service list
            } catch (error) {
                console.error("Error updating service:", error);
                showToast("Failed to update service", "error");
            }
        },
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/services/${serviceId}`);
                console.log(response.data,"service data");
                
                const service = response.data;

                // Set existing image
                setExistingImage(service.images[0]); // Assuming you want to show the first image

                formik.setValues({
                    title: service.title,
                    category: service.category,
                    price: service.price,
                    description: service.description,
                    location: service.location,
                    contactDetails: {
                        phone: service.contactDetails.phone,
                        email: service.contactDetails.email,
                    },
                    image: '', // Clear the image field initially
                });
            } catch (error) {
                console.error("Error fetching service:", error);
                showToast("Failed to fetch service details", "error");
            }
        };

        fetchService();
    }, [serviceId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setExistingImage(reader.result as string);
                formik.setFieldValue('image', file); // Set the file object for upload
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6">Edit Service</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Existing Image Display */}
                {existingImage && (
                    <div className="mb-4">
                        <img src={existingImage} alt="Service" className="w-full h-auto mb-2 rounded-lg" />
                        <p className="text-sm text-gray-500">Current Image</p>
                    </div>
                )}

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload New Image (optional)</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                </div>

                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500 text-sm">{formik.errors.title}</div>
                    )}
                </div>

                {/* Other Fields */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.category && formik.errors.category ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.category && formik.errors.category && (
                        <div className="text-red-500 text-sm">{formik.errors.category}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.price && formik.errors.price && (
                        <div className="text-red-500 text-sm">{formik.errors.price}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm">{formik.errors.description}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.location && formik.errors.location && (
                        <div className="text-red-500 text-sm">{formik.errors.location}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                    <input
                        type="text"
                        id="contactPhone"
                        value={formik.values.contactDetails.phone}
                        onChange={(e) => formik.setFieldValue('contactDetails.phone', e.target.value)}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.contactDetails?.phone && formik.errors.contactDetails?.phone ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.contactDetails?.phone && formik.errors.contactDetails?.phone && (
                        <div className="text-red-500 text-sm">{formik.errors.contactDetails.phone}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input
                        type="email"
                        id="contactEmail"
                        value={formik.values.contactDetails.email}
                        onChange={(e) => formik.setFieldValue('contactDetails.email', e.target.value)}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${formik.touched.contactDetails?.email && formik.errors.contactDetails?.email ? 'border-red-500' : ''}`}
                        required
                    />
                    {formik.touched.contactDetails?.email && formik.errors.contactDetails?.email && (
                        <div className="text-red-500 text-sm">{formik.errors.contactDetails.email}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-orange-600"
                >
                    Update Service
                </button>
            </form>
        </div>
    );
};

export default EditServicePage;
