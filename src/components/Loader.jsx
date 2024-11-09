import PropTypes from "prop-types";
import React from "react";

const Loader = ({ wrapped }) => {
  return (
    <div className={wrapped ? "inner-wrapper" : ""}>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

Loader.propTypes = {
  wrapped: PropTypes.bool,
};

export default Loader;
