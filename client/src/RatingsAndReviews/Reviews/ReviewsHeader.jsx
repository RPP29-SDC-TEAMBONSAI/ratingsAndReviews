import React from 'react';
import PropTypes from 'prop-types';

const ReviewsHeader = (props) => {
  return (
    <div className="reviews-header">
      <div className="sort-title-wrapper">
        <div className="sort-title">{props.numReviews} reviews, sorted by
          <select className="sort-options" value={props.sortBy} onChange={props.handleSortChange}>
            <option value="relevant">relevance</option>
            <option value="helpful">helpfulness</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
      <div className="sort-options-selected">
        <div className="sort-option-title">Also sorted on: </div>
        {props.starFilters.map((sfilter, index) => {
          return (
            <div
              className="sort-option"
              key={index}>
                <div className="remove-star-filter" star={sfilter} onClick={props.starFilterClick}>✕</div>
                <div className="sort-option-text">{sfilter} stars</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ReviewsHeader.propTypes = {
  starFilters: PropTypes.array,
  starFilterClick: PropTypes.func,
  numReviews: PropTypes.number,
  sortBy: PropTypes.string,
  handleSortChange: PropTypes.func
}

export default ReviewsHeader;