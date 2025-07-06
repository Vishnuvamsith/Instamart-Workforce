import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const BarChart = ({ title, data, dataKey, color }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={color} barSize={30} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
