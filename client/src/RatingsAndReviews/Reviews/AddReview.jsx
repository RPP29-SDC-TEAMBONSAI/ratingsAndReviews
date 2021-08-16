import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx';
import helper from '../../helper-functions/rnRHelper.js';
const { getFactorDetailArray, auditReviews } = helper;
import { getUrl } from '../../clientRoutes/qa';
import { reviewsInteraction, reviewAdd } from '../../clientRoutes/reviews.js';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      summary: '',
      body: '',
      recommend: '',
      name: '',
      email: '',
      photos: [],
      characteristics: {},
      allowUpload: true
    }
    this.createRadioOptions = this.createRadioOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOverallRatingChange = this.handleOverallRatingChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  handleChange(event) {
    const stateval = event.target.getAttribute('stateval');
    const value = event.target.value || event.target.getAttribute('value');
    const index = event.target.getAttribute('indexselected');
    const char = this.props.characteristics[stateval];
    if (char) {
      let temp = Object.assign(this.state.characteristics);
      temp[char.id] = index;
      this.setState({
        characteristics: temp,
        [stateval]: value
      });
    }
    else {
      this.setState({
        [stateval]: value
      });
    }
  }

  handleOverallRatingChange(event) {
    this.setState({
      rating: event.target.getAttribute('starNum')
    });
  }

  createRadioOptions(arr, name, stateval) {
    return arr.map((val, index) => {
      return (
        <div
          key={index}
          indexselected={index}
          className={`radio-label is-${this.state[stateval] === val}`}
          name={stateval}
          stateval={stateval}
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
            <div className="ri-title">How would you rate this overall? <a className='r-required'>*</a></div>
            {Stars(this.state.rating, this.handleOverallRatingChange)}
            {["no rating selected", "Poor", "Fair", "Average", "Good", "Great"][this.state.rating]}
          </div>
        </div>
        {/* RECOMMEND RADIO GROUP */}
        <div className="radio-options-wrapper-column">
          <div className="radio-factor-title">Do you recommend this product? <a className='r-required'>*</a></div>
          <div className="radio-options rcolumn">
            {this.createRadioOptions(['Yes', 'No'], 'radio-option', 'recommend')}
          </div>
        </div>
        {/* FACTOR INPUTS */}
        <div className="radio-factor-title">Rank the following factors for this product <a className='r-required'>*</a></div>
        {Object.keys(this.props.characteristics).map((factor, index) => {
          return (
            <div className="radio-options-wrapper" key={index}>
              <div className="radio-options-title">{factor}</div>
              <div className="radio-options">
                {this.createRadioOptions(getFactorDetailArray(factor, true), "radio-option", factor)}
              </div>
            </div>
          );
        })}
        {/* REVIEW SUMMARY */}
        <div className="r-summary">
          <label className="r-title">Write a short review summary</label>
          <input
            className="r-input-small"
            placeholder="Example: Best purchase ever!"
            stateval="summary"
            value={this.state.summary}
            onChange={this.handleChange}/>
        </div>
        {/* REVIEW BODY */}
        <div className="r-full">
          <label className="r-title">Write your full review <a className='r-required'>*</a></label>
          <textarea className="r-full-input"
          placeholder="Why did you like the product or not?"
          stateval="body"
          value={this.state.body}
          onChange={this.handleChange}/>
        </div>
        <div className="r-full-min">
          {
            this.state.body
              ? this.state.body.length + 1 > 49
                ? `Minimum reached`
                : `Minimum required characters left: ${50- this.state.body.length}`
              : `Minimum required characters left: 50`
          }
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
              <label className="r-title">Enter Your Nickname <a className='r-required'>*</a></label>
              <input className="r-input-small"
              placeholder="Example: jackson11!"
              stateval="name"
              value={this.state.name}
              onChange={this.handleChange}/>
            </div>
            <div className="r-name-note">
              For privacy reasons, do not use your full name or email address
            </div>
            {/* YOUR EMAIL */}
            <div className="r-email">
              <label className="r-title">Enter a valid email <a className='r-required'>*</a></label>
              <input className="r-input-small"
              placeholder="Example: jackson11@email.com"
              stateval="email"
              value={this.state.email}
              onChange={this.handleChange}/>
            </div>
            <div className="r-email-note">
              For authentication reasons, you will not be emailed
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button
            interaction="submitted review form"
            className="r-submit"
            onClick={(e) => {
              //console.log(this.state);
              //console.log(this.props.characteristics);
              let warnings = auditReviews(this.state, this.props.characteristics);
              if (warnings === '') {
                reviewAdd(this.state, this.props.product_id)
                window.alert('Review Submitted');
                this.props.close(e);
                reviewsInteraction(e);
              } else {
                window.alert(
                  'Please fix the following before submitting your review:\n\n' + warnings
                  );
              }
            }}>
              Sumbit Review
            </button>
        </div>
      </div>
    );
  }
}

AddReview.propTypes = {
  product_id: PropTypes.number,
  productName: PropTypes.string,
  close: PropTypes.func,
  characteristics: PropTypes.object
}

export default AddReview;