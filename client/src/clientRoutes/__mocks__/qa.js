import testData from '../../tests/QnA-testData'
module.exports = {
  getReportedAns: jest.fn(),
  questions: jest.fn(() => Promise.resolve({data: testData.questons2()})),
  addToReported: jest.fn()


}