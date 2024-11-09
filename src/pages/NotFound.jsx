import React, { useContext } from "react";
import { StudentAppContext } from "../context/StudentAppContext";
import { useNavigate } from "react-router";

const NotFound = () => {
  const { t } = useContext(StudentAppContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="page-wrapper">
      <div className="not-found-page-wrapper">
        <h1>{t("notFoundPageTitle")}</h1>
        <p>{t("notFoundPageMessage")}</p>
        <button onClick={handleBack}>{t("backToHome")}</button>
      </div>
    </div>
  );
};

export default NotFound;
