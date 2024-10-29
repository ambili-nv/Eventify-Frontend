import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import showToast from '../../../utils/toaster';

const AddSlotPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]); // Start and end date
    const [selectedDates, setSelectedDates] = useState<Date[]>([]); // Hold all dates in the range

    const handleRangeChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setDateRange(dates);

        if (start && end && start > new Date() && end > start) {
            const rangeDates = [];
            let currentDate = new Date(start);
            while (currentDate <= end) {
                rangeDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            setSelectedDates(rangeDates);
        } else if (start && start <= new Date()) {
            showToast("Start date must be in the future.", "error");
            setDateRange([null, null]);
            //@ts-ignore
        } else if (end && end <= start) {
            showToast("End date must be after the start date.", "error");
            setDateRange([start, null]);
        }
    };

    const handleAddSlots = async () => {
        try {
            const slotDates = selectedDates.map(date => date.toISOString().split('T')[0]);
            await axios.post(`${BASE_URL}/services/${serviceId}/slots`, { dates: slotDates });
            showToast("Slots added successfully", "success");
            navigate('/services');
        } catch (error) {
            console.error("Error adding slots:", error);
            showToast("Failed to add slots", "error");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Add Slots for Service</h2>

            {/* Date Range Picker */}
            <DatePicker
                selectsRange
                //@ts-ignore
                startDate={dateRange[0]}
                //@ts-ignore
                endDate={dateRange[1]}
                minDate={new Date()}
                onChange={(dates) => handleRangeChange(dates as [Date | null, Date | null])}
                inline
            />

            {/* Scrollable Selected Dates Card */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner max-h-24 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">Selected Dates:</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedDates.map((date, index) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm"
                        >
                            {date.toDateString()}
                        </span>
                    ))}
                </div>
            </div>

            {/* Save Slots Button */}
            <button
                onClick={handleAddSlots}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Save Slots
            </button>
        </div>
    );
};

export default AddSlotPage;
