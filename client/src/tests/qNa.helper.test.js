import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'
import helper from '../helpers/qnAHelper.js'
import testData from './QnA-testData'

describe('helper', () => {
  describe('createDynamicData', () => {
    let data = testData.helperTestData()
    let dynamicData;
    beforeEach(() => {
      dynamicData = helper.createDynamicData(data)
    })

    test('it should match the length of the original question results array input', () => {
      expect(dynamicData.length === testData.helperTestData().length).toBe(true)
    })

    test('each question in dynamicData array, should contain an answers array', () => {
      dynamicData.forEach((question) => {
        expect(question.answers).toBeInstanceOf(Array)
      })
    })

    test('expect the questions in dynamicData, to be sorted by helpfulness count', () => {
      let sorted;

      dynamicData.forEach((question, index) => {
        if (dynamicData[index + 1]) {
          if (question.question_helpfulness >= dynamicData[index + 1].question_helpfulness) {
            sorted = true
          } else {
            sorted = false
          }
        }
      })
      expect(sorted).toBe(true)
    })
  })

  describe('sortAnswers', () => {
    let newQuestionsWithAnsArr;
    let sortedAns;
    beforeEach(() => {
      let finalQuestions = testData.helperTestData().sort((a, b) => {
        return b.question_helpfulness - a.question_helpfulness
        // return b = a
      })
      newQuestionsWithAnsArr = finalQuestions.filter((question) => {

        let newAns = Object.values(question.answers)
        question.answers = newAns
        return finalQuestions
      })
    })
    test('sellers should be listed first', () => {
      sortedAns = helper.sortAnswers(newQuestionsWithAnsArr[0].answers)
      expect(sortedAns[0].answerer_name.toLowerCase() === 'seller').toBe(true)
    })
    test('sellers should be sorted by helpfulness', () => {
      let sorted;
      sortedAns = helper.sortAnswers(newQuestionsWithAnsArr[0].answers)
        .filter((answer) => {
          if (answer.answerer_name.toLowerCase() ==='seller') {
            return helper.sortAnswers(newQuestionsWithAnsArr[0].answers)
          }
        })

      sortedAns.forEach((answer, i) => {
        if (sortedAns[i+1]) {
          if (answer.helpfulness >= sortedAns[i+1].helpfulness) {
            sorted = true
          } else {
            sorted = false
          }
        }
        expect(sorted).toBe(true)
      })
    })
    test('users should be sorted by helpfulness', () => {
      let sorted;
      sortedAns = helper.sortAnswers(newQuestionsWithAnsArr[0].answers)
        .filter((answer) => {
          if (answer.answerer_name.toLowerCase() !=='seller') {
            return helper.sortAnswers(newQuestionsWithAnsArr[0].answers)
          }
        })

      sortedAns.forEach((answer, i) => {
        if (sortedAns[i+1]) {
          if (answer.helpfulness >= sortedAns[i+1].helpfulness) {
            sorted = true
          } else {
            sorted = false
          }
        }
        expect(sorted).toBe(true)
      })
    })
  })

  describe('filterSearchInput', () => {
    test('should return a new questions results array, that include search term', ()=> {
      let questions= testData.helperTestData();;
      let value = '123'
      let value2='photos for all'
      let newQuestions = helper.filterSearchInput(questions, value);
      let newQuestions2 = helper.filterSearchInput(questions, value2);
      newQuestions.forEach(question => {
        expect(question.question_body.includes(value)).toBe(true)
      })
      newQuestions2.forEach(question => {
        expect(question.question_body.includes(value)).toBe(true)
      })
    })
  })

  describe('moreAnsweredQButtonDisplay', () => {
    let clickCount;
    let index;
    test('it should return true, when input click count equals input index', () => {
      clickCount =3
      index = 3
      expect(helper.moreAnsweredQButtonDisplay(clickCount, index)).toBe(true)
    })
    test('it should return true, when clickCount - 1 equals index',  () => {
      clickCount = 5
      index = 4
      expect(helper.moreAnsweredQButtonDisplay(clickCount, index)).toBe(true)

    })
    test('it should return false, when clickCount does not equal index', () => {
      clickCount = 1;
      index = 0;
      expect(helper.moreAnsweredQButtonDisplay(clickCount, index)).toBe(false)
    })
    it('it should return false, when clickCount is less than three', () => {
      clickCount = 1;
      index = 0;
      expect(helper.moreAnsweredQButtonDisplay(clickCount, index))
    })
  })

  describe('showQuestionsClass', () => {
    let clickCount;
    let index;
    test('it should return true if input index is less than input clickCount', () => {
      clickCount = 10;
      index = 9;
      expect(helper.showQuestionsClass(clickCount, index)).toBe(true)
    })
    test('it should return true if input index is equal to input clickCount', () => {
      clickCount = 10;
      index = 10;
      expect(helper.showQuestionsClass(clickCount, index)).toBe(true)
    })

    test('is should return false if input index is greater than input clickCount', () => {
      clickCount = 10;
      index = 11;
      expect(helper.showQuestionsClass(clickCount, index)).toBe(false)
    })
  })

  describe('addReportedProp', () => {
    let answerIds =[]
    test('it should add a report property to answers', () => {
      let newQuestions = helper.createDynamicData(testData.helperTestData())
      newQuestions = helper.addReportedProp(newQuestions, answerIds)
      expect(Boolean(newQuestions[0].answers[0].report)).toBe(true)
    })
    test('it should add a reported property, to answers that have been reported', () => {
      answerIds = [1, 2, 3]
      let newQuestions = helper.createDynamicData(testData.helperTestData())
      newQuestions = helper.addReportedProp(newQuestions, answerIds)
      expect(newQuestions[0].answers[2].report).toEqual('Reported')
      expect(newQuestions[0].answers[3].report).toEqual('Reported')
      expect(newQuestions[0].answers[4].report).toEqual('Reported')
    })
  })
})
