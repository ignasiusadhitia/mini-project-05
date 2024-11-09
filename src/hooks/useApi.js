import React, { useState } from "react";
import apiRequest from "../utils/apiRequest";
import handleApiError from "../utils/handleApiError";

// Custom hook for api requests and errors handling
const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const request = async (method, url, payload = null, params = null) => {
    setIsLoading(true);
    try {
      const data = await apiRequest(method, url, payload, params);
      setErrors([]); // Reset errors if request is successful
      return data;
    } catch (error) {
      handleApiError(error, setErrors); // Handle api errors
      throw error; // Throw error to be handled in another component
    } finally {
      setIsLoading(false); // Set loading state to false after request is complete
    }
  };

  return { request, isLoading, errors };
};

export default useApi;
