import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { BASE_URL } from '../../../constants';
import Header from '../../components/Navbar';

interface Service {
    contactDetails: any;
    _id: string;
    title: string;
    category: string;
    price: number;
}

interface Slot {
    _id: string;
    date: string;
}

interface Booking {
    _id: string;
    service: Service;
    slot: Slot;
    paymentStatus: 'pending' | 'paid' | 'failed';
    bookingStatus: 'pending' | 'confirmed' | 'canceled';
    createdAt: string;
}

const BookingHistory: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const bookingsPerPage = 5; 

    useEffect(() => {
        const fetchBookingHistory = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get<{
                    bookings: Booking[];
                    totalCount: number;
                }>(`${BASE_URL}/users-history?page=${currentPage}&limit=${bookingsPerPage}`);
                setBookings(response.data.bookings);
                setTotalCount(response.data.totalCount);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [currentPage]); 

    const handleViewDetails = (booking: Booking) => {
        setSelectedBooking(booking);
    };

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    const totalPages = Math.ceil(totalCount / bookingsPerPage);

    if (loading) {
        return <p className="text-center text-lg text-gray-600">Loading booking history...</p>;
    }

    return (
        <>
            <Header />
            <div className="booking-history p-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-left mt-5">Booking History</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Service Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                                        {booking.service.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                                        {new Date(booking.slot.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600 text-left">
                                        ₹{booking.service.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleViewDetails(booking)}
                                            className="bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {/* Modal for Booking Details */}
                {selectedBooking && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                        <div className="bg-white w-3/4 md:w-1/2 p-8 rounded-lg shadow-lg relative">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            <h3 className="text-2xl font-semibold text-black-700 mb-6">Booking Details</h3>
                            <div className="space-y-4">
                                <p><span className="font-semibold">Service:</span> {selectedBooking.service.title}</p>
                                <p><span className="font-semibold">Category:</span> {selectedBooking.service.category}</p>
                                <p><span className="font-semibold">Date:</span> {new Date(selectedBooking.slot.date).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Price:</span> ₹{selectedBooking.service.price}</p>
                                <p><span className="font-semibold">Payment Status:</span> {selectedBooking.paymentStatus}</p>
                                <p><span className="font-semibold">Booking Status:</span> {selectedBooking.bookingStatus}</p>
                                <p><span className="font-semibold">Booking Date:</span> {new Date(selectedBooking.createdAt).toLocaleDateString()}</p>
                                {/* Displaying contact details */}
                                <p><span className="font-semibold">Contact Phone:</span> {selectedBooking.service.contactDetails.phone}</p>
                                <p><span className="font-semibold">Contact Email:</span> {selectedBooking.service.contactDetails.email}</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingHistory;
