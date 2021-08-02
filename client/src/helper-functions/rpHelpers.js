const helper = {
  compileRelatedProductsDataToProps: (relatedProducts, relatedProductsStyles, starRating) => {
    console.log(JSON.stringify(starRating));
    let allPropsObj = {};
    let relatedProductsCopy = Object.assign(relatedProducts);
    let relatedProductsStylesCopy= Object.assign(relatedProductsStyles);

    relatedProductsCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item['id'];
      itemDetail['itemName'] = item['name'];
      itemDetail['itemCategory'] = item['category'];
      itemDetail['starRating'] = starRating

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

  compileYourOutfitDataToProps: (currentProductInfo, currentProductStyles) => {
     //console.log(`currentProductInfo: ${JSON.stringify(currentProductInfo)}`)
     //console.log(`currentProductStyles: ${JSON.stringify(currentProductStyles)}`)
    let outfitPropsObj = {};
    let currentProductInfoCopy = Object.assign(currentProductInfo);

    outfitPropsObj['product_id'] = currentProductInfoCopy.id;
    outfitPropsObj['name'] = currentProductInfoCopy.name;
    outfitPropsObj['category'] = currentProductInfoCopy.category;
    //console.log(`🤠  beforedefaultResult: ${JSON.stringify(outfitPropsObj)}`)
    const defaultResult = currentProductStyles.results.filter(result => result['default?'] === true)[0] ?? currentProductStyles.results[0];
    //console.log(`defaultResult: ${JSON.stringify(defaultResult)}`);
    outfitPropsObj['originalPrice'] = defaultResult.original_price;
    outfitPropsObj['salePrice'] = defaultResult.sale_price;
    outfitPropsObj['photoUrl'] = defaultResult['photos'][0];
    //console.log(`🐮 afterdefaultResult: ${JSON.stringify(outfitPropsObj)}`);
    //console.log(`🤠 outfitPropsObj: ${JSON.stringify(outfitPropsObj)}`)
    return outfitPropsObj;

  },

  addIdToStylesData: (stylesData, productId) => {
    //console.log(`stlesData: ${JSON.stringify(stylesData)}`)
    //console.log(`productId: ${productId}`)
    let stateStylesCopy = Object.assign(stylesData);
    let productStylesWithId = {};
    productStylesWithId['product_id'] = productId;
    productStylesWithId['results'] = stateStylesCopy;
    return productStylesWithId;
  }

}

module.exports = helper;