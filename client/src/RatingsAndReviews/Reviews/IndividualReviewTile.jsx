import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx'
import helper from '../../helper-functions/rnRHelper.js';
const { formatDate, truncateSummary, createRecommendDiv, createResponseDiv } = helper;
import { reviewHelpful, reviewReport, reviewsInteraction } from '../../clientRoutes/reviews.js';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulClicked: false,
      reportClicked: false,
      helpful: 0
    }

    this.handleReport = this.handleReport.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
  }

  handleHelpful() {
    if (this.state.helpfulClicked) {
      return
    }

    reviewHelpful(this.props.review.review_id);
    this.setState({
      helpfulClicked: true,
      helpful: 1
    });
  }

  handleReport() {
    if (this.state.reportClicked) {
      return
    }

    reviewReport(this.props.review.review_id);
    this.setState({
      reportClicked: true
    });
  }

  render() {
    if (this.state.reportClicked) {
      return <div></div>
    } else {
      return (
        <div className="irt">
          <div className="irt-header">
            <div className="irt-star-rating">{Stars(this.props.review.rating)}</div>
            <div className="irt-username-and-date">✓ {this.props.review.reviewer_name}, {formatDate(this.props.review.date)}</div>
          </div>
          <div className="irt-review-summary">
            <div className="irt-summary-trunc">{truncateSummary(this.props.review.summary)[0]}</div>
            <div className="irt-summary-overage">{truncateSummary(this.props.review.summary)[1]}</div>
          </div>
          <div className="irt-review-body">
            <div className="irt-body-text">{this.props.review.body}</div>
            <div className="irt-body-show"></div>
            <div className="irt-photos">
              {this.props.review.photos.map((photo, index) => {
                return (
                  <img
                    interaction="photo viewed"
                    className="irt-photo"
                    key={index} src={photo.url}
                    alt="image"
                    onClick={(e) => {
                      this.props.viewPhoto(e);
                      reviewsInteraction(e);
                    }}/>
                )
              })}
            </div>
          </div>
          <div className="irt-additional-info">
            {createRecommendDiv(this.props.review.recommend)}
            {createResponseDiv(this.props.review.response)}
            <div className="irt-helpfulness-info">
              <div className="irt-helpful-text">Helpful?</div>
              <div
                interaction="helpful"
                className="irt-yes-clickable"
                onClick={(e) => {
                  this.handleHelpful(e);
                  reviewsInteraction(e);
                }}>Yes</div>
              <div className="irt-rating-helpfulness">({this.props.review.helpfulness + this.state.helpful})</div>
              <div
                interaction="reported"
                className="irt-report-clickable"
                onClick={(e) => {
                  this.handleReport(e);
                  reviewsInteraction(e);
                }}>Report</div>
            </div>
          </div>
        </div>
      );
    }
  }
};

IndividualReviewTile.propTypes = {
  review: PropTypes.object,
  viewPhoto: PropTypes.func
};

export default IndividualReviewTile;