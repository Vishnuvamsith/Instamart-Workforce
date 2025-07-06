import React from 'react';

const DatePicker = ({ selectedDate, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
  );
};

export default DatePicker;