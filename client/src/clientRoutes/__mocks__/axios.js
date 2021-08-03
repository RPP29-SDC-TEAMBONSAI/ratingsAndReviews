
import exampleData from '../../relatedProducts/newExampleData.js'
let newStyle = (id) => {
  let currentStyle = exampleData.currentStyles
  return currentStyle[id]
}


module.exports = {
  get: jest.fn((i) =>
   Promise.resolve({data:newStyle(i)})
   ),
}

