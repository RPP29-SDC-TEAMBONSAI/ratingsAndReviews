import React from 'react';
import PropTypes from 'prop-types';
import { reviewsInteraction } from '../../clientRoutes/reviews.js';

const BreakdownClickable = (props) => {
  return (
    <div className="breakdown-clickable">
      <div className="bar-label">{props.stars} stars</div>
      <div className="bar-wrapper"
        interaction={`${props.stars} star bar clicked`}
        star={props.stars}
        onClick={(e) => {
          props.starFilterClick(e);
          console.log(e);
          console.log(e.target);
          reviewsInteraction(e);
        }}>
        <div
          interaction={`green portion of ${props.stars} star bar clicked`}
          className="bar-green" star={props.stars}
          style={{width: `${props.percent}%`}}>
        </div>
        <div
          interaction={`grey portion of ${props.stars} star bar clicked`}
          className="bar-grey"
          star={props.stars}
          style={{width: `${100 - props.percent}%`}}>
        </div>
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