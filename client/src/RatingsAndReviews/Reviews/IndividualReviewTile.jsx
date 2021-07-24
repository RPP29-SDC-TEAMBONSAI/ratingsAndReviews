import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx'
import helper from '../../helper-functions/rnRHelper.js';
const { formatDate, truncateSummary, createRecommendDiv, createResponseDiv } = helper;

const IndividualReviewTile = (props) => {
  return (
    <div className="irt">
      <div className="irt-header">
        <div className="irt-star-rating">{Stars(props.review.rating)}</div>
        <div className="irt-username-and-date">✓ {props.review.reviewer_name}, {formatDate(props.review.date)}</div>
      </div>
      <div className="irt-review-summary">
        <div className="irt-summary-trunc">{truncateSummary(props.review.summary)[0]}</div>
        <div className="irt-summary-overage">{truncateSummary(props.review.summary)[1]}</div>
      </div>
      <div className="irt-review-body">
        <div className="irt-body-text">{props.review.body}</div>
        <div className="irt-body-show"></div>
        <div className="irt-photos"></div>
      </div>
      <div className="irt-additional-info">
        {createRecommendDiv(props.review.recommend)}
        {createResponseDiv(props.review.response)}
        <div className="irt-helpfulness-info">
          <div className="irt-helpful-text">Helpful?</div>
          <div className="irt-yes-clickable">Yes</div>
          <div className="irt-rating-helpfulness">({props.review.helpfulness})</div>
          <div className="irt-report-clickable">Report</div>
        </div>
      </div>
      <hr className="irt-hr"/>
    </div>
  );
};

IndividualReviewTile.propTypes = {
  review: PropTypes.object,
};

export default IndividualReviewTile;