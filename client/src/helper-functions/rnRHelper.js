import React from 'react';

const factorDetail = {
  Size: [
    'A size too small',
    'Perfect',
    'A size too wide'
  ],
  Width: [
    'Too narrow',
    'Perfect',
    'Too wide'
  ],
  Comfort: [
    'Uncomfortable',
    '',
    '',
    'Perfect'
  ],
  Quality: [
    'Poor',
    '',
    '',
    'Perfect',
  ],
  Length: [
    'Runs Short',
    'Perfect',
    'Runs long'
  ],
  Fit: [
    'Runs tight',
    'Perfect',
    'Runs long'
  ]
};

const helper = {
  round: (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  },
  ratingsToTotalAverageAndPercentages: (ratings) => {
    let count = 0;
    let multipleTotals = 0;
    let countsForEach = new Array(5).fill(0);
    for (let key in ratings) {
      let countOfRating = parseInt(ratings[key]);
      count += countOfRating;
      let multiple = countOfRating * key;
      multipleTotals += multiple;
      countsForEach[parseInt(key) - 1] = countOfRating;
    }

    let percentages = countsForEach.map((percentage) => {
      return helper.round((percentage / count * 100), 1)
    });

    return {
      count: count,
      average: helper.round(multipleTotals / count, 1),
      countsForEach: countsForEach,
      percentages: percentages
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
  },
  getFactorDetailArray: (factor) => {
    return factorDetail[factor];
  },
  mapCharacteristicsToProps: (characteristics) => {
    let props = [];
    console.log(characteristics);
    for (let char in characteristics) {
      props.push({
        key: characteristics[char].id,
        title: char,
        levels: helper.getFactorDetailArray(char),
        percent: Math.round((characteristics[char].value - 1) / 4 * 100)
      });
    }
    return props;
  },
  sortByRelevance: (reviews) => {
    return reviews;
  }
}

export default helper;