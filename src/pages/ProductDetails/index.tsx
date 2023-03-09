import ProductPrice from '../../components/ProductPrice';
import { useEffect, useState } from 'react';
import { Link, useParams, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../util/requests';
import './styles.css';
import { Product } from '../../types/Product';

export const loader = async({ params }: LoaderFunctionArgs) => {
  const response = await axios.get(`${BASE_URL}/api/products/${params.id}`);
  const product = response.data;
  return { product };
}

type Loader = {
  product: Product;
}

const ProductDetails = () => {

  const { product } = useLoaderData() as Loader;

  const content = productDetailsDiv(product);

  return (
    <div className="container-xxl p-2 p-sm-3 p-md-4" id="main-container">
      <div className="row m-0 p-2 p-sm-3 p-md-4 px-xl-5">
          <div className="col-12">
             <Link to={"/products"}>
              <i className="bi bi-chevron-left primary-color"></i>
              <span className="gray-dark-color text-uppercase fw-bold">voltar</span>
             </Link>
          </div>
          <div className="col-12">
              <div className="row justify-content-center align-items-center">
                {content}
              </div>
          </div>
      </div>
    </div>
  );
}

function productDetailsDiv(product: Product) {
  return (
    <>
      <div className="col-12 col-xl-6">
        <div className="row">
            <div className="col-12">
              <img src={ product?.imgUrl } className="img-fluid" alt="Full hd television" />
            </div>
            <div className="col-12 col-lg-6 col-xl-12">
                <h3 className="gray-dark-color fw-bold">{ product?.name }</h3>
            </div>
            <div className="col-12 col-lg-6 col-xl-12 text-lg-end text-xl-start">
                <ProductPrice price={ product?.price }/>
            </div>
        </div>
      </div>
      <div className="col-12 col-xl-6">
        <h4 className="fw-bold gray-light-color">Descrição do produto</h4>
        <p className="gray-light-color">{ product?.description }</p>
      </div>
    </>
  )
}

export default ProductDetails;
