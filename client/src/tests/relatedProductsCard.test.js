import React from 'react';
import {shallow, mount} from 'enzyme';
//import helper from '../helper-functions/rpHelpers.js';
//import exampleData from './RelatedProducts/exampleData.jsx';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import RelatedProductsCard from '../RelatedProducts/RelatedProductsView/RelatedProductsCard.jsx';
import {renderer} from 'react-test-renderer';

let props = {
  name: "Blues Suede Shoes",
  category: "Dress Shoes",
  originalPrice: "120.00",
  salePrice: null,
  photo: "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
  id: 28218

};

let wrapper;

describe('RelatedProductsCard', () => {
  beforeEach(() => {
    wrapper = shallow(<RelatedProductsCard {...props} />)
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('should render component with props', () => {
    const instance = wrapper.instance();
    console.log(wrapper.props());

  })
})

