import React from 'react';
import { shallow, mount } from 'enzyme';
import helper from '../helper-functions/rpHelpers.js';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import Reviews from '../RatingsAndReviews/Reviews/Reviews.jsx';
import { renderer } from 'react-test-renderer';
import reviewRoutes from '../clientRoutes/reviews.js';
jest.mock('../clientRoutes/reviews.js');

console.log(reviewRoutes);

let props = {
  product_id: 28212,
  starFilters: [],
  starFilterClick: (event) => {
    let stars = event.target.getAttribute('star');
    let filters = props.starFilters.slice();
    let index = filters.indexOf(stars);

    if (index !== -1) {
      filters.splice(index, 1);
    } else {
      filters.push(stars);
    }

    props.starFilters = filters.sort().reverse();
  }
}

let wrapper;

describe('Reviews', () => {
  beforeEach(() => {
    wrapper = shallow(<Reviews{...props}/>)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render component with props', () => {
    const instance = wrapper.instance();

    jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();

    return reviewRoutes.reviews()
      .then((data) => {
        console.log(instance);
      })

    expect(instance.componentDidMount).toBeCalledTimes(1);
    // console.log(instance);
  })
});