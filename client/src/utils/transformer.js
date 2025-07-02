// Converts raw API response for trends chart into [ { date, P }, ... ]
export const transformAttendanceTrend = (rawData, warehouseName) => {
  if (!rawData || !Array.isArray(rawData)) return [];

  return rawData
    .filter(entry => entry.wh_name === warehouseName)
    .map(entry => ({
      date: entry.date,
      P: parseInt(entry.present) || 0
    }));
};

// Converts raw API response for absenteeism into [ { date, A_percent }, ... ]
export const transformAbsenteeismTrend = (rawData, warehouseName) => {
  if (!rawData || !Array.isArray(rawData)) return [];

  return rawData
    .filter(entry => entry.wh_name === warehouseName)
    .map(entry => ({
      date: entry.date,
      A_percent: parseFloat(entry.absenteeism_pct) || 0
    }));
};
