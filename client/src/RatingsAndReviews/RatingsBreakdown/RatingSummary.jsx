import React from 'react';

const RatingSummary = (props) => {
  return (
    <div className="rating-summary">
      <div className="rating-title">RATINGS & REVIEWS</div>
      <div className="average-rating-wrapper">
        <div className="average-rating-num">3.5</div>
        <div className="stars-count-wrapper">
          <div className="average-rating-stars">* * * * *</div>
          <div className="count-of-reviews">from 301 reviews</div>
        </div>
      </div>
      <div className="recommends">100% of reviews recommend this product</div>
    </div>
  );
};

export default RatingSummary;