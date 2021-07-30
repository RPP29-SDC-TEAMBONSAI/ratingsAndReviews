import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx';
import helper from '../../helper-functions/rnRHelper.js';
const { getFactorDetailArray } = helper;

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendThis: '',
      overallRating: 0
    }
    this.createRadioOptions = this.createRadioOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOverallRatingChange = this.handleOverallRatingChange.bind(this);
  }

  handleChange(event) {
    const stateVal = event.target.getAttribute('stateVal');
    const value = event.target.value || event.target.getAttribute('value');
    console.log(value);
    this.setState({
      [stateVal]: value
    });
  }

  handleOverallRatingChange(event) {
    this.setState({
      overallRating: event.target.getAttribute('starNum')
    });
  }

  createRadioOptions(arr, name, stateVal) {
    return arr.map((val, index) => {
      return (
        <div
          key={index}
          className={`radio-label is-${this.state[stateVal] === val}`}
          name={stateVal}
          stateVal={stateVal}
          value={val}
          onClick={this.handleChange}>
            {val}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="add-review-form">
        <div className="add-review-top">
          <div className="x" onClick={this.props.close}>✕</div>
          <div className="review-title">Write Your Review</div>
          <div className="review-subtitle">About the {this.props.productName}</div>
          {/* OVERALL RATING INPUT */}
          <div className="review-input">
            <div className="ri-title">How would you rate this overall?</div>
            {Stars(this.state.overallRating, this.handleOverallRatingChange)}
          </div>
        </div>
        {/* RECOMMEND RADIO GROUP */}
        <div className="radio-options-wrapper-column">
          <div className="radio-factor-title">Do you recommend this product?</div>
          <div className="radio-options rcolumn">
            {this.createRadioOptions(['Yes', 'No'], 'radio-option', 'recommendThis')}
          </div>
        </div>
        {/* FACTOR INPUTS */}
        <div className="radio-factor-title">Rank the following factors for this product</div>
        {['Size','Width','Comfort','Quality','Length','Fit'].map((factor, index) => {
          return (
            <div className="radio-options-wrapper" key={index}>
              <div className="radio-options-title">{factor}</div>
              <div className="radio-options">
                {this.createRadioOptions(getFactorDetailArray(factor, true), "radio-option", `${factor}Selected`)}
              </div>
            </div>
          );
        })}
        {/* REVIEW SUMMARY */}
        <div className="r-summary">
          <label className="r-title">Write a short review summary</label>
          <input
            className="r-input-small"
            // placeholder="Enter Summary..."
            stateVal="summary"
            value={this.state.summary}
            onChange={this.handleChange}/>
        </div>
        {/* REVIEW BODY */}
        <div className="r-full">
          <label className="r-title">Write your full review</label>
          <textarea className="r-full-input"
          placeholder="Enter Review..."
          stateVal="full"
          value={this.state.full}
          onChange={this.handleChange}/>
        </div>
        {/* UPLOAD YOUR PHOTOS */}

        <div className="r-name-email-submit">
          <div className="r-name-email">
          {/* WHAT IS YOUR NAME */}
            <div className="r-name">
              <label className="r-title">Enter Your Name</label>
              <input className="r-input-small"
              placeholder="John Doe..."
              stateVal="name"
              value={this.state.name}
              onChange={this.handleChange}/>
            </div>
            {/* YOUR EMAIL */}
            <div className="r-email">
              <label className="r-title">Enter a valid email</label>
              <input className="r-input-small"
              placeholder="johndoe@missing.com..."
              stateVal="email"
              value={this.state.email}
              onChange={this.handleChange}/>
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button className="r-submit">Sumbit Review</button>
        </div>

      </div>
    );
  }
}

AddReview.propTypes = {
  productName: PropTypes.string,
  close: PropTypes.func
}

export default AddReview;