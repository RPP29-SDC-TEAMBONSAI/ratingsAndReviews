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
    const value = event.target.getAttribute('value');
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
        <div style={{"z-index": "3", position: 'relative', top: '0px', right: '0px'}}>x</div>
        <div>Write Your Review</div>
        <div>About the {this.props.productName}</div>
        {/* OVERALL RATING INPUT */}
        <div className="review-input">
          <div>Overall rating</div>
          {Stars(this.state.overallRating, this.handleOverallRatingChange)}
        </div>
        {/* RECOMMEND RADIO GROUP */}
        <div className="radio-options-wrapper">
          <div className="radio-options-title">Do you recommend this product?</div>
          <div className="radio-options">
            {this.createRadioOptions(['Yes', 'No'], 'radio-option', 'recommendThis')}
          </div>
        </div>
        {/* FACTOR INPUTS */}
        <div>Rank the following factors for this product</div>
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
        <div>
          <label>Write a short review summary</label>
          <input/>
        </div>
        {/* REVIEW BODY */}
        <div>
          <label>Write your full review</label>
          <textarea/>
        </div>
        {/* UPLOAD YOUR PHOTOS */}

        {/* WHAT IS YOUR NAME */}
        <div>
          <label>Enter Your Name</label>
          <input/>
        </div>
        {/* YOUR EMAIL */}
        <div>
          <label>Enter a valid email</label>
          <input/>
        </div>
        {/* SUBMIT BUTTON */}

      </div>
    );
  }
}

AddReview.propTypes = {
  productName: PropTypes.string
}

export default AddReview;