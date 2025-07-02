import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';
import WarehouseSelector from '../components/WarehouseSelector';
import LineChart from '../charts/LineChart';

const AttendanceTrends = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const dummyData = [
    { date: '2025-06-15', payable: 650, absent_pct: 8.4 },
    { date: '2025-06-16', payable: 670, absent_pct: 9.1 },
    { date: '2025-06-17', payable: 675, absent_pct: 7.9 },
    { date: '2025-06-18', payable: 663, absent_pct: 8.7 },
    { date: '2025-06-19', payable: 659, absent_pct: 9.3 },
    { date: '2025-06-20', payable: 666, absent_pct: 8.2 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <WarehouseSelector
          warehouses={["HYD IM2", "CHN ECOM", "BLR IM1"]}
          selectedWarehouse={selectedWarehouse}
          onChange={setSelectedWarehouse}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart
          title="Attendance Trend"
          data={dummyData}
          dataKey="payable"
          color="#3b82f6"
        />
        <LineChart
          title="Absenteeism % Trend"
          data={dummyData}
          dataKey="absent_pct"
          color="#ef4444"
        />
      </div>
    </div>
  );
};

export default AttendanceTrends;
