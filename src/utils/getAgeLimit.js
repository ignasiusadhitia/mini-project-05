const getAgeLimit = () => {
  const today = new Date(); // Get the current date
  today.setFullYear(today.getFullYear() - 15); // Set the year to 15 years ago
  return today.toISOString().split("T")[0]; // Return the date in YYYY-MM-DD format
};

export default getAgeLimit;
