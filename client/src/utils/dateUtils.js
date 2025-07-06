// Format date from YYYY-MM-DD to DD-MMM-YY (e.g., 2025-06-20 → 20-Jun-25)
export const formatToSheetDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};

// Format date to display as MMM DD (e.g., Jun 20)
export const displayFriendlyDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString('en-IN', { month: 'short', day: 'numeric' });
};
