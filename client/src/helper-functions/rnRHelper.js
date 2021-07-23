import React from 'react';

const factorDetail = {
  Size: ['A size too small',
    '½ a size too small',
    'Perfect',
    '½ a size too big',
    'A size too wide',
  ],
  Width: [
    'Too narrow',
    'Slightly narrow',
    'Perfect',
    'Slightly wide',
    'Too wide'
  ],
  Comfort: [
    'Uncomfortable',
    'Slightly uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect'
  ],
  Quality: [
    'Poor',
    'Below average',
    'What I expected',
    'Pretty great',
    'Perfect'
  ],
  Length: [
    'Runs Short',
    'Runs slightly short',
    'Perfect',
    'Runs slightly long',
    'Runs long'
  ],
  Fit: [
    'Runs tight',
    'Runs slightly tight',
    'Perfect',
    'Runs slightly long',
    'Runs long'
  ]
};

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
  },
  getFactorDetailArray: (factor) => {
    return factorDetail[factor];
  },
  mapCharacteristicsToProps: (characteristics) => {
    let props = [];
    for (let char in characteristics) {
      props.push({
        key: characteristics[char].id,
        title: char,
        levels: helper.getFactorDetailArray(char),
        percent: Math.round(characteristics[char].value / 5 * 100)
      });
    }
    return props;
  }
}



export default helper;