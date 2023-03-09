import { Link, useLoaderData, LoaderFunctionArgs, useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import { BASE_URL, getPageParams } from '../../util/requests';
import axios, { AxiosRequestConfig } from 'axios';
import { SpringPage } from '../../types/vendor/spring';
import { Product } from '../../types/Product';
import Filter from '../../components/Filter';
import { Category } from '../../types/Category';
import { useEffect } from 'react';
import './styles.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log(request);
  const params = getPageParams(request);
  console.log(params);
  params.filter = params.filter === "null" ? "" : params.filter;
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    url: '/api/products',
    method: 'get',
    params: params
  };
  const config2: AxiosRequestConfig = {
    baseURL: BASE_URL,
    url: '/api/categories/all',
    method: 'get'
  }
  const response = await axios(config);
  const page = response.data;
  const response2 = await  axios(config2);
  const categories = response2.data;
  return { page, categories, params };
}

type Params = {
  filter: string;
  categoryId: string;
}

type Loader = {
  page: SpringPage<Product>;
  categories: Category[];
  params: Params;
}

const Catalog = () => {

  const { page, categories, params } = useLoaderData() as Loader;
  const navigate = useNavigate();

  const products = page.content.map((product) => productDiv(product));

  const onPageChange = (page: number) => {
    console.log(page);
    navigate(`/products?page=${page}&filter=${params.filter}&categoryId=${params.categoryId}`);
  }

  useEffect(() => {
    const input = document.getElementById("filter") as HTMLInputElement;
    input.value = params.filter;
    const select = document.getElementById("categoryId") as HTMLSelectElement;
    select.value = params.categoryId;
  }, [params]);

  return (
    <>
      <div className="container my-4" id="catalog-page-container">
        <div className="row">
          <div className='col-12'>
            <h1 className="mb-3 gray-dark-color">Catálogo de Produtos</h1>
          </div>
          <div className="col-12 mb-4">
            <Filter categories={categories} defaultValues={ params } handleClearFilter={() => navigate('/products')} />
          </div>
            {products}
          <div className="col-12">
            <Pagination pageCount={page.totalPages} range={3} onChange={onPageChange} forcePage={page.number} />
          </div>
        </div>
      </div>
    </>
  );
}

function productDiv(product: Product) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
      <Link to={`${product.id}`}>
        <ProductCard product={ product } />
      </Link>
    </div>
  )
}

export default Catalog;
