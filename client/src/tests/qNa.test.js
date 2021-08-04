import React from 'react'
import { shallow, mount} from 'enzyme'
import helper from '../helpers/qnAHelper.js'
import testData from './QnA-testData'
import renderer from 'react-test-renderer'
import QuestionsNAnswers from '../questions-n-answers/qNa'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'
// console.log(testData.test)

const props = {
  product_id: testData.product_id,
  data:testData.data,
  QuestionSavedData: testData.QuestionSavedData,
  currentItemName: testData.currentItemName,
  question_id: testData.question_id
}

jest.mock('../clientRoutes/qa.js')
let wrapper;

describe('QuestionsNAnswers', () => {
  describe('ComponentDidMount', () => {
    beforeEach(() => {
      wrapper = shallow(<QuestionsNAnswers {...props}/>)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('on mount, it executes componentDidMount, filterAnswerNQUestions, showMoreAnsweredQuestions, ShowReportedClass all only once', () => {


    const instance = wrapper.instance()


    jest.spyOn(instance, 'componentDidMount')
    instance.componentDidMount()
    // console.log(instance)

    jest.spyOn(instance, 'getReportedAns')
      return instance.getReportedAns().then(data => {
        console.log(instance)
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

        let answerResultAtAnswerArray0_index0 = instance.state.answers[0][0].id
        let correctAnswerAtQuestinIndex0_answers0 = testData.sortedData1[0].answers[0].id
        expect(answerResultAtAnswerArray0_index0 === correctAnswerAtQuestinIndex0_answers0).toEqual(true)

        let answerResultAtAnswerArray0_index1 = instance.state.answers[0][1].id
        let correctAnswerAtQuestinIndex0_answers1 = testData.sortedData1[0].answers[1].id
        expect(answerResultAtAnswerArray0_index1 === correctAnswerAtQuestinIndex0_answers1).toEqual(true)

        let answerResultAtAnswerArray0_index2 = instance.state.answers[0][2].id
        let correctAnswerAtQuestinIndex0_answers2 = testData.sortedData1[0].answers[2].id
        expect(answerResultAtAnswerArray0_index2 === correctAnswerAtQuestinIndex0_answers2).toEqual(true)
        // expect(resultAtIndex1).toEqual(true)
        let answerResultAtAnswerArray1_index0 = instance.state.answers[1][0].id
        let correctAnswerAtQuestinIndex1_answers0 = testData.sortedData1[1].answers[0].id
        expect(answerResultAtAnswerArray1_index0 === correctAnswerAtQuestinIndex1_answers0).toEqual(true)

        let answerResultAtAnswerArray1_index1 = instance.state.answers[1][1].id
        let correctAnswerAtQuestinIndex1_answers1 = testData.sortedData1[1].answers[1].id
        expect(answerResultAtAnswerArray1_index1 === correctAnswerAtQuestinIndex1_answers1).toEqual(true)

        let answerResultAtAnswerArray1_index2 = instance.state.answers[1][2].id
        let correctAnswerAtQuestinIndex1_answers2 = testData.sortedData1[1].answers[2].id
        expect(answerResultAtAnswerArray1_index2 === correctAnswerAtQuestinIndex1_answers2).toEqual(true)

        let answerResultAtAnswerArray1_index3 = instance.state.answers[1][3].id
        let correctAnswerAtQuestinIndex1_answers3 = testData.sortedData1[1].answers[3].id
        expect(answerResultAtAnswerArray1_index3 === correctAnswerAtQuestinIndex1_answers3).toEqual(true)

        let answerResultAtAnswerArray1_index4 = instance.state.answers[1][4].id
        let correctAnswerAtQuestinIndex1_answers4 = testData.sortedData1[1].answers[4].id
        expect(answerResultAtAnswerArray1_index4 === correctAnswerAtQuestinIndex1_answers4).toEqual(true)
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
          if(obj.children[0].props.className=== 'question container' && obj.children[1].props.className === 'question container') {
            result =true;
          }
        })
        expect(result).toEqual(true)
      })
    })

    describe('More Answered Questions', () => {
      test('before click, question scroll container should not appear', () => {
        const component = renderer.create(<QuestionsNAnswers {...props}/>);
        const instance = component.getInstance()

        instance.componentDidMount()

        return instance.getReportedAns().then(data => {
          let buttonClass = component.toJSON().children[3].props.className;
          expect(buttonClass).toEqual('questionList container')
        })
      })
      test('on click, question list should change to a scroll container', () => {
        const component = renderer.create(<QuestionsNAnswers {...props}/>);
        const instance = component.getInstance()
        instance.componentDidMount()

        return instance.getReportedAns().then(data => {
          jest.spyOn(instance, 'loadQuestionClick')
          instance.loadQuestionClick()
          let buttonClass = component.toJSON().children[3].props.className
          expect(instance.loadQuestionClick).toBeCalledTimes(1);
          expect(buttonClass).toEqual('questionList scroll container')
        })
      })
      test('on each click, two more questions/answers should appear', () => {
        const component = renderer.create(<QuestionsNAnswers {...props}/>);
        const instance = component.getInstance()
        instance.componentDidMount()


        return instance.getReportedAns().then(data => {
          // console.log(instance)
          jest.spyOn(instance, 'loadQuestionClick')
          let currentQuestions = component.toJSON().children[3].children[0].children;
          let currentShowClassDivs = currentQuestions.filter((question) => {
            if (question.props.className === 'question container') {
              return question;
            }
          })

          // console.log(showClassesB4Click)
          expect(instance.loadQuestionClick).toBeCalledTimes(0)
          expect(currentShowClassDivs.length).toEqual(2)

          instance.loadQuestionClick()
          let firstClickQuestions = component.toJSON().children[3].children[0].children
          let firstClickShowClassDivs = firstClickQuestions.filter((question) => {
            if (question.props.className === 'question container') {
              return question;
            }
          })
          expect(instance.loadQuestionClick).toBeCalledTimes(1)
          expect(firstClickShowClassDivs.length).toEqual(4)

          instance.loadQuestionClick()
          let secondClickQuestions = component.toJSON().children[3].children[0].children
          // console.log(component.toJSON().children[3].children[0])
          let secondClickShowClassDivs = secondClickQuestions.filter((question) => {
            if (question.props.className === 'question container') {
              return question;
            }
          })
          expect(instance.loadQuestionClick).toBeCalledTimes(2)
          expect(secondClickShowClassDivs.length).toEqual(6)

        })
      })
      xtest('', () => {
        const wrapper = shallow(<QuestionsNAnswers {...props}/>);

      })
    })
})