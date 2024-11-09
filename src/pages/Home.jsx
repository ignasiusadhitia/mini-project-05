import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import NoData from "../components/NoData";
import StudentList from "../components/StudentList";
import { StudentAppContext } from "../context/StudentAppContext";
import useForm from "../hooks/useForm";

const Home = () => {
  const {
    getAllStudents,
    findStudentsByName,
    isLoading,
    data,
    setStudentId,
    t,
  } = useContext(StudentAppContext);
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useForm({
    search: "",
  });

  const handleEdit = (id) => {
    setStudentId(id);
    navigate(`/student`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    findStudentsByName(values.search);
  };

  const handleReset = () => {
    getAllStudents();
    resetForm({ search: "" });
  };

  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-wrapper">
      <div>
        <h1>{t("greeting")},</h1>
        <p>{t("welcome")}</p>
      </div>
      <div className="table-header">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            id="search"
            className="search-input"
            value={values.search}
            placeholder={t("searchPlaceholder")}
            onChange={handleChange}
          />
          <div className="button-group">
            <button type="submit" className="search-button">
              {t("searchButton")}
            </button>

            {values.search && (
              <button
                type="button"
                onClick={handleReset}
                className="clear-button"
              >
                ❌
              </button>
            )}
          </div>
        </form>

        <button onClick={() => navigate("/student")}>
          {t("formSubmitButton")}
        </button>
      </div>
      {isLoading && <Loader wrapped />}
      {!isLoading && data.length > 0 ? (
        <div className="table-wrapper">
          <StudentList data={data} handleEdit={handleEdit} />
        </div>
      ) : (
        !isLoading && <NoData text={t("noDataFound")} />
      )}{" "}
    </div>
  );
};

export default Home;
