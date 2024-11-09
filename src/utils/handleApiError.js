// Function to handle api error
const handleApiError = (error, setErrors, showNotification) => {
  // Check if error has properti 'data' and array with vaidation message
  if (error.data && error.data.length > 0) {
    // Map the error data to a more readable format (field and path)
    const formattedErrors = error.data.map(({ path, msg }) => ({
      field: path, // Set 'path' as 'field'
      message: msg, // Set 'msg' as 'message'
    }));
    setErrors(formattedErrors); // Set errors state to be displayed on form errors
  } else {
    // Fallback to generic error if no recognizable format is found
    setErrors([{ field: "API", message: error.message }]);
    if (showNotification) showNotification("error", "Error", error.message); // Show error notification
  }
};

export default handleApiError;
