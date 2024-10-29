import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import showToast from '../../../utils/toaster';
import AdminHeader from '../../components/adminNavbar';
import { useNavigate } from 'react-router-dom';

interface Service {
    _id: string;
    title: string;
    category: string;
    price: number;
    description: string;
    location: string;
    images: string[];
    contactDetails: {
        phone: string;
        email: string;
    };
}

const ServiceListPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/services`);
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    const handleAddNewService = () => {
        console.log("Redirecting to add new service page");
        navigate('/create-service')
    };


    const handleAddSlot = (serviceId: string) => {
        navigate(`/services/${serviceId}/add-slot`);
    };
    
    const handleEditService = (serviceId: string) => {
        console.log(serviceId,"service id");
        
        navigate(`/services/${serviceId}/edit`);
    };
    

    const handleDeleteService = async (serviceId: string) => {
            try {
                await axios.delete(`${BASE_URL}/delete-services/${serviceId}`);
                showToast("Service deleted successfully", "success");
            } catch (error) {
                console.error("Error deleting service:", error);
                showToast("Failed to delete service", "error");
            }
    };

    return (
        <>
            <AdminHeader/>
            <div className="max-w-6xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Uploaded Services</h2>
                    <button
                        onClick={handleAddNewService}
                        className="px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
                        >
                        Add New Service
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {service.images.length > 0 && (
                                <div className="rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={service.images[0]}
                                        alt={service.title}
                                        className="h-48 w-full object-cover"
                                    />
                                </div>
                            )}

                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{service.category}</p>
                            <p className="text-gray-700 font-medium">
                                <span className="text-gray-900 font-semibold">Price: </span>{service.price}
                            </p>
                            <p className="text-gray-700 font-medium mb-4">
                                <span className="text-gray-900 font-semibold">Location: </span>{service.location}
                            </p>
                            <p className="text-gray-500 text-sm">
                                <span className="font-semibold text-gray-700">Contact: </span>{service.contactDetails.phone}
                            </p>

                            <div className="flex justify-between mt-6 space-x-2">
                                <button
                                    onClick={() => handleAddSlot(service._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Add Slot
                                </button>
                                <button
                                    onClick={() => handleEditService(service._id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ServiceListPage;
