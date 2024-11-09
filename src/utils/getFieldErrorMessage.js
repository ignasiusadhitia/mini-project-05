const getFieldErrorMessage = (errors, fieldName) => {
  const fieldErrors = errors.filter((error) => error.field === fieldName); // Filter errors by field name
  return fieldErrors.length > 0
    ? fieldErrors.map((error) => error.message).join(", ") //  Join error messages with commas
    : null;
};

export default getFieldErrorMessage;
