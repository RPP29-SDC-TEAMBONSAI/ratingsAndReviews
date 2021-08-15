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
import {addToReported, getReportedAns} from '../clientRoutes/qa.js'

jest.mock('../clientRoutes/qa.js')
const props = {
  product_id: testData.QnAcurrentProductId(),
  currentItemName: 'camo onsie',
  data: testData.QnAComponentQuestionsData()

}

describe('QuestionsNAnswers', () => {
  let wrapper
  let component;
  let data = []
  getReportedAns.mockImplementation(() => Promise.resolve({data:data}))
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
    describe('getReportedAns', () => {
      beforeEach(() => {
        let data = [1992445, 2710268]
        getReportedAns.mockImplementationOnce(() => Promise.resolve({data:data}))
        wrapper = renderer.create(
                    <QnAClicks>
                    {allClicksProps => {
                      return <QuestionsNAnswers allClicksProps={allClicksProps} {...props}/>
                    }}

                    </QnAClicks>
                  )

      })

      afterEach(() => {
        jest.clearAllMocks()
      })
      test('when there are previously reported ids, they should populate in QnA reported state', () => {
        expect(wrapper.toTree().rendered.instance.state.reported[0]).toEqual(1992445)
      })
      test('when there are previously reported ids, answer table display should represent reported for ids in reported state array', () => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toEqual('reported')
        expect(wrapper.toJSON().children[3].children[1].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toEqual('reported')
      })
      test('answers that have not been reported, should display report', () => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[1].children[2].children[4].children[0]).toEqual('report')
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[2].children[2].children[4].children[0]).toEqual('report')
        expect(wrapper.toJSON().children[3].children[2].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toEqual('report')
      })
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
    test('on mount, answers from sellers, should be shown first', ()=> {
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
  describe('showQuestions', () => {
    test('it should return true, if current question index is less than current question click count', () => {
      let index = 1
      let count = 5
      let showQuestions = wrapper.find(QuestionsNAnswers).instance().showQuestions
      expect(showQuestions(count, index)).toEqual(true)
    })
    test('it should return true, if current question index equals questions click count', () => {
      let index= 3
      let count = 3
      let showQuestions = wrapper.find(QuestionsNAnswers).instance().showQuestions
      expect(showQuestions(count, index)).toEqual(true)
    })
    test('it should return false if question index is greater than question click count', () => {
      let index= 4
      let count = 3
      let showQuestions = wrapper.find(QuestionsNAnswers).instance().showQuestions
      expect(showQuestions(count, index)).toEqual(false)
    })
  })
  describe('updateQuestions', () => {
    let props
    let wrapper
    let component
    beforeEach(() => {
      props = {
        product_id: testData.questions1_productId(),
        currentItemName: 'camo onsie',
        data: testData.questions1()
      }
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
    test('triggering update questions, should change the dynamicData state with new question', () => {
      let prevLength = component.state.dynamicData.length
      component.updateQuestions().then(() => {
        expect(prevLength < component.state.dynamicData.length).toBe(true)
      })
    })
    test('triggering update questions, should change the savedData state with new question', () => {
      let prevLength = component.state.savedData.length
      component.updateQuestions().then(() => {
        expect(prevLength < component.state.savedData.length).toBe(true)
      })
    })
  })
  describe('updateAnswers', () => {
    let props
    let wrapper
    let component
    beforeEach(() => {
      props = {
        product_id: testData.questions1_productId(),
        currentItemName: 'camo onsie',
        data: testData.questions1()
      }
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
    test('triggering update answers, should add an answer to a question in dynamicData state', () => {
      let prevAnsLength = component.state.dynamicData[0].answers.length
      component.updateAnswers().then(() => {
        expect(prevAnsLength < component.state.dynamicData[0].answers.length).toBe(true)
      })
    })
    test('triggering update answers, should add an answer to a question in savedData state', () => {
      let prevAnsLength = component.state.savedData[0].answers.length
      component.updateAnswers().then(() => {
        expect(prevAnsLength < component.state.savedData[0].answers.length).toBe(true)
      })
    })
  })
  describe('addToReported', () => {
    let props
    let wrapper
    let recordClick
    beforeEach(() => {
      props = {
        product_id: testData.questions1_productId(),
        currentItemName: 'camo onsie',
        data: testData.questions1()
      }
      wrapper = renderer.create(
        <QnAClicks>
        {allClicksProps => {
          return (
            <QuestionsNAnswers allClicksProps={allClicksProps} {...props}/>

            )

        }}
        </QnAClicks>
      )
      recordClick = jest.fn()
      let ansIds = []
      addToReported.mockImplementation((data) => {
         if(!ansIds.includes(data)) {
          ansIds.push(data)
         }
        return Promise.resolve(ansIds)
      })
      recordClick.mockImplementation(() => { return {e: {target: {className:'moreAnsweredBtn'}}}})
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('when addToReported is clicked, it should update the state of the current reported answers', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {

        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)

        resolve(wrapper)
      }).then(newWrapper => {

        expect(newWrapper.toTree().rendered.instance.state.reported.length > 0).toBe(true)
        // expect(newWrapper.toTree().rendered.instance.addToReported).toBeCalled()
      })
    })
    test('when addToReported is clicked, it should update corresponding answer in dynamicData reported property to reported', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toTree().rendered.instance.state.dynamicData[0].answers[0].report).toEqual('reported')
      })
    })
    test('before addToReported is clicked for a specific answer, the display state should be report', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
    })
    test('when addToReported is clicked, it should update answer table display accordingly', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('reported')
      })
    })
    test('when add to reported is clicked multiple times on the same answer, the state reported length should not increase', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toTree().rendered.instance.state.reported.length).toEqual(1)
      })
    })
    test('when add to reported is clicked multiple times on the same answer, the display for the answer should remain as reported', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('reported')
      })
    })
    test('when add to reported is clicked multiple times on the on different answers, the state reported length should increase by the amount of newly added answerIds', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        expect(wrapper.toTree().rendered.instance.state.reported.length).toEqual(0)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[1].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toTree().rendered.instance.state.reported.length).toEqual(2)
      })
    })
    test('when add to reported is clicked multiple times on the on different answers, the display state for the reported answers should change to reported', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[1].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {

        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('reported')
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('reported')
      })
    })
    test('when add to reported is clicked multiple times on the on different answers in different questions, the reported state length should increase by newly added answerIds', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toTree().rendered.instance.state.reported.length).toEqual(0)
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[1].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toTree().rendered.instance.state.reported.length).toEqual(2)

      })
    })
    test('when add to reported is clicked multiple times on the on different answers in different questions, the display for each answer table in each question should change to reported', () => {
      let e = {
        target : {className: 'moreAnsweredBtn'}
      }
      return new Promise ((resolve, reject) => {
        expect(wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('report')
        wrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        wrapper.toJSON().children[3].children[1].children[0].children[0].children[0].children[1].children[0].children[2].children[4].props.onClick(e)
        resolve(wrapper)
      }).then(newWrapper => {
        expect(newWrapper.toJSON().children[3].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('reported')
        expect(newWrapper.toJSON().children[3].children[1].children[0].children[0].children[0].children[1].children[0].children[2].children[4].children[0]).toBe('reported')
      })
    })
  })
})


