import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import Header from '../../components/Navbar';

const ServiceDashboard: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user-services`);
                console.log(response.data);

                setServices(response.data.services);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            <Header />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-center">Available Services</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-lg text-gray-700">Loading services...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                            >
                                <img className="w-full h-48 object-cover" src={service.images} alt={service.title} />
                                <div className="px-6 py-4 bg-white">
                                    <div className="font-bold text-xl mb-2">{service.title}</div>
                                    <p className="text-gray-700 text-base">
                                        Price: <span className="font-semibold">{service.price}</span> <br />
                                        Location: {service.location}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2 bg-white">
                                    <Link
                                        to={`/service-detials/${service._id}`}
                                        className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ServiceDashboard;


