import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../../components/Navbar';
import axiosInstance from '../../../utils/axiosInstance';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ServiceDetails: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/service-details/${serviceId}`);
                setService(response.data.service);
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceId]);

    const handleBookNow = () => {
        setShowCalendar(true);
    };

    const handleDateSelect = async (date: Date) => {
        setSelectedDate(date);
        setShowCalendar(false);
        
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await axios.post(`${BASE_URL}/check-availability`, {
                serviceId,
                selectedDate: formattedDate,
            });

            if (response.data.available) {
                setAvailabilityMessage('');
                proceedToPayment(); // If available, proceed to payment
            } else {
                setAvailabilityMessage('Selected date is not available. Please choose another date.');
            }
        } catch (error) {
            console.error("Error checking date availability:", error);
            setAvailabilityMessage('Failed to check date availability. Please try again.');
        }
    };

    const proceedToPayment = async () => {
        if (!selectedDate) {
            setAvailabilityMessage("Please select a date before proceeding to payment.");
            return;
        }

        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const response = await axiosInstance.post(`${BASE_URL}/create-checkout-session`, {
                serviceId,
                selectedDate: formattedDate,
                price:service.price,
                paymentStatus: 'pending',
                bookingStatus: 'pending',
                
            });

            const sessionId = response.data.id;
            const stripe = await stripePromise;

            if (stripe) {
                await stripe.redirectToCheckout({ sessionId });
            }
            // await axiosInstance.post(`${BASE_URL}/update-slot-status`)
        } catch (error) {
            console.error("Error proceeding to payment:", error);
            setAvailabilityMessage("Failed to proceed to payment. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-lg text-gray-700">Loading service details...</p>
                    </div>
                ) : service ? (
                    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Side - Details */}
                        <div className="space-y-6">
                            <div className="text-4xl font-bold text-gray-800">
                                {service.title}
                            </div>
                            <div className="text-lg text-gray-600 border-b pb-4">
                                <strong>Location:</strong>
                                <p>{service.location}</p>
                            </div>
                            <div className="text-lg text-gray-600 border-b pb-4">
                                <strong>Price Per Day:</strong>
                                <p>{service.price} RS</p>
                            </div>
                            <div className="text-lg text-gray-600 border-b pb-4">
                                <strong>Contact Details:</strong>
                                <p>Email: {service.contactDetails?.email}</p>
                                <p>Phone: {service.contactDetails?.phone}</p>
                            </div>
                            <div className="text-lg text-gray-700 leading-relaxed border-b pb-4">
                                <strong>Description:</strong>
                                <p>{service.description}</p>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={handleBookNow}
                                    className="w-full md:w-auto bg-orange-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
                                >
                                    Book Now
                                </button>
                            </div>
                            {showCalendar && (
                                <div className="mt-4">
                                    <Calendar
                                        onClickDay={handleDateSelect}
                                        tileClassName={({ date }) =>
                                            service.availableDates?.includes(date.toISOString().split('T')[0])
                                                ? 'bg-green-200'
                                                : 'bg-gray-200'
                                        }
                                    />
                                </div>
                            )}
                            {availabilityMessage && (
                                <p className="text-red-500 mt-2">{availabilityMessage}</p>
                            )}
                        </div>

                        {/* Right Side - Image */}
                        <div className="relative h-full flex justify-center items-center">
                            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    className="w-full h-full object-cover"
                                    src={service.images && service.images[0]}
                                    alt={service.title}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-700">Service not found.</p>
                )}
            </div>
        </>
    );
};

export default ServiceDetails;
