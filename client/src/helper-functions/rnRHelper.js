import React from 'react';

const helper = {
  round: (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  },
  ratingsToTotalAndAverage: (ratings) => {
    let count = 0;
    let multipleTotals = 0;
    for (let key in ratings) {
      let countOfRating = parseInt(ratings[key]);
      count += countOfRating;
      let multiple = countOfRating * key;
      multipleTotals += multiple;
    }
    return {
      count: count,
      average: helper.round(multipleTotals / count, 1)
    }
  },
  recommendedToPercentage: (recommended) => {
    const yes = parseInt(recommended.true);
    const no = parseInt(recommended.false);
    return Math.round((yes / (yes + no) * 100), 0);
  },
  createRecommendDiv: (bool) => {
    if (bool) {
      return <div className="irt-recommend">✓ I recommend this product</div>
    }
  },
  truncateSummary: (string) => {
    return [`${string}...`, undefined];
  },
  formatDate: (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString(undefined, options);
  },
  createResponseDiv: (response) => {
    if (response !== '' && response !== undefined) {
      return (
        <div className="irt-response-to-review">
          <div className="irt-response-title">Response:</div>
          <div className="irt-response">{response}</div>
        </div>
      )
    }
  }
}

export default helper;