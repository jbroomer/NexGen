import React from 'react';
import PropTypes from 'prop-types';
import './styles/bold-text-display.css';

const propTypes = {
  label: PropTypes.string.isRequired,
  displayValue: PropTypes.string.isRequired,
};

const BoldTextDisplay = ({
  label,
  displayValue,
}) => (
  <div className="bold-text-display-container">
    <div className="bold-text-display-label">{label}</div>
    <div className="bold-text-display-value">{displayValue}</div>
  </div>
);

BoldTextDisplay.propTypes = propTypes;
export default BoldTextDisplay;
