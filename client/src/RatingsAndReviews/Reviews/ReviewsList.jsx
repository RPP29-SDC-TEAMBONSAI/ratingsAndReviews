import React from 'react';
import PropTypes from 'prop-types';
import IndividualReviewTile from './IndividualReviewTile.jsx';

const ReviewsList = (props) => {
  return (
    <div className="reviews-list">
      {props.reviews.map((review, index) => {
        if (index <= props.loaded) {
          return (
            <IndividualReviewTile
              key={index}
              review={review}
              viewPhoto={props.viewPhoto}/>
          )
        }
      })}
    </div>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.array,
  loaded: PropTypes.number,
  viewPhoto: PropTypes.func
};

export default ReviewsList;