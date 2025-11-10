export const handleApiError = (error) => {
  console.error('API Error:', error);
  return 'Keyword not found. Please try again.';
};
