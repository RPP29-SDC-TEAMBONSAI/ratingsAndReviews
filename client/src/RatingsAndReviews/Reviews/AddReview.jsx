import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx';
import helper from '../../helper-functions/rnRHelper.js';
const { getFactorDetailArray } = helper;
import { getUrl } from '../../clientRoutes/qa';
import { reviewsInteraction } from '../../clientRoutes/reviews.js';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendThis: '',
      overallRating: 0,
      photos: [],
      allowUpload: true
    }
    this.createRadioOptions = this.createRadioOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOverallRatingChange = this.handleOverallRatingChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  handleChange(event) {
    const stateVal = event.target.getAttribute('stateVal');
    const value = event.target.value || event.target.getAttribute('value');
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

  onFileUpload(event) {
    // convert file to base64 data
    let fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0], 'base64');
    // once the fileReader is loaded
    fileReader.onload = () => {
      // get the result as url
      let url = fileReader.result.substring(0);
      // make a request to imgbb
      getUrl(url)
      .then((newUrl) => {
        // add the new url to the photos on state
        let photos = this.state.photos.slice();
        photos.push(newUrl);
        // if 5 photos are uploaded disallow uploads
        let bool = photos.length < 5;
        this.setState({
          photos: photos,
          allowUpload: bool
        });
      });
    }
  };

  render() {
    return (
      <div className="add-review-form">
        <div className="add-review-top">
          <div
            interaction="closed review form"
            className="x"
            onClick={(e) => {
              this.props.close(e);
              reviewsInteraction(e);
            }}>
              ✕
            </div>
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
            placeholder="Enter Summary..."
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
        <div className="r-photo-wrapper">
          <a className="r-photo-title">Upload up to 5 Photos</a>
          <input
            onChange={this.onFileUpload}
            name="file"
            className="r-photo-upload"
            id="r-photo-add"
            type="file"
            style={{display: "none"}}
            accept="image/png, image/jpeg">
          </input>
          <button
            className="r-photo-button"
            style={{display: this.state.allowUpload ? "inline-block" : "none"}}
            onClick={() => {
              document.getElementById('r-photo-add').click();
            }}>
            Add A Photo
          </button>
          <div className="r-photos">
          {this.state.photos.map((photo, index) => {
            return (
              <img
                className="irt-photo"
                key={index}
                src={photo}
                alt="image"/>
            )
          })}
          </div>
        </div>
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
          <button
            interaction="submitted review form"
            className="r-submit"
            onClick={(e) => {
              reviewsInteraction(e);
            }}>
              Sumbit Review
            </button>
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