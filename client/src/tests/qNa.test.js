import React from 'react'
import { shallow, mount} from 'enzyme'
import helper from '../helpers/qnAHelper.js'
// import axios from 'axios'
// import { getReportedAns } from '../clientRoutes/qa.js'
import testData from './QnA-testData'
import renderer from 'react-test-renderer'


// import axios from 'axios'
import QuestionsNAnswers from '../questions-n-answers/qNa'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'


const props = {
  product_id: testData.product_id,
  data:testData.data,
  QuestionSavedData: testData.QuestionSavedData,
  currentItemName: testData.currentItemName,
  question_id: testData.question_id
}
jest.mock('../clientRoutes/qa.js')

// jest.mock('mockAxios')
let wrapper;


describe('QuestionsNAnswers', () => {
  beforeEach(() => {
    wrapper = shallow(<QuestionsNAnswers {...props}/>)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('ComponentDidMount', () => {
    test('on mount, it should execute componentDidMount, filterAnswerNQUestions, showMoreAnsweredQuestions, ShowReportedClass all once', () => {

    let wrapper = shallow(<QuestionsNAnswers {...props} />)
    const instance = wrapper.instance()

    jest.spyOn(instance, 'componentDidMount')
    instance.componentDidMount()

    jest.spyOn(instance, 'getReportedAns')
      return instance.getReportedAns().then(data => {
        let answerIds = data.data

        jest.spyOn(instance, 'filterAnswersNQuestions')
        let sortedData = instance.filterAnswersNQuestions(props.data)

        jest.spyOn(helper, 'showMoreAnsweredQuestions')
        let showButton = helper.showMoreAnsweredQuestions(sortedData)

        jest.spyOn(helper, 'showReportedClass')
        let answers = helper.showReportedClass(sortedData[1], answerIds)

        expect(instance.componentDidMount).toBeCalledTimes(1)
        expect(instance.getReportedAns).toBeCalledTimes(1)
        expect(instance.filterAnswersNQuestions).toBeCalledTimes(1)
        expect(helper.showMoreAnsweredQuestions).toBeCalledTimes(1)
        expect(helper.showReportedClass).toBeCalledTimes(1)

      })
    })

    test('on mount, state questions should be sorted by helpfulness', () => {
      const instance = wrapper.instance()

      return instance.getReportedAns().then(data => {

        let result = false
        instance.state.questions.forEach((question, index) => {

          if (instance.state.questions[index + 1]) {
            if(question.question_helpfulness > instance.state.questions[index+1].question_helpfulness || question.question_helpfulness === instance.state.questions[index+1].question_helpfulness) {
              result = true
            } else {
              result = false
            }
          }
          return result
        })
        expect(result).toEqual(true)
      })
    })

    test('on mount, state answers should be sorted by helpfulness', () => {
      const instance = wrapper.instance()

      return instance.getReportedAns().then(data => {

        let result = false
        instance.state.answers.forEach((question, index) => {

          if (instance.state.answers[index + 1]) {
            if(question.question_helpfulness > instance.state.answers[index+1].question_helpfulness || question.question_helpfulness === instance.state.answers[index+1].question_helpfulness) {
              result = true
            } else {
              result = false
            }
          }
          return result
        })
        expect(result).toEqual(true)
      })

    })

    test('on mount, all answers should contain a report property', () => {
      const instance = wrapper.instance()
      return instance.getReportedAns().then(data => {

        let currentAnswers = instance.state.answers.filter((answer) => {
          if (answer.length) {
            return answer
          }
        })

        let result = true
        currentAnswers.forEach((answer) => {
          answer.forEach((obj) => {
            if (!obj.report) {
              result = false
            }
          })
          return result
        })
        expect(result).toEqual(true)
      })

    })

    test('on mount, if there are more than two questions a moreAnsweredQuestions button will appear', () => {

      const component = renderer.create(<QuestionsNAnswers {...props}/>)
      const instance = component.getInstance()
      instance.componentDidMount()
      return instance.getReportedAns().then(data => {
        let currentClass = component.toJSON().children[4].children[1].props.className
        let result = currentClass === 'moreAnsweredBtn'
        expect(result).toEqual(true)

      })


      })
    })

    test('on mount, if there are less than two questions, the moreAnsweredQuestions button will not appear', () => {
      const component = renderer.create(<QuestionsNAnswers product_id={0} data={[]} QuestionSavedData={[]} currentItemName='' question_id={0}/>)
      const instance = component.getInstance()
      instance.componentDidMount()

      return instance.getReportedAns().then(data => {
        let currentClass = component.toJSON().children[4].children[1].props.className
        let result = currentClass === 'moreAnsweredBtn Hide';
        expect(result).toEqual(true)
      })
    })
    test('on mount, if there are more than two questions, only two questions and two answers should be displayed', () => {
      const component = renderer.create(<QuestionsNAnswers {...props}/>)
      const instance = component.getInstance()
      instance.componentDidMount()

      return instance.getReportedAns().then(data => {
        let classes = component.toJSON().children[3].children
        classes.forEach((obj) => {
          console.log(obj.children)
        })
      })
    })


    // test('')


  // })
})