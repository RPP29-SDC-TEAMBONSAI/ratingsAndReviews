const products = [
  {
      "id": 28212,
      "campus": "hr-rpp",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2021-07-10T17:00:03.509Z",
      "updated_at": "2021-07-10T17:00:03.509Z"
  },
  {
      "id": 28213,
      "campus": "hr-rpp",
      "name": "Bright Future Sunglasses",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00",
      "created_at": "2021-07-10T17:00:03.509Z",
      "updated_at": "2021-07-10T17:00:03.509Z"
  },
  {
      "id": 28214,
      "campus": "hr-rpp",
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00",
      "created_at": "2021-07-10T17:00:03.509Z",
      "updated_at": "2021-07-10T17:00:03.509Z"
  },
  {
      "id": 28215,
      "campus": "hr-rpp",
      "name": "Slacker's Slacks",
      "slogan": "Comfortable for everything, or nothing",
      "description": "I'll tell you how great they are after I nap for a bit.",
      "category": "Pants",
      "default_price": "65.00",
      "created_at": "2021-07-10T17:00:03.509Z",
      "updated_at": "2021-07-10T17:00:03.509Z"
  },
  {
      "id": 28216,
      "campus": "hr-rpp",
      "name": "Heir Force Ones",
      "slogan": "A sneaker dynasty",
      "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
      "category": "Kicks",
      "default_price": "99.00",
      "created_at": "2021-07-10T17:00:03.509Z",
      "updated_at": "2021-07-10T17:00:03.509Z"
  }
]

const currentProduct = {
  "id": 28216,
  "campus": "hr-rpp",
  "name": "Heir Force Ones",
  "slogan": "A sneaker dynasty",
  "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  "category": "Kicks",
  "default_price": "99.00",
  "created_at": "2021-07-10T17:00:03.509Z",
  "updated_at": "2021-07-10T17:00:03.509Z",
  "features": [
      {
          "feature": "Sole",
          "value": "Rubber"
      },
      {
          "feature": "Material",
          "value": "FullControlSkin"
      },
      {
          "feature": "Mid-Sole",
          "value": "ControlSupport Arch Bridge"
      },
      {
          "feature": "Stitching",
          "value": "Double Stitch"
      }
  ]
}

const relatedProducts = [
  28217,
  28219,
  28220,
  28212,
  28214
]

const relatedProductsInfo = [
  {
    "id": 28217,
    "campus": "hr-rpp",
    "name": "Pumped Up Kicks",
    "slogan": "Faster than a just about anything",
    "description": "The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.",
    "category": "Kicks",
    "default_price": "89.00",
    "created_at": "2021-07-10T17:00:03.509Z",
    "updated_at": "2021-07-10T17:00:03.509Z",
    "features": [
        {
            "feature": "Sole",
            "value": "Rubber"
        },
        {
            "feature": "Material",
            "value": "FullControlSkin"
        },
        {
            "feature": "Mid-Sole",
            "value": "ControlSupport Arch Bridge"
        },
        {
            "feature": "Stitching",
            "value": "Double Stitch"
        }
    ]
},
{
  "id": 28219,
  "campus": "hr-rpp",
  "name": "YEasy 350",
  "slogan": "Just jumped over jumpman",
  "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
  "category": "Kicks",
  "default_price": "450.00",
  "created_at": "2021-07-10T17:00:03.509Z",
  "updated_at": "2021-07-10T17:00:03.509Z",
  "features": [
      {
          "feature": "Sole",
          "value": "Rubber"
      },
      {
          "feature": "Material",
          "value": "FullControlSkin"
      },
      {
          "feature": "Stitching",
          "value": "Double Stitch"
      }
  ]
},
{
  "id": 28220,
  "campus": "hr-rpp",
  "name": "Summer Shoes",
  "slogan": "A risky call in the spring or fall",
  "description": "Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.",
  "category": "Kicks",
  "default_price": "59.00",
  "created_at": "2021-07-10T17:00:03.509Z",
  "updated_at": "2021-07-10T17:00:03.509Z",
  "features": [
      {
          "feature": "Sole",
          "value": "Rubber"
      },
      {
          "feature": "Material",
          "value": "FullControlSkin"
      },
      {
          "feature": "Mid-Sole",
          "value": "ControlSupport Arch Bridge"
      },
      {
          "feature": "Stitching",
          "value": "Double Stitch"
      }
  ]
},
{
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
},
{
  "id": 28214,
  "campus": "hr-rpp",
  "name": "Morning Joggers",
  "slogan": "Make yourself a morning person",
  "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
  "category": "Pants",
  "default_price": "40.00",
  "created_at": "2021-07-10T17:00:03.509Z",
  "updated_at": "2021-07-10T17:00:03.509Z",
  "features": [
      {
          "feature": "Fabric",
          "value": "100% Cotton"
      },
      {
          "feature": "Cut",
          "value": "Skinny"
      }
  ]
}

]

module.exports = {products, currentProduct, relatedProducts, relatedProductsInfo};

