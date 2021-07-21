import React from 'react';

const ReviewsHeader = (props) => {
  return (
    <div className="reviews-header">
      <div className="sort-title-wrapper">
        <div className="sort-title">301 reviews, sorted by </div>
        <select className="sort-options">
          <option value="helpful">helpfulness</option>
          <option value="newest">newest</option>
          <option value="relevent">relevance</option>
        </select>
      </div>
      <div className="sort-options-selected">Additional Sort Options Selected: </div>
    </div>
  );
};

export default ReviewsHeader;