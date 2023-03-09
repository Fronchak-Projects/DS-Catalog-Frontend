import { Product } from "../types/Product";

export const convertProductData = (product: Product) => {

  return { ...product, imgUrl: product.imgUrl ? product.imgUrl : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg'};
}

/*
export const convertProductData = (product: Product) => {
  const categories = product.categories.map((value) => {
    return {
      id: value,
      name: ''
    }
  })
  return { ...product, categories, imgUrl: product.imgUrl ? product.imgUrl : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg'};
}
*/
