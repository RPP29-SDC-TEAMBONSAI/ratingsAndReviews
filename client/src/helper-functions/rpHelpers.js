const helper = {
  compileRelatedProductsDataToProps: (relatedProducts, relatedProductsStyles) => {
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
  },

  compileYourOutfitDataToProps: (currentProductInfo, currentProductsStyles) => {
    let outfitPropsObj = {};
    let currentProductInfoCopy = [Object.assign(currentProductInfo)];
    let currentProductStylesCopy= Object.assign(currentProductsStyles);


    currentProductInfoCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item['id'];
      itemDetail['itemName'] = item['name'];
      itemDetail['itemCategory'] = item['category'];

      outfitPropsObj[item['id']] = itemDetail;
    })


    let styleDetail = {};
    styleDetail['itemId'] = currentProductStylesCopy.product_id;
    const defaultResult = currentProductStylesCopy.results.filter(result => result['default?'] === true)[0] ?? currentProductStylesCopy.results[0];


    outfitPropsObj[currentProductStylesCopy.product_id] = {
      ...outfitPropsObj[currentProductStylesCopy.product_id],
      'originalPrice':  defaultResult['original_price'],
      'salePrice': defaultResult['sale_price'],
      'photoUrl': defaultResult['photos'][0]
    };

    //console.log(`🤠 outfitPropsObj: ${JSON.stringify(outfitPropsObj)}`)
    return Object.values(outfitPropsObj);

  }

}

module.exports = helper;