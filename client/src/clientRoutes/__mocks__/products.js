

import exampleData from '../../relatedProducts/newExampleData.js'
import {get, newId} from './axios.js'

let products= (id) => {
  let currentProducts = exampleData.currentProducts
  return currentProducts[id]
}

module.exports = {
  productsWithId: jest.fn((id) => Promise.resolve({data:{id:products(id)}})),
  productsStyle: jest.fn((id) => Promise.resolve(get(`${id}`)))
}


    // 28213:{
    //   "id": 28213,
    //   "campus": "hr-rpp",
    //   "name": "Bright Future Sunglasses",
    //   "slogan": "You've got to wear shades",
    //   "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    //   "category": "Accessories",
    //   "default_price": "69.00",
    //   "created_at": "2021-07-10T17:00:03.509Z",
    //   "updated_at": "2021-07-10T17:00:03.509Z"
    // },
    // 28214: {
    //   "id": 28214,
    //   "campus": "hr-rpp",
    //   "name": "Morning Joggers",
    //   "slogan": "Make yourself a morning person",
    //   "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
    //   "category": "Pants",
    //   "default_price": "40.00",
    //   "created_at": "2021-07-10T17:00:03.509Z",
    //   "updated_at": "2021-07-10T17:00:03.509Z"
    // },
    // 28215: {
    //   "id": 28215,
    //   "campus": "hr-rpp",
    //   "name": "Slacker's Slacks",
    //   "slogan": "Comfortable for everything, or nothing",
    //   "description": "I'll tell you how great they are after I nap for a bit.",
    //   "category": "Pants",
    //   "default_price": "65.00",
    //   "created_at": "2021-07-10T17:00:03.509Z",
    //   "updated_at": "2021-07-10T17:00:03.509Z"
    // },
    // 28216: {
    //   "id": 28216,
    //   "campus": "hr-rpp",
    //   "name": "Heir Force Ones",
    //   "slogan": "A sneaker dynasty",
    //   "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
    //   "category": "Kicks",
    //   "default_price": "99.00",
    //   "created_at": "2021-07-10T17:00:03.509Z",
    //   "updated_at": "2021-07-10T17:00:03.509Z"
    // }