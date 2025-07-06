import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Users, UserCheck, UserX, Building2, Filter } from 'lucide-react';

const AttendanceTrends = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const dummyData = [
    { date: '2025-06-15', payable: 650, absent_pct: 8.4, attrition_pct: 4.2, onboarding: 20 },
    { date: '2025-06-16', payable: 670, absent_pct: 9.1, attrition_pct: 4.0, onboarding: 15 },
    { date: '2025-06-17', payable: 675, absent_pct: 7.9, attrition_pct: 4.5, onboarding: 18 },
    { date: '2025-06-18', payable: 663, absent_pct: 8.7, attrition_pct: 4.3, onboarding: 22 },
    { date: '2025-06-19', payable: 659, absent_pct: 9.3, attrition_pct: 4.1, onboarding: 17 },
    { date: '2025-06-20', payable: 666, absent_pct: 8.2, attrition_pct: 4.4, onboarding: 19 },
  ];

  const filteredData = dummyData.filter((record) => {
    const withinDate =
      (!dateRange.from || new Date(record.date) >= new Date(dateRange.from)) &&
      (!dateRange.to || new Date(record.date) <= new Date(dateRange.to));
    const warehouseMatch = selectedWarehouse ? record.warehouse === selectedWarehouse : true;
    return withinDate && warehouseMatch;
  });

  const weeklyAttrition = [
    { date: '2025-W24', attrition_pct: 4.2 },
    { date: '2025-W25', attrition_pct: 4.4 },
    { date: '2025-W26', attrition_pct: 4.3 },
  ];

  // Calculate KPIs
  const avgPayable = Math.round(filteredData.reduce((sum, d) => sum + d.payable, 0) / filteredData.length);
  const avgAbsent = (filteredData.reduce((sum, d) => sum + d.absent_pct, 0) / filteredData.length).toFixed(1);
  const avgAttrition = (filteredData.reduce((sum, d) => sum + d.attrition_pct, 0) / filteredData.length).toFixed(1);
  const totalOnboarding = filteredData.reduce((sum, d) => sum + d.onboarding, 0);

  const LineChart = ({ title, data, dataKey, color, icon: Icon }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    const minValue = Math.min(...data.map(d => d[dataKey]));
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: color + '20' }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color }}>
              {data.length > 0 ? data[data.length - 1][dataKey] : 0}
              {dataKey.includes('_pct') ? '%' : ''}
            </div>
            <div className="text-sm text-gray-500">Latest</div>
          </div>
        </div>
        
        <div className="relative h-32 mb-4">
          <svg className="w-full h-full" viewBox="0 0 400 120">
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
            
            {data.length > 1 && (
              <>
                <path
                  d={`M ${data.map((d, i) => 
                    `${(i / (data.length - 1)) * 380 + 10},${120 - ((d[dataKey] - minValue) / (maxValue - minValue)) * 100 - 10}`
                  ).join(' L ')}`}
                  fill={`url(#gradient-${dataKey})`}
                  stroke={color}
                  strokeWidth="2"
                  className="drop-shadow-sm"
                />
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i / (data.length - 1)) * 380 + 10}
                    cy={120 - ((d[dataKey] - minValue) / (maxValue - minValue)) * 100 - 10}
                    r="4"
                    fill={color}
                    className="drop-shadow-sm hover:r-6 transition-all duration-200"
                  />
                ))}
              </>
            )}
          </svg>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Min: {minValue}{dataKey.includes('_pct') ? '%' : ''}</span>
          <span>Max: {maxValue}{dataKey.includes('_pct') ? '%' : ''}</span>
        </div>
      </div>
    );
  };

  const KPICard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl" style={{ backgroundColor: color + '20' }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Attendance Analytics</h1>
              <p className="text-gray-600 mt-1">Real-time workforce insights and trends</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-2" />
                Warehouse Location
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
              >
                <option value="">All Warehouses</option>
                <option value="HYD IM2">HYD IM2</option>
                <option value="CHN ECOM">CHN ECOM</option>
                <option value="BLR IM1">BLR IM1</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date Range
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                />
                <input
                  type="date"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Average Payable Days"
            value={avgPayable}
            icon={Users}
            color="#3b82f6"
            trend={2.3}
          />
          <KPICard
            title="Absenteeism Rate"
            value={`${avgAbsent}%`}
            icon={UserX}
            color="#ef4444"
            trend={-1.2}
          />
          <KPICard
            title="Attrition Rate"
            value={`${avgAttrition}%`}
            icon={TrendingDown}
            color="#f59e0b"
            trend={0.8}
          />
          <KPICard
            title="Total Onboarding"
            value={totalOnboarding}
            icon={UserCheck}
            color="#10b981"
            trend={5.1}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart
            title="Payable Days Trend"
            data={filteredData}
            dataKey="payable"
            color="#3b82f6"
            icon={Users}
          />
          <LineChart
            title="Absenteeism Rate"
            data={filteredData}
            dataKey="absent_pct"
            color="#ef4444"
            icon={UserX}
          />
          <LineChart
            title="Daily Attrition Rate"
            data={filteredData}
            dataKey="attrition_pct"
            color="#f59e0b"
            icon={TrendingDown}
          />
          <LineChart
            title="Weekly Attrition Trend"
            data={weeklyAttrition}
            dataKey="attrition_pct"
            color="#10b981"
            icon={TrendingUp}
          />
          <LineChart
            title="New Onboarding"
            data={filteredData}
            dataKey="onboarding"
            color="#8b5cf6"
            icon={UserCheck}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrends;