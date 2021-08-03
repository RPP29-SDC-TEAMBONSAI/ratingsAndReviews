
let example = {
  "id": 28212,
  "campus": "hr-rpp",
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140.00",
  "created_at": "2021-07-10T17:00:03.509Z",
  "updated_at": "2021-07-10T17:00:03.509Z",
  "features": [
      {
          "feature": "Fabric",
          "value": "Canvas"
      },
      {
          "feature": "Buttons",
          "value": "Brass"
      }
  ]
}

module.exports = {
  // jest.fn((28212) => Promise.all())
  get: jest.fn(() => {})
}
