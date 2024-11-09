import PropTypes from "prop-types";
import React from "react";

const NoData = ({ text }) => {
  return <div className="inner-wrapper">{text}</div>;
};

NoData.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NoData;
