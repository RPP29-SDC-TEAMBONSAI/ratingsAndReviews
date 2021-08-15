import React from 'react';
import {shallow} from 'enzyme';
import helper from '../helper-functions/rpHelpers';
import exampleData from '../relatedProducts/newExampleData.js';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import RelatedProducts from '../relatedProducts/RelatedProductsView/RelatedProducts.jsx';
import renderer from 'react-test-renderer'
import axios from 'axios';
import {productsWithId, productsStyle} from '../clientRoutes/products.js'
import { ConsoleWriter } from 'istanbul-lib-report';
import { relatedProductsStyles } from '../relatedProducts/exampleData';

jest.mock('axios')
jest.mock('../clientRoutes/products.js')

const props = {
  state: {
    relatedProducts: [28213, 28214, 28215, 28216],
    product_id: 36300,
    ratings: {4: "1", 5: "1"},
    productInformation: {
      id: 28213,
      campus: "hr-rpp",
      name: "Bright Future Sunglasses",
      slogan: "You've got to wear shades",
      description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      category: "Accessories",
      default_price: "69.00",
      created_at: "2021-07-10T17:00:03.509Z",
      updated_at: "2021-07-10T17:00:03.509Z"
    }

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

    test('on mount, should call componenDidMount once',() => {
      //create new instance to test specific functionality.
      const instance = wrapper.instance()

      let product = instance.product()
      let style = instance.style()

     return  Promise.all([
        product,
        style
      ]).then(results => {
        // console.log(results[1])
          let resultStyleWithId = [];
          results[0].forEach((product, pi) => {
            results[1].forEach((style, si) => {

              if (pi === si) {
                resultStyleWithId.push(helper.addIdToStylesData(style, product.id))

              }
            })
          })

          let allPropsObj = helper.compileRelatedProductsDataToProps(results[0], resultStyleWithId)
          let outfitPropsObj = helper.compileYourOutfitDataToProps(props.state.productInformation, resultStyleWithId[0])
          instance.setState({
            relatedProducts: results[0],
            relatedProductsStyles: resultStyleWithId,
            allPropsObj : allPropsObj,
            outfitPropsObj: outfitPropsObj
          })

          // console.log(instance)
      })

    })
    //unfinished new test for componentDidMount here - this one is for rendering
    test('on mount, component displays correct styles for current related product', () => {


      const component = renderer.create(<RelatedProducts state={props.state}/>)
      const instance = component.getInstance()

      let product = instance.product()
      let style = instance.style()
      return  Promise.all([
        product,
        style
      ]).then(results => {
        // console.log(results[1])
          let resultStyleWithId = [];
          results[0].forEach((product, pi) => {
            results[1].forEach((style, si) => {

              if (pi === si) {
                resultStyleWithId.push(helper.addIdToStylesData(style, product.id))

              }
            })
          })

          let allPropsObj = helper.compileRelatedProductsDataToProps(results[0], resultStyleWithId)
          let outfitPropsObj = helper.compileYourOutfitDataToProps(props.state.productInformation, resultStyleWithId[0])
          instance.setState({
            relatedProducts: results[0],
            relatedProductsStyles: resultStyleWithId,
            allPropsObj : allPropsObj,
            outfitPropsObj: outfitPropsObj
          })

          console.log(component.toJSON().children[0].children[1].children[0].children[0].children)
          console.log(instance)
      })

    })
  })
})



      // product
      //   .then(data => {

      //     style
      //       .then((styleData) => {



      //         let resultStyleWithId = [];
      //         data.forEach((product, pi) => {
      //           styleData.forEach((style, si) => {

      //             if (pi === si) {
      //               resultStyleWithId.push(helper.addIdToStylesData(style, product.id))
      //         //     // console.log(resultStyleWithId)
      //             }
      //           })
      //         })


      //         let allPropsObj = helper.compileRelatedProductsDataToProps(data, resultStyleWithId)
      //         let outfitPropsObj = helper.compileYourOutfitDataToProps(props.state.productInformation, styleData.data)

      //         console.log(allPropsObj)


      //       })
      //   })