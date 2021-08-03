import React from 'react';
import {shallow} from 'enzyme';
import helper from '../helper-functions/rpHelpers';
import exampleData from '../relatedProducts/newExampleData.js';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import RelatedProducts from '../relatedProducts/RelatedProductsView/RelatedProducts.jsx';
import renderer from 'react-test-renderer'
import { product_id} from './QnA-testData';
import axios from 'axios'
import {productsWithId, productsStyle} from "../clientRoutes/products.js"
jest.mock('axios')
jest.mock('../clientRoutes/products.js')

const props = {
  state: {
    relatedProducts: [28213, 28214, 28215, 28216],
    product_id: 28212,
    ratings: {4: "1", 5: "1"}

  }

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

    test('on mount, should call componenDidMount, getRelatedStateData, and getOutfitData only once',() => {
      //create new instance to test specific functionality.
      const instance = wrapper.instance()
      //set up spys
      jest.spyOn(instance, 'componentDidMount')

      //mount the instance
      instance.componentDidMount()
      console.log(instance)
      //test the instance
      expect(instance.componentDidMount).toBeCalledTimes(1)

    })
    //unfinished new test for componentDidMount here - this one is for rendering
    test('on mount, component displays correct styles for current related product', () => {
      const component = renderer.create(<RelatedProducts state={props.state}/>)
      const instance = component.getInstance()
      // console.log(instance)
      // console.log(component.toJSON())
      //for whatever reason you the instance log above does not show the state.
      //however if you run this test - and console.log(this.state) in your component
      //after the state has been set - it shows up.  This is super weird because in my tests
      //im able to see the new state and also all the nodes it generates

      //in my tests i have to mock out my ajax function in component did mount before i can see state update
      //in yours - it populates with wrapoper but not renderer.create

    })
  })
})