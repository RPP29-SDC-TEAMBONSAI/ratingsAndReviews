import 'jsdom-global/register'
import React from 'react'
import { shallow, mount, render} from 'enzyme'
import helper from '../helpers/qnAHelper.js'
import testData from './QnA-testData'
import renderer from 'react-test-renderer'
import QuestionsNAnswers from '../questions-n-answers/qNa'
import QnAClicks from '../questions-n-answers/QnAClicks.jsx'
// import QuestionList from '../questions-n-answers/sub-components/mini-components/questionList.jsx'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'



jest.mock('../clientRoutes/qa.js')

const props = {
  product_id: testData.QnAcurrentProductId(),
  currentItemName: 'camo onsie',
  data: testData.QnAComponentQuestionsData()

}

describe('QuestionsNAnswers', () => {
  let wrapper
  let component;
  beforeEach(() => {
    wrapper = mount(
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

  describe('ComponentDidMount', () => {

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
      test('on mount, answers from sellers, should be shown first', ()=> {
        // jest.spyOn(component, 'showQuestions')
        // expect(component.showQuestions).toBeCalled()

        expect(component.state.dynamicData[0].answers[0].answerer_name.toLowerCase()).toEqual('seller')
        expect(component.state.dynamicData[0].answers[3].answerer_name.toLowerCase() !== 'seller').toBe(true)
      })
      test('on mount, if a question contains multiple seller answers, they should be sorted by helpfulness and remain at top of list', () => {
        let QuestionAnswersWSellers = component.state.dynamicData[0].answers
        expect(QuestionAnswersWSellers[0].helpfulness).toEqual(9)
        expect(QuestionAnswersWSellers[0].answerer_name.toLowerCase()).toEqual('seller')
        expect(QuestionAnswersWSellers[1].helpfulness).toEqual(1)
        expect(QuestionAnswersWSellers[1].answerer_name.toLowerCase()).toEqual('seller')
        expect(QuestionAnswersWSellers[2].helpfulness).toEqual(0)
        expect(QuestionAnswersWSellers[2].answerer_name.toLowerCase()).toEqual('seller')
        expect(QuestionAnswersWSellers[3].answerer_name !== 'seller').toBe(true)
      })
    })
    describe('componentDidUpdate', () => {

      test('should not filter when user question character count is less than 3', () => {
        let searchInput = wrapper.find('input.searchInput')
        jest.spyOn(component, 'searchFilter')
        searchInput.simulate('change', {target: {value: 't'}})
        searchInput.simulate('change', {target: {value: 'te'}})

        expect(component.state.qSearchCharCount).toEqual(2)
        expect(component.state.questionSearchVal).toEqual('te')
        expect(component.state.dynamicData.length === component.state.savedData.length)
        expect(component.searchFilter).toBeCalledTimes(0)
      })

      test('should start filtering questions when search character count is 3', () => {
        let searchInput = wrapper.find('input.searchInput')
        jest.spyOn(component, 'searchFilter')
        searchInput.simulate('change', {target: {value: 't'}})
        searchInput.simulate('change', {target: {value: 'te'}})
        searchInput.simulate('change', {target: {value: 'tes'}})

        expect(component.state.qSearchCharCount).toEqual(3)
        expect(component.state.questionSearchVal).toEqual('tes')
        expect(component.state.dynamicData.length !== component.state.savedData.length)
        expect(component.searchFilter).toBeCalledTimes(1)
      })

      test('should continue filtering answers as character count increases (past 3)', () => {

        let searchInput = wrapper.find('input.searchInput')
        jest.spyOn(component, 'searchFilter')

        searchInput.simulate('change', {target: {value: 't'}})
        searchInput.simulate('change', {target: {value: 'te'}})
        searchInput.simulate('change', {target: {value: 'tes'}})
        let dynamicDataAt3Count = component.state.dynamicData.slice()
        expect(component.searchFilter).toBeCalledTimes(1)

        searchInput.simulate('change', {target: {value: 'test'}})
        let dynamicDataAt4Count = component.state.dynamicData.slice()
        expect(component.searchFilter).toBeCalledTimes(2)


        searchInput.simulate('change', {target: {value: 'testt'}})
        let dynamicDataAt5Count = component.state.dynamicData.slice()
        expect(component.searchFilter).toBeCalledTimes(3)
        expect(dynamicDataAt3Count.length > dynamicDataAt4Count.length && dynamicDataAt4Count.length > dynamicDataAt5Count.length).toBe(true)
      })

      test('should return to original display state when user clears search input', () => {
        let searchInput = wrapper.find('input.searchInput')
        searchInput.simulate('change', {target: {value: 't'}})
        searchInput.simulate('change', {target: {value: 'te'}})
        searchInput.simulate('change', {target: {value: 'tes'}})
        searchInput.simulate('change', {target: {value: 'test'}})
        searchInput.simulate('change', {target: {value: 'testt'}})
        let prevState = Object.assign({}, component.state)
        searchInput.simulate('change', {target: {value: ''}})
        expect(prevState.dynamicData.length < component.state.dynamicData.length).toBe(true)
        expect(component.state.dynamicData.length === testData.QnAComponentQuestionsData().length)
      })

      test('should return to original display state when users removes search characters so that less than three remain', () => {
        let searchInput = wrapper.find('input.searchInput')
        searchInput.simulate('change', {target: {value: 't'}})
        searchInput.simulate('change', {target: {value: 'te'}})
        searchInput.simulate('change', {target: {value: 'tes'}})
        searchInput.simulate('change', {target: {value: 'test'}})
        searchInput.simulate('change', {target: {value: 'testt'}})
        let prevState = Object.assign({}, component.state)
        searchInput.simulate('change', {target: {value: 'test'}})
        searchInput.simulate('change', {target: {value: 'tes'}})
        searchInput.simulate('change', {target: {value: 'te'}})
        expect(prevState.dynamicData.length < component.state.dynamicData.length).toBe(true)
      })

      describe('questionSearchChange', () => {
        test('it should incriment qSearchCharCount state by one, on each new input character', () => {
          let searchInput = wrapper.find('input.searchInput')

          searchInput.simulate('change', {target: {value: 't'}})
          let value = component.state.qSearchCharCount
          expect(value).toEqual(1)

          searchInput.simulate('change', {target: {value: 'te'}})
          let value2 = component.state.qSearchCharCount
          expect(value2).toEqual(2)

          searchInput.simulate('change', {target: {value: 'tes'}})
          let value3 = component.state.qSearchCharCount
          expect(value3).toEqual(3)

          searchInput.simulate('change', {target: {value: 'test'}})
          let value4 = component.state.qSearchCharCount
          expect(value4).toEqual(4)
        })

        test('it should change question questionSearchVal state, as characters are added', () => {
          let searchInput = wrapper.find('input.searchInput')


          expect(component.state.questionSearchVal).toEqual('HAVE A QUESTION? SEARCH FOR ANSWERS...')

          searchInput.simulate('change', {target: {value: ''}})
          expect(component.state.questionSearchVal).toEqual('')

          searchInput.simulate('change', {target: {value: 't'}})
          expect(component.state.questionSearchVal).toEqual('t')
        })
      })


    })
  })
    describe('Questions/Answers Display', () => {
      describe('questionlist display', () => {
        test('on load, if dynamicData length is greater than 2, it should hide all but first two questions/answers', () => {
          let component;
          // let props = {
          //   product_id: testData.QnAcurrentProductId(),
          //   currentItemName: 'camo onsie',
          //   data: testData.showQuestionsData1()
          // }

          return new Promise((resolve, reject) => {
            component = renderer.create(
              <QnAClicks>
                {allClicksProps => {
                  return <QuestionsNAnswers allClicksProps={allClicksProps} {...props}/>
                }}

              </QnAClicks>
            )
            resolve(component)


          })
          .then(newComponent => {
            let questions = (newComponent.toJSON().children[3].children)
            expect(questions[0].props.className).toEqual('list scroll container')
            expect(questions[1].props.className).toEqual('list scroll container')
            expect(questions[2].props.className).toEqual('list container hide')
          })

        })
      })
      describe('more answered questions button display', () =>{


        test('on load, if dynamicData length is less than 2, it should hide more answered questions button and show the only two questions', () => {
          let component;
          let props = {
            product_id: testData.QnAcurrentProductId(),
            currentItemName: 'camo onsie',
            data: testData.showQuestionsData1()
          }

          return new Promise((resolve, reject) => {
            component = renderer.create(
              <QnAClicks>
                {allClicksProps => {
                  return <QuestionsNAnswers allClicksProps={allClicksProps} {...props}/>
                }}

              </QnAClicks>
            )
            resolve(component)


          })
          .then(newComponent => {
            let questions = newComponent.toJSON().children[3].children
            let button = newComponent.toJSON().children[4].children[1].children[0]

            expect(questions[0].props.className).toEqual('list scroll container')
            expect(questions[1].props.className).toEqual('list scroll container')
            expect(button.props.className).toEqual('moreAnsweredBtn Hide')

          })


      })
    })
  })
  describe('Other Functionality', () => {
    describe('showQuestions', () => {
      test('should take the current question click count and current index and render the correct questions', () => {


    })
  })
})


// describe('extras', () => {
//   test('moreAnswered', () => {
//     let component;
//     let props = {
//       product_id: testData.QnAcurrentProductId(),
//       currentItemName: 'camo onsie',
//       data: testData.showQuestionsData1()
//     }
//     return new Promise((resolve, reject) => {
//       component = renderer.create(
//         <QnAClicks>
//           {allClicksProps => {
//             return <QuestionsNAnswers allClicksProps={allClicksProps} {...props}/>
//           }}

//         </QnAClicks>
//       )
//       resolve(component)


//     })
//     .then(newComponent => {
//       console.log(newComponent.toJSON().children[4].children[1].children[0].props.className)
//       // console.log(newComponent.getInstance())
//     })

//   })
// })