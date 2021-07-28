import React from 'react';
import PropTypes from 'prop-types';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendThis: ''
    }
    this.createRadioOptions = this.createRadioOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target: { stateVal, value } } = event;
    this.setState({
      [stateVal]: value
    });
  }

  createRadioOptions(arr, name, stateVal) {
    return arr.map((val, index) => {
      return <div className={name} key={index}>
        <label>
          <input
            className={`${name}-input`}
            type="radio"
            name={stateVal}
            stateVal={stateVal}
            value={val}
            checked={this.state[stateVal] === val}
            onChange={this.handleChange} />
          {val}
        </label>
      </div>
    });
  }

  render() {
    return (
      <div className="add-review-form">
        <div>Write Your Review</div>
        <div>About the {this.props.productName}</div>
        {/* OVERALL RATING INPUT */}
        <div className="review-input">
          <div>Overall rating</div>
          <input id="r1" type="text" value={this.state.overallRating} onChange={this.handleChange} />
        </div>
        {/* RECOMMEND RADIO GROUP */}
        <div className="review-radio">
          <div>Do you recommend this product?</div>
          {this.createRadioOptions(['Yes', 'No'], 'recommend-check', 'recommendThis')}
        </div>
        {/* FACTOR INPUTS */}
        {/* REVIEW SUMMARY */}
        {/* REVIEW BODY */}
        {/* UPLOAD YOUR PHOTOS */}
        {/* WHAT IS YOUR NAME */}
        {/* YOUR EMAIL */}
        {/* SUBMIT BUTTON */}
      </div>
    );
  }
}

AddReview.propTypes = {
  productName: PropTypes.string
}

export default AddReview;