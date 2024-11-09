import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { StudentAppContext } from "../context/StudentAppContext";

const StudentItem = ({ student, index, handleEdit }) => {
  const navigate = useNavigate();
  const { deleteStudent } = useContext(StudentAppContext);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.class}</td>

      <td className="action-buttons">
        <button onClick={() => navigate(`/student/${student.id}`)}>🔎</button>
        <button onClick={() => handleEdit(student.id)}>✏️</button>
        <button onClick={() => deleteStudent(student.id)}>🗑️</button>
      </td>
    </tr>
  );
};

StudentItem.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default StudentItem;
