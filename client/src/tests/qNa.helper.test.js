import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'
import helper from '../helpers/qnAHelper.js'
import testData from './QnA-testData'


let questions;
describe('filterAll', () => {
  // beforeEach(() => {
  //   let questions = testData.data
  // })

  describe('sortAnswers', () => {
    beforeEach(() => {
      questions  = testData.data

    })
    test('', () => {
      const mock = jest.fn()
      const bound = mock.bind(helper)

      bound()
      // bound.sortQuestions(questions)
      let sortQuestions = mock.mock.instances[0].sortQuestions
      sortQuestions(questions)
      jest.spyOn(mock.mock.instances[0], 'sortQuestions')

      // console.log(mock.mock.instances[0].sortQuestions.mock)
      expect(mock.mock.instances[0].sortQuestions).toBeCalledTimes(1)

    })


  })
})