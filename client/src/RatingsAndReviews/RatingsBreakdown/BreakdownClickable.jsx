import React from 'react';
import PropTypes from 'prop-types';

const BreakdownClickable = (props) => {
  return (
    <div className="breakdown-clickable">
      <div className="bar-label">{props.stars} stars</div>
      <div className="bar-wrapper" star={`${props.stars} stars`} onClick={props.starFilterClick}>
        <div className="bar-green" star={`${props.stars} stars`} style={{width: `${props.percent}%`}}></div>
        <div className="bar-grey" star={`${props.stars} stars`} style={{width: `${100 - props.percent}%`}}></div>
      </div>
      <div className="bar-count">({props.count})</div>
    </div>
  );
};

BreakdownClickable.propTypes = {
  stars: PropTypes.number,
  percent: PropTypes.number,
  count: PropTypes.number,
  starFilterClick: PropTypes.func
}

export default BreakdownClickable;