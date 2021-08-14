// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import Reviews from '../../RatingsAndReviews/Reviews/Reviews.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, attrVal, mainValue) => {
  return { target: { getAttribute: attr => attrVal, value: mainValue } }
}

// TEST DATA
import reviewData from '../../RatingsAndReviews/TestData/newData.js';

let props = {
  product_id: 28213,
  starFilters:[],
  starFilterClick: () => {},
  characteristics: {}
}

let wrapper;

describe('Review component', () => {
  describe('componentDidMount', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('on mount, component calls getStateData', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'componentDidMount');
      jest.spyOn(instance, 'getStateData');
      instance.componentDidMount();
      expect(instance.componentDidMount).toBeCalledTimes(1);
      expect(instance.getStateData).toBeCalledTimes(1);
    });
  });

  describe('componentDidUpdate', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('on update, if product_id changed component calls getStateData', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'componentDidUpdate');
      jest.spyOn(instance, 'getStateData');
      instance.componentDidUpdate({ product_id: 28214 });
      expect(instance.componentDidUpdate).toBeCalledTimes(1);
      expect(instance.getStateData).toBeCalledTimes(1);
    });
  });

  describe('getStateData', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('loads reviews', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'getStateData');
      instance.getStateData(1, null);
      expect(instance.state.reviews.length).toBeGreaterThan(0);
    });

    test('loads the correct number of reviews', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'getStateData');

      Promise.resolve(instance.getStateData(1, null))
        .then(() => expect(instance.state.loaded).toBe(1));

      Promise.resolve(instance.getStateData(2, null))
        .then(() => expect(instance.state.loaded).toBe(2));

      Promise.resolve(instance.getStateData(4, null))
        .then(() => expect(instance.state.loaded).toBe(4));
    });

    test('sorts by relevance when specified', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'getStateData');

      Promise.resolve(instance.getStateData(1, 'relevance'))
        .then(() => expect(instance.state.reviews[0].review_id).toBe(407546));
    });

    test('filters reviews by stars when specified', () => {
      props.starFilters = [4];
      wrapper = shallow(<Reviews {...props}/>);
      props.starFilters = [];
      const instance = wrapper.instance();
      jest.spyOn(instance, 'getStateData');

      Promise.resolve(instance.getStateData(1, null))
        .then(() => expect(instance.state.reviews.length).toBe(1));
    });

    test('should not change review state on get request error', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'getStateData');

      Promise.resolve(instance.getStateData('a', null))
        .catch((err) => expect(err).toBeTruthy());
    });
  });

  describe('handleSortChange', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should change the reviews sort by option', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleSortChange');

      let sortEvent = mockEvent(null, null, 'newest');
      Promise.resolve(instance.handleSortChange(sortEvent))
        .then(() => expect(instance.state.sortBy).toBe('newest'));
    });
  });

  describe('viewPhoto', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should set the photo modal to open if closed when clicked', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'viewPhoto');

      let photoEvent = mockEvent('src', 'testSource');
      Promise.resolve(instance.viewPhoto(photoEvent))
        .then(() => expect(instance.state.photoOpen).toBe(true));
    });

    test('should set the photo modal to closed if open when clicked', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'viewPhoto');

      let photoEvent = mockEvent('src', 'testSource');
      Promise.resolve(instance.viewPhoto(photoEvent))
        .then(() => instance.viewPhoto(photoEvent))
        .then(() => expect(instance.state.photoOpen).toBe(false));
    });

    test('should set the photo url when clicked', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'viewPhoto');

      let photoEvent = mockEvent('src', 'testSource');
      Promise.resolve(instance.viewPhoto(photoEvent))
        .then(() => expect(instance.state.photo).toBe('testSource'));
    });
  });

  describe('openAddReview', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should open the add review modal when clicked', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'openAddReview');

      Promise.resolve(instance.openAddReview())
        .then(() => expect(instance.state.addReviewOpen).toBe(true));
    });
  });

  describe('loadTwoMore', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('load two more reviews when clicked', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'loadTwoMore');

      Promise.resolve(instance.loadTwoMore())
        .then(() => expect(instance.state.loaded).toBe(3));
    });
  });
});