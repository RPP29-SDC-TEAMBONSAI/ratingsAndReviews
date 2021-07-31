const productInfo = {
  id: 28212,
  campus: 'hr-rpp',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  created_at: '2021-07-10T17:00:03.509Z',
  updated_at: '2021-07-10T17:00:03.509Z',
  features: [
    { feature: 'Fabric', value: 'Canvas' },
    { feature: 'Buttons', value: 'Brass' }
  ]
};

var styles = [
  {
    style_id: 162332,
    name: 'Forest Green & Black',
    original_price: '140.00',
    sale_price: null,
    'default?': true,
    photos: [ {}, {}, {}, {}, {}, {} ],
    skus: {
      '941206': {},
      '941207': {},
      '941208': {},
      '941209': {},
      '941210': {},
      '941211': {}
    }
  },
  {
    style_id: 162333,
    name: 'Desert Brown & Tan',
    original_price: '140.00',
    sale_price: null,
    'default?': false,
    photos: [ {}, {}, {}, {}, {}, {} ],
    skus: {
      '941212': {},
      '941213': {},
      '941214': {},
      '941215': {},
      '941216': {},
      '941217': {}
    }
  },
  {
    style_id: 162334,
    name: 'Ocean Blue & Grey',
    original_price: '140.00',
    sale_price: '100.00',
    'default?': false,
    photos: [ {}, {}, {}, {}, {}, {} ],
    skus: {
      '941218': {},
      '941219': {},
      '941220': {},
      '941221': {},
      '941222': {},
      '941223': {}
    }
  },
  {
    style_id: 162335,
    name: 'Digital Red & Black',
    original_price: '140.00',
    sale_price: null,
    'default?': false,
    photos: [ {}, {}, {}, {}, {}, {} ],
    skus: {
      '941224': {},
      '941225': {},
      '941226': {},
      '941227': {},
      '941228': {},
      '941229': {}
    }
  },
  {
    style_id: 162336,
    name: 'Sky Blue & White',
    original_price: '140.00',
    sale_price: '100.00',
    'default?': false,
    photos: [ {}, {}, {}, {}, {}, {} ],
    skus: {
      '941230': {},
      '941231': {},
      '941232': {},
      '941233': {},
      '941234': {},
      '941235': {}
    }
  },
  {
    style_id: 162337,
    name: 'Dark Grey & Black',
    original_price: '170.00',
    sale_price: null,
    'default?': false,
    photos: [ {}, {}, {}, {}, {}, {} ],
    skus: {
      '941236': {},
      '941237': {},
      '941238': {},
      '941239': {},
      '941240': {},
      '941241': {}
    }
  }
]
const mockProps = {
  product_id: 28212,
  productInformation: productInfo,
  styles: styles,
  ratings: { '4': '1', '5': '1' }
}
module.exports = mockProps;
