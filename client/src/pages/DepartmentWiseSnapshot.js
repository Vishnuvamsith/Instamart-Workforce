import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';
import WarehouseSelector from '../components/WarehouseSelector';

const DepartmentWiseSnapshot = () => {
  const [selectedDate, setSelectedDate] = useState('2025-06-20');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const mockDepts = [
    { dept: 'Dispatch', day: 27, night: 27, wo: 5, absent: 5, cl: 1, active: 55, attr_pred: 0 },
    { dept: 'Inbound', day: 38, night: 38, wo: 0, absent: 0, cl: 2, active: 78, attr_pred: 1 },
    { dept: 'Outbound', day: 105, night: 105, wo: 31, absent: 31, cl: 0, active: 210, attr_pred: 21 },
    { dept: 'Putaway', day: 22, night: 22, wo: 0, absent: 0, cl: 1, active: 44, attr_pred: 1 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
        <WarehouseSelector
          warehouses={["HYD IM1", "BLR IM1", "VIZ IM1"]}
          selectedWarehouse={selectedWarehouse}
          onChange={setSelectedWarehouse}
        />
      </div>

      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Night</th>
              <th className="px-4 py-2">WO</th>
              <th className="px-4 py-2">Absent</th>
              <th className="px-4 py-2">CL</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Attr. Pred</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {mockDepts.map((dept, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2 font-medium">{dept.dept}</td>
                <td className="px-4 py-2 text-center">{dept.day}</td>
                <td className="px-4 py-2 text-center">{dept.night}</td>
                <td className="px-4 py-2 text-center">{dept.wo}</td>
                <td className="px-4 py-2 text-center">{dept.absent}</td>
                <td className="px-4 py-2 text-center">{dept.cl}</td>
                <td className="px-4 py-2 text-center">{dept.active}</td>
                <td className="px-4 py-2 text-center">{dept.attr_pred}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentWiseSnapshot;
