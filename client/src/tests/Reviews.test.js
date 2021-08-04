import React from 'react';
import { shallow, mount } from 'enzyme';
import helper from '../helper-functions/rpHelpers.js';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import Reviews from '../RatingsAndReviews/Reviews/Reviews.jsx';
import renderer from 'react-test-renderer';
import reviewRoutes from '../clientRoutes/reviews.js';

// console.log(reviewRoutes);
const props = {
  product_id: 28213,
  starFilters:[]
}
jest.mock('../clientRoutes/reviews.js');
let wrapper;
describe('Review component', ()=> {
  describe('componentDidMount', () => {
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props}/>)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('on mount, it makes requet and sets state with getStateData', () => {

      const instance = wrapper.instance();
      jest.spyOn(instance, 'componentDidMount')
      jest.spyOn(instance, 'getStateData')
      instance.componentDidMount()
      instance.getStateData()
      // console.log(instance.state)
      expect(instance.componentDidMount).toBeCalledTimes(1)
      expect(instance.componentDidMount).toBeCalledTimes(1)
      expect(Boolean(instance.state.reviews.length)).toBe(true)

    })
    //for testing to make sure stuff is rendering correctly
    test('on mount, component should render correctData', () => {
      const component = renderer.create(<Reviews {...props}/>)
      const instance = component.getInstance()


      instance.componentDidMount()

      return reviewRoutes.reviews().then(({data}) => {

        // console.log(component.toJSON().children[2].children[1].children[0].children[2].children[0])
        let body1 = component.toJSON().children[2].children[1].children[0].children[2].children[0];
        expect(Boolean(body1.length)).toBe(true)
      });
    })
  })

})