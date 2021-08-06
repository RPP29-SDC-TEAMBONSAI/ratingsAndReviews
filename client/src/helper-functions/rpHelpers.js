
const helper = {
  compileRelatedProductsDataToProps: (relatedProducts, relatedProductsStyles, starRating) => {

    let allPropsObj = {};
    let relatedProductsCopy = relatedProducts.slice();
    let relatedProductsStylesCopy= relatedProductsStyles.slice();

    relatedProductsCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item['id'];
      itemDetail['itemName'] = item['name'];
      itemDetail['itemCategory'] = item['category'];
      itemDetail['features'] = item['features'];
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

    return Object.values(allPropsObj);
  },

  compileYourOutfitDataToProps: (currentProductInfo, currentProductStyles) => {
    let outfitPropsObj = {};
    let currentProductInfoCopy = Object.assign(currentProductInfo);

    outfitPropsObj['product_id'] = currentProductInfoCopy.id;
    outfitPropsObj['name'] = currentProductInfoCopy.name;
    outfitPropsObj['category'] = currentProductInfoCopy.category;

    const defaultResult = currentProductStyles.results.filter(result => result['default?'] === true)[0] ?? currentProductStyles.results[0];

    outfitPropsObj['originalPrice'] = defaultResult.original_price;
    outfitPropsObj['salePrice'] = defaultResult.sale_price;
    outfitPropsObj['photoUrl'] = defaultResult['photos'][0];

    return outfitPropsObj;
  },

  addIdToStylesData: (stylesData, productId) => {
    let stateStylesCopy = Object.assign(stylesData);
    let productStylesWithId = {};
    productStylesWithId['product_id'] = productId;
    productStylesWithId['results'] = stateStylesCopy;
    return productStylesWithId;
  },

  formatFeatures: (currentProd, clickedProd) => {
    let combinedFeatures = [];
    if (clickedProd.features) {
      clickedProd.features.forEach(feature => {
        let obj = {}
        let vals = Object.values(feature);
        obj[vals[0]] = [vals[1], clickedProd.id]
        combinedFeatures.push(obj)
      })
    }
    currentProd.features.forEach(feature => {
      let obj = {}
      let vals = Object.values(feature);
      obj[vals[0]] = [vals[1], currentProd.id]
      combinedFeatures.push(obj)
    })

    let formattedFeatures = combinedFeatures.reduce((allFeatures, feature) => {
      if (Object.keys(feature) in allFeatures) {
        allFeatures = [allFeatures[Object.keys(feature)]].concat(feature);
      } else {
        allFeatures.push(feature);
      }
      console.log(JSON.stringify(allFeatures))
      return allFeatures;
    }, [])

    // console.log(JSON.stringify(formattedFeatures))
    // console.log(formattedFeatures[0])
    return formattedFeatures;
  }

}

module.exports = helper;