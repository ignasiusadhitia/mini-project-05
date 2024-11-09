import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { StudentAppContext } from "../context/StudentAppContext";
import useForm from "../hooks/useForm";
import generateNim from "../utils/generateNim";
import getAgeLimit from "../utils/getAgeLimit";
import getFieldErrorMessage from "../utils/getFieldErrorMessage";
import Loader from "../components/Loader";

const classOptions = [
  "CS 101 - Introduction to Programming",
  "CS 201 - Data Structures",
  "CS 301 - Algorithms",
  "CS 401 - Machine Learning",
];

const StudentForm = () => {
  const {
    data,
    errors,
    isLoading,
    createStudent,
    updateStudent,
    getStudentById,
    studentId,
    setStudentId,
    isEditing,
    setIsEditing,
    t,
  } = useContext(StudentAppContext);
  const navigate = useNavigate();

  const generatedNim = useRef(generateNim()).current;

  const initialValues = {
    name: "",
    class: "",
    year: "",
    nim: generatedNim,
    guardian_name: "",
    birthDate: "",
    address: "",
    gender: "",
  };

  const { values, handleChange, resetForm } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { ...values, nim: generatedNim };

    if (isEditing) {
      await updateStudent(studentId, formData, handleBack);
    } else {
      await createStudent(formData, handleBack);
    }
  };

  const handleBack = () => {
    navigate("/");
    resetForm({ ...initialValues, nim: generatedNim });
    setIsEditing(false);
    setStudentId(null);
  };

  useEffect(() => {
    if (studentId) {
      getStudentById(studentId);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      resetForm({ ...initialValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  useEffect(() => {
    if (data) {
      resetForm(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) {
    return <div>{t("noDataFound")}</div>;
  }

  return (
    <div className="page-wrapper">
      <button onClick={handleBack} className="form-back-button">
        {"<"} {t("backToHome")}
      </button>
      <h1>{t("studentFormTitle")}</h1>

      <form onSubmit={handleSubmit} className="student-form-wrapper">
        <div>
          <label htmlFor="name">{t("nameLabel")}</label>
          <input
            type="text"
            id="name"
            name="name"
            className={
              getFieldErrorMessage(errors, "name") ? "invalid-input" : ""
            }
            value={values.name || ""}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "name")}
          </div>
        </div>

        <div>
          <label htmlFor="class">{t("classLabel")}</label>

          <select
            id="class"
            name="class"
            value={values.class || ""}
            className={
              getFieldErrorMessage(errors, "class") ? "invalid-input" : ""
            }
            onChange={handleChange}
          >
            <option value="">{t("classOption")}</option>
            {classOptions.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>

          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "class")}
          </div>
        </div>

        <div>
          <label htmlFor="year">{t("yearLabel")}</label>
          <input
            type="text"
            id="year"
            name="year"
            className={
              getFieldErrorMessage(errors, "year") ? "invalid-input" : ""
            }
            value={values.year || ""}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "year")}
          </div>
        </div>

        <div>
          <label htmlFor="nim">{t("nimLabel")}</label>
          <input
            type="text"
            id="nim"
            name="nim"
            className={
              getFieldErrorMessage(errors, "nim") ? "invalid-input" : ""
            }
            value={values.nim || initialValues.nim}
            disabled
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "nim")}
          </div>
        </div>

        <div>
          <label htmlFor="guardian_name">{t("guardianNameLabel")}</label>
          <input
            type="text"
            id="guardian_name"
            name="guardian_name"
            className={
              getFieldErrorMessage(errors, "guardian_name")
                ? "invalid-input"
                : ""
            }
            value={values.guardian_name || ""}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "guardian_name")}
          </div>
        </div>

        <div>
          <label htmlFor="birthDate">{t("birthDateLabel")}</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            className={
              getFieldErrorMessage(errors, "birthDate") ? "invalid-input" : ""
            }
            value={values.birthDate || ""}
            max={getAgeLimit()}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "birthDate")}
          </div>
        </div>

        <div>
          <label htmlFor="address">{t("addressLabel")}</label>
          <textarea
            type="text"
            id="address"
            name="address"
            className={
              getFieldErrorMessage(errors, "address") ? "invalid-input" : ""
            }
            value={values.address || ""}
            onChange={handleChange}
          ></textarea>
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "address")}
          </div>
        </div>

        <div>
          <label>{t("genderLabel")}</label>
          <div className="radio-group-wrapper">
            <div className="radio-group">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                id="male"
                onChange={handleChange}
              />
              <label htmlFor="male">{t("male")}</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={values.gender === "female"}
                id="female"
                onChange={handleChange}
              />
              <label htmlFor="female">{t("female")}</label>
            </div>
          </div>
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "gender")}
          </div>
        </div>

        <button
          type="submit"
          className="form-submit-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <span>
              {studentId ? t("formUpdateButton") : t("formSubmitButton")}
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
