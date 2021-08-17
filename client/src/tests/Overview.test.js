import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import mockProps from './mockProps.js'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import Overview from '../Overview/index.jsx'
import testData from '../Overview/testData.js'

//OVERVIEW TESTS
//  unit tests:
//   1. does index render?
//   2. does it render current product name/price/catagory?
//   3. does it show appropriate stars?
//   4. does it render 8 images of different styles?
//   5. does 'select size' show all sizes in stock?
//   6. does quantity show integers from 1 to stock or 15 max?
//   7. does add to cart do what its supposed to?

// describe('Overview', () => {
//   test('should render', () => {
//     const wrapper = shallow(
//       <Overview />
//     )
//     expect(wrapper.exists()).toBeTruthy()
//   })
// })


describe('props', () => {
    test('props should have', () => {
      const wrapper = shallow(
        <Overview state = {mockProps}/>

      )
      const instance = wrapper.instance();
      instance.changeSelectedQuantity({target: {value: 2}});
      expect(instance.state.quantitySelected).toBe(2);
    })
  })

  describe('snapshot', ()=> {
    test('should be snap shotty', () => {
      const component = renderer.create(<Overview state = {mockProps}/>);
      const instance = component.getInstance();
      //console.log('yurrrp', component.toJSON())

    })
  })