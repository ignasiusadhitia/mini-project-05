import PropTypes from "prop-types";
import React, { createContext, useCallback, useMemo, useState } from "react";
import Swal from "sweetalert2";
import useApi from "../hooks/useApi";
import useTheme from "../hooks/useTheme";
import useTranslation from "../hooks/useTranslation";
import showNotification from "../utils/notificationUtils";

// Context for student app
const StudentAppContext = createContext();

// Provider for StudentAppContext
const StudentAppProvider = ({ children }) => {
  const { request, isLoading, errors } = useApi(); // Use useApi hook
  const { t, language, changeLanguage } = useTranslation(); // Use useTranslation hook
  const { theme, toggleTheme } = useTheme(); // Use useTheme hook
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to get all students data
  const getAllStudents = useCallback(async () => {
    try {
      const allStudents = await request("get", "/students");
      setData(Array.isArray(allStudents.data) ? allStudents.data : []); // Ensure data is an array
      setIsError(null);
    } catch (error) {
      setIsError(error);
    }
  }, [request]);

  // Function to get student data by id
  const getStudentById = useCallback(
    async (id) => {
      try {
        const student = await request("get", `/students/${id}`);
        setData(student.data);
      } catch (error) {
        setIsError(error);
      }
    },
    [request]
  );

  // Function to find students data by name
  const findStudentsByName = useCallback(
    async (name) => {
      try {
        const result = await request("get", "/students", null, { find: name });
        setData(result.data);
        setIsError(null);
      } catch (error) {
        setIsError(error);
      }
    },
    [request]
  );

  // Function to post student data
  const createStudent = useCallback(
    async (newData, callback) => {
      try {
        const createdData = await request("post", "/students", newData);
        setData(
          (prevData) =>
            Array.isArray(prevData) ? [...prevData, createdData] : [createdData] // Ensure data is an array
        );
        showNotification("success", t("successTitle"), t("studentCreated"));
        setIsError(null);
        callback();
      } catch (error) {
        setIsError(error); // Set errors if request is unsuccessful
      }
    },
    [request, t]
  );

  // Function to update student data
  const updateStudent = useCallback(
    async (id, updateData, callback) => {
      try {
        const updatedData = await request("put", `/students/${id}`, updateData);
        setData((prevData) =>
          Array.isArray(prevData)
            ? prevData.map((item) => (item.id === id ? updatedData : item)) // Ensure data is an array
            : [updatedData]
        );
        showNotification("success", t("successTitle"), t("studentUpdated"));
        setIsError(null);
        callback();
      } catch (error) {
        setIsError(error); // Set errors if request is unsuccessful
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [request]
  );

  // Function to delete student data
  const deleteStudent = useCallback(
    async (id) => {
      const confirmResult = await Swal.fire({
        /// Use SweetAlert2 for confirmation
        title: t("confirmTitle"),
        text: t("confirmText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: t("confirmButton"),
        cancelButtonText: t("cancelButton"),
      });

      if (confirmResult.isConfirmed) {
        try {
          await request("delete", `/students/${id}`);
          setData((prevData) =>
            Array.isArray(prevData)
              ? prevData.filter((item) => item.id !== id) // Ensure data is an array
              : []
          );
          showNotification("success", t("deletedTitle"), t("studentDeleted"));
          setIsError(null);
        } catch (error) {
          setIsError(error); // Set errors if request is unsuccessful
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [request]
  );

  // Value to be passed to StudentAppContext
  const value = useMemo(
    () => ({
      data,
      isLoading,
      isError,
      errors,
      getAllStudents,
      getStudentById,
      findStudentsByName,
      createStudent,
      updateStudent,
      deleteStudent,
      isEditing,
      setIsEditing,
      studentId,
      setStudentId,
      t,
      language,
      changeLanguage,
      theme,
      toggleTheme,
    }),
    [
      data,
      isLoading,
      isError,
      errors,
      getAllStudents,
      getStudentById,
      findStudentsByName,
      createStudent,
      updateStudent,
      deleteStudent,
      isEditing,
      setIsEditing,
      studentId,
      setStudentId,
      t,
      language,
      changeLanguage,
      theme,
      toggleTheme,
    ]
  );

  return (
    <StudentAppContext.Provider value={value}>
      {children}
    </StudentAppContext.Provider>
  );
};
StudentAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StudentAppContext, StudentAppProvider };
