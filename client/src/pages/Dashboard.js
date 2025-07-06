import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';
import SummaryCard from '../components/SummaryCard';
import { FiUsers, FiClock, FiUserCheck, FiUserPlus, FiUserMinus, FiActivity, FiCalendar, FiAlertTriangle, FiTrendingDown } from 'react-icons/fi';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('2025-06-20');

  const metrics = [
    { label: 'MOP (Payable)', value: 701, icon: <FiUsers /> },
    { label: 'Approved Count (Incl. Attrition & Abs%)', value: 771, icon: <FiUserCheck /> },
    { label: 'Opening Count (O)', value: 749, icon: <FiCalendar /> },
    { label: 'Onboarding', value: 12, icon: <FiUserPlus /> },
    { label: 'Deactivation (D)', value: 4, icon: <FiUserMinus /> },
    { label: "Today's Active Count (C)", value: 757, icon: <FiActivity /> },
    { label: 'Present Count (P)', value: 611, icon: <FiUserCheck /> },
    { label: 'CL + WO', value: 60, icon: <FiCalendar /> },
    { label: 'Total Payable Days (P)', value: 671, icon: <FiClock /> },
    { label: 'Absent (A)', value: 85, icon: <FiAlertTriangle /> },
    { label: 'Absent (A) %', value: '12.6%', icon: <FiTrendingDown /> },
    { label: 'Attrition %', value: '2.4%', icon: <FiTrendingDown /> },
    { label: 'OT Hours', value: 42, icon: <FiClock /> },
    { label: 'Actual Payable Difference', value: 30, icon: <FiTrendingDown /> }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Daily Warehouse Snapshot</h2>
        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-5 flex items-start gap-4 border hover:shadow-lg transition"
          >
            <div className="text-swiggy-orange text-3xl">{item.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{item.label}</p>
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
