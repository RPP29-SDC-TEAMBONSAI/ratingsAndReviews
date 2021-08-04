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
const props = {
  state: {
    styles:testData.styles,
    ratings:{4: "1", 5: "1"},
    productInformation: testData.productInformation

  }
}
let wrapper;
let component;
describe('Overview component (index.jsx)', () => {
  beforeEach(() => {
    wrapper = shallow(<Overview {...props}/>)

  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('on load', () => {
    test('it should pass props styles and ratings for rending', () => {
      //create instance
      const instance = wrapper.instance()
      // console.log(instance)
      // console.log(wrapper.props().children[0].props.children.props.state.styles)
      //target styles
      let styles = instance.props.state.styles
      //target ratings
      let ratings = instance.props.state.ratings
      //verify they contain information
      expect(Boolean(styles.length)).toBe(true)
      expect(Boolean(Object.keys(ratings).length)).toBe(true)


    })
    describe('on product change', () => {
      test('it should receive different prop values', () => {
        //create instance
        const instance = wrapper.instance()
        //test instance before reset
        expect(instance.props.state.styles[0].style_id).toEqual(162332)
        expect(Boolean(Object.values(instance.props.state.ratings).length)).toBe(true)
        //create newProps reset obj
        const newProps = {
          state:{
            styles:[],
            ratings:{}
          }
        }
        //reset props
        wrapper.setProps(newProps)
        //test to make sure they are now different
        expect(instance.props.state.styles[0]).toEqual(undefined)
        expect(Object.values(instance.props.state.ratings)[0]).toEqual(undefined)
      })
    })
  })

  describe('rendering', () => {
    beforeEach(() => {
     component = renderer.create(<Overview {...props}/>)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    describe('on mount', () => {
      test('default load product name should be Camo Onesie', () => {

        const instance = component.getInstance()
        // console.log(component.toJSON().children[1].children[0].children[2].children[0])
        let initial_product = component.toJSON().children[1].children[0].children[2].children[0];
        expect(initial_product).toEqual('Camo Onesie')
      })
    })
  })
})


// describe('props', () => {
//     test('props should have', () => {
//       const wrapper = shallow(
//         <Overview state = {mockProps}/>

//       )
//       const instance = wrapper.instance();
//       instance.changeSelectedQuantity({target: {value: 2}});
//       expect(instance.state.quantitySelected).toBe(2);
//     })
//   })

//   describe('snapshot', ()=> {
//     test('should be snap shotty', () => {
//       const component = renderer.create(<Overview state = {mockProps}/>);
//       const instance = component.getInstance();
//       console.log('yurrrp', component.toJSON())

//     })
//   })