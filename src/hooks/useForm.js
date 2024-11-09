import React, { useState } from "react";
import generateNim from "../utils/generateNim";

const useForm = (initialValues) => {
  const [values, setValues] = useState({
    // State to store form values
    ...initialValues,
    nim: generateNim(), // Generate random nim
  });

  const handleChange = (event) => {
    const { name, value } = event.target; // Get name and value from event target
    setValues({ ...values, [name]: value }); // Update state with new values
  };

  const resetForm = (newValues = initialValues) => {
    setValues(newValues); // Reset form values
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};

export default useForm;
