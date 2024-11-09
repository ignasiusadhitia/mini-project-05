import React, { useContext } from "react";
import StudentItem from "./StudentItem";
import { StudentAppContext } from "../context/StudentAppContext";
import PropTypes from "prop-types";

const StudentList = ({ data, handleEdit }) => {
  const { t } = useContext(StudentAppContext);
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{t("nameLabel")}</th>
          <th>{t("classLabel")}</th>
          <th>{t("actionLabel")}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => (
          <StudentItem
            student={student}
            key={index}
            index={index}
            handleEdit={handleEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

StudentList.propTypes = {
  data: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default StudentList;
