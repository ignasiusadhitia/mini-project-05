import React, { useContext, useEffect } from "react";
import { StudentAppContext } from "../context/StudentAppContext";
import { useNavigate, useParams } from "react-router";
import Loader from "../components/Loader";
import StudentDetailCard from "../components/StudentDetailCard";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, data, isLoading, getStudentById } = useContext(StudentAppContext);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    getStudentById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-wrapper">
      <button onClick={handleBack} className="detail-back-button">
        {"<"} {t("backToHome")}
      </button>
      <h1>{t("studentDetailPageTitle")}</h1>
      {isLoading && <Loader wrapped />}
      {!isLoading && !data?.name ? (
        <div className="inner-wrapper">{t("noDataFound")}</div>
      ) : (
        <StudentDetailCard data={data} />
      )}
    </div>
  );
};

export default StudentDetail;
