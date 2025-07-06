import React from 'react';

const WarehouseSelector = ({ warehouses, selectedWarehouse, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Warehouse</label>
      <select
        value={selectedWarehouse}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      >
        <option value="">-- All Warehouses --</option>
        {warehouses.map((wh, idx) => (
          <option key={idx} value={wh}>{wh}</option>
        ))}
      </select>
    </div>
  );
};

export default WarehouseSelector;