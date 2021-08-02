import React from 'react';
import {shallow} from 'enzyme';
import helper from '../helper-functions/rpHelpers';
import exampleData from '../relatedProducts/exampleData.js';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import RelatedProducts from '../relatedProducts/RelatedProductsView/RelatedProducts.jsx';
import {renderer} from 'react-test-renderer';
import { product_id } from './QnA-testData';

const props = {
  state: {loaded: false}

}
let wrapper;
describe('RelatedProducts', () => {
  beforeEach(() => {
    wrapper = shallow(<RelatedProducts state={props.state}/>);

  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('componentDidMount', () => {
    describe('getRelatedStateData', () => {
      test('should call promiseALL on productsWithId and productsStyle',() => {
        const instance = wrapper.instance()
        instance.componentDidMount()
        console.log('hii')

      })
    })
  })
})