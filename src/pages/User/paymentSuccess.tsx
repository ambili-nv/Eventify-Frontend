// PaymentSuccess.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { BASE_URL } from '../../../constants';

const PaymentSuccess: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const response = await axiosInstance.post(`${BASE_URL}/confirm-payment/${bookingId}`, {
                    paymentStatus: 'paid',
                    bookingStatus: 'confirmed',
                });

                // If the request was successful, you can handle the response here
                setConfirmationMessage(response.data.message);
            } catch (err) {
                // Handle error appropriately
                //@ts-ignore
                setError(err.response?.data?.error || 'Failed to update payment status');
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [bookingId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
            {confirmationMessage && <p className="mt-4 text-lg">{confirmationMessage}</p>}
            {/* Optionally, display booking details here */}
        </div>
    );
};

export default PaymentSuccess;
