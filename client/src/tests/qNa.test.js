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

  // test('')


  describe('ComponentDidMount', () => {
    beforeEach(() => {
      wrapper = shallow(<QuestionsNAnswers {...props}/>)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('on mount, it executes componentDidMount, filterAnswerNQUestions, showMoreAnsweredQuestions, ShowReportedClass all only once', () => {

    let wrapper = shallow(<QuestionsNAnswers {...props} />)
    const instance = wrapper.instance()

    jest.spyOn(instance, 'componentDidMount')
    instance.componentDidMount()

    jest.spyOn(instance, 'getReportedAns')
      return instance.getReportedAns().then(data => {
        let answerIds = data.data

        jest.spyOn(instance, 'filterAnswersNQuestions')
        let sortedData = instance.filterAnswersNQuestions(props.data)
        // console.log(sortedData[1])

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
      // console.log(instance.state.answers, "✅")

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

    test('on mount, state answers should be sorted by seller, then helpfullness - seller answers should also be sorted by helpfulness', () => {
      const instance = wrapper.instance()

      return instance.getReportedAns().then(data => {
        let result = false
        let sellerResult =false
        let sellerIndex;

        instance.state.answers.forEach((answerArr, index) => {
          if (instance.state.answers[index + 1]) {
            answerArr.forEach((answer, i) => {

              if (answer.answerer_name !== 'Seller') {
                if (answerArr[i+1]) {
                  if (answer.helpfulness > answerArr[i + 1].helpfulness) {
                    result = true
                  }
                }

              } else {

                if (index === 0) {
                  sellerIndex = 0
                }

                if(answerArr[i + 1]) {
                  if (answer.helpfulness > answerArr[i + 1].helpfulness) {
                    sellerResult = true
                  }
                }

              }
            })
          }
          return result
        })
        expect(result).toEqual(true)
        expect(sellerResult).toEqual(true)
        expect(sellerIndex).toEqual(0)
      })
    })

    test('on mount, there should be as many answerArrays as questions', () => {
      const instance = wrapper.instance()

      return instance.getReportedAns().then(data => {
        let result = instance.state.questions.length === instance.state.answers.length
        expect(result).toEqual(true)
      })
    })

    test('on mount, answers at a given index in the answers state, correlate to their parent question in the questions state at index', () => {
      const instance = wrapper.instance()

      return instance.getReportedAns().then(data => {
        let index = 0
        let index1 = 1
        let matcher0 = '2171422'
        let matcher1 = '2171483'
        let resultAtIndex0 = instance.state.questions[index].answers[matcher0].id === instance.state.answers[index][index].id
        let resultAtIndex1 = instance.state.questions[index1].answers[matcher1].id === instance.state.answers[index1][index].id

        expect(resultAtIndex0).toEqual(true)
        expect(resultAtIndex1).toEqual(true)
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
        // console.log(component.toJSON().children)
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
        let result = false;

        classes.forEach((obj) => {
          if(obj.children[0].props.className=== 'question Container' && obj.children[1].props.className === 'question Container') {
            result =true;
          }
        })
        expect(result).toEqual(true)
      })
    })
})