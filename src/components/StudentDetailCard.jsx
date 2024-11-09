import React, { useContext } from "react";
import { StudentAppContext } from "../context/StudentAppContext";
import PropTypes from "prop-types";

const StudentDetailCard = ({ data }) => {
  const { t } = useContext(StudentAppContext);

  return (
    <div className="student-detail-wrapper">
      <span>{t("nameLabel")}</span>
      <span>{data.name}</span>
      <span>{t("nimLabel")}</span>
      <span>{data.nim}</span>
      <span>{t("classLabel")}</span>
      <span>{data.class}</span>
      <span>{t("yearLabel")}</span>
      <span>{data.year}</span>
      <span>{t("guardianNameLabel")}</span>
      <span>{data.guardian_name}</span>
      <span>{t("birthDateLabel")}</span>
      <span>{data.birthDate}</span>
      <span>{t("addressLabel")}</span>
      <span>{data.address}</span>
      <span>{t("genderLabel")}</span>
      <span>{data.gender}</span>
    </div>
  );
};

StudentDetailCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nim: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    guardian_name: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudentDetailCard;
