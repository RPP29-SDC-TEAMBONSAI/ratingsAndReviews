import 'jsdom-global/register'
import React from 'react'
import { shallow, mount} from 'enzyme'
import helper from '../helpers/qnAHelper.js'
import testData from './QnA-testData'
import renderer from 'react-test-renderer'
import QuestionsNAnswers from '../questions-n-answers/qNa'
import QnAClicks from '../questions-n-answers/QnAClicks.jsx'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'

// import QnAClicks from '../questions-n-answers/QnAClicks.jsx'
// console.log(testData.test)


// jest.mock('../questions-n-answers/QnAClicks.jsx')
jest.mock('../clientRoutes/qa.js')
// jest.mock('../questions-n-answers/qNa')

// jest.mock('../questions-n-answers/QnAClicks.jsx')


const props = {
  product_id: testData.QnAcurrentProductId(),
  currentItemName: 'camo onsie',
  data: testData.QnAComponentQuestionsData()
  // data:testData.data,
  // QuestionSavedData: testData.QuestionSavedData,
  // currentItemName: testData.currentItemName,
  // question_id: testData.question_id

}

let component;
describe('QuestionsNAnswers', () => {
  describe('ComponentDidMount', () => {
    beforeEach(() => {


     const wrapper = mount(
        <QnAClicks>
          {allClicksProps => {
            return <QuestionsNAnswers allClicksProps={allClicksProps} {...props}/>
          }}

        </QnAClicks>
      )
      component = wrapper.find(QuestionsNAnswers).instance()



    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('on mount, it should contain a dynamicData array and savedData array', () => {
      expect(component.state.dynamicData.length > 0).toBe(true)
      expect(component.state.savedData.length > 0).toBe(true)
    })
    test('on mount, dynamicData should be sorted correctly by helpfulness', () => {

      let result = false
      component.state.dynamicData.forEach((question, i) => {
        if(component.state.dynamicData[i+1]){
          if(question.question_helpfulness >= component.state.dynamicData[i+1].question_helpfulness){
            result = true
          }
        }
        return result
      })
      expect(result).toBe(true)
    })
    test('on mount, answers should from sellers, should be shown first', ()=> {
      expect(component.state.dynamicData[0].answers[0].answerer_name.toLowerCase()).toEqual('seller')
      expect(component.state.dynamicData[0].answers[1].answerer_name.toLowerCase() !== 'seller').toBe(true)
    })
  })
  test('', () => {

    let e = {
      target: {
        value: 't'

      }
    }
    let e1 = {
      target:{
        value:'e'
      }
    }
    let e2 = {
      target: {
        value: 'test'
      }
    }

    component.questionSearchChange(e)
    component.questionSearchChange(e1)
    component.questionSearchChange(e2)
    // console.log(component.state.dynamicData.length)
    // console.log(component.state.savedData.length)
  })
})

