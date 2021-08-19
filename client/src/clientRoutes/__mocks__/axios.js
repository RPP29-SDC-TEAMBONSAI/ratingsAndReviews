
//import exampleData from '../../relatedProducts/newExampleData.js'



let newStyle = (id) => {
  let currentStyle = exampleData.currentStyles
  // console.log(currentStyle[id])
  return currentStyle[id]

}



module.exports = {
  get: jest.fn((i) =>
    // console.log(i)
    // console.log(exampleData.currentSty)\
  //  console.log(exampleData.currentStyles[i][0])
  // console.log(i)

   Promise.resolve({data: exampleData.currentStyles[i]})

  // console.log('hi')
  ),
}
