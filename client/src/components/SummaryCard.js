import React from 'react';

const SummaryCard = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      <div className="text-blue-600 text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;