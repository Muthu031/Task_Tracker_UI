import React, { useState } from 'react';
import { formatDate } from '../../helpers/dateHelpers';

interface DatePickerProps {
    selectedDate?: Date | null;
    onChange: (date: Date | null) => void;
    label?: string;
    id?: string;
    required?: boolean;
    error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    onChange,
    label = 'Due Date',
    id = 'due-date',
    required = false,
    error
}) => {
    const [showCalendar, setShowCalendar] = useState(false);

    // Convert date to string for input value
    const dateString = selectedDate
        ? selectedDate.toISOString().split('T')[0]
        : '';

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) {
            onChange(null);
            return;
        }

        const newDate = new Date(value);
        onChange(newDate);
    };

    return (
        <div className="relative">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="flex items-center">
                <input
                    type="date"
                    id={id}
                    value={dateString}
                    onChange={handleDateChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-300' : 'border-gray-300'
                        }`}
                    required={required}
                />

                {selectedDate && (
                    <button
                        type="button"
                        className="ml-2 text-gray-400 hover:text-gray-500"
                        onClick={() => onChange(null)}
                        aria-label="Clear date"
                    >
                        ✕
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default DatePicker;