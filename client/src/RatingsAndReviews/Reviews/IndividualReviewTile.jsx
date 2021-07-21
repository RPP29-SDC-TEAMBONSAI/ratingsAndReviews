import React from 'react';
import PropTypes from 'prop-types';

const IndividualReviewTile = (props) => {
  return (
    <div className="irt">
      <div className="irt-header">
        <div className="irt-star-rating">* * * * *</div>
        <div className="irt-user-date-wrapper">
          <div className="irt-username">✓ User1234, </div>
          <div className="irt-date-of-review">July 20, 2021</div>
        </div>
      </div>
      <div className="irt-review-summary">
        <div className="irt-summary-trunc">
          Review title with word-break truncation to prevent wrapping onto the next...
        </div>
        <div className="irt-summary-overage">
          ...line, if necessary.
          </div>
      </div>
      <div className="irt-review-body">
        <div className="irt-body-text">Donut gummi bears gingerbread gummies chocolate. Ice cream apple pie tiramisu fruitcake chupa chups icing apple pie. Lemon drops cake pudding pudding.</div>
        <div className="irt-body-show"></div>
        <div className="irt-photos"></div>
      </div>
      <div className="irt-additional-info">
        <div className="irt-recommend">✓ I recommend this product</div>
        <div className="irt-response-to-review">
          <div className="irt-response-title">Response:</div>
          <div className="irt-response">Marzipan danish jelly beans gummi bears apple pie cheesecake topping biscuit sesame snaps.</div>
        </div>
        <div className="irt-helpfulness-info">
          <div className="irt-helpful-text">Helpful?</div>
          <div className="irt-yes-clickable">Yes</div>
          <div className="irt-rating-helpfulness">(9)</div>
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