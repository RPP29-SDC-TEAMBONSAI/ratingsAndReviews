import React from 'react';
import PropTypes from 'prop-types';

const RatingSummary = (props) => {
  return (
    <div className="rating-summary">
      <div className="rating-title">RATINGS & REVIEWS</div>
      <div className="average-rating-wrapper">
        <div className="average-rating-num">{props.average}</div>
        <div className="stars-count-wrapper">
          <div className="average-rating-stars">* * * * *</div>
          <div className="count-of-reviews">from {props.total} reviews</div>
        </div>
      </div>
      <div className="recommends">{props.percent}% of reviews recommend this product</div>
    </div>
  );
};

RatingSummary.propTypes = {
  average: PropTypes.number,
  total: PropTypes.number,
  percent: PropTypes.number
}

export default RatingSummary;