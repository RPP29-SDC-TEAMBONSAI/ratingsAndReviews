const helper = {
  compileDataToProps: (relatedProducts, relatedProductsStyles) => {
    let allPropsObj = {};
    let relatedProductsCopy = Object.assign(relatedProducts);
    let relatedProductsStylesCopy= Object.assign(relatedProductsStyles);

    relatedProductsCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item['id'];
      itemDetail['itemName'] = item['name'];
      itemDetail['itemCategory'] = item['category'];

      allPropsObj[item['id']] = itemDetail;
    })

    relatedProductsStylesCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item.product_id;

      const firstResult = item.results.filter(result => result['default?'] === true)[0] ?? item.results[0];

      itemDetail['originalPrice'] = firstResult['original_price'];
      itemDetail['salePrice'] = firstResult['sale_price'];
      itemDetail['photoUrl'] =firstResult['photos'][0];

      allPropsObj[item.product_id] = {
        ...allPropsObj[item.product_id],
        'originalPrice': firstResult['original_price'],
        'salePrice': firstResult['sale_price'],
        'photoUrl': firstResult['photos'][0],
      };
    })
    //console.log(`allPropsObj: ${JSON.stringify(Object.values(allPropsObj))}`)
    return Object.values(allPropsObj);
  }

}

module.exports = helper;