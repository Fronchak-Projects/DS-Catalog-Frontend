import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLoaderData, LoaderFunctionArgs, useNavigate } from 'react-router-dom';
import FilterAndButton from '../../../components/FilterAndButton';
import Pagination from '../../../components/Pagination';
import ProductCrudCard from '../../../components/ProductCrudCard';
import { Category } from '../../../types/Category';
import { Product } from '../../../types/Product';
import { SpringPage } from '../../../types/vendor/spring';
import { BASE_URL, getPageParams } from '../../../util/requests';

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const params = getPageParams(request);
  const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      url: '/api/products',
      params
  };

  const config2: AxiosRequestConfig = {
    baseURL: BASE_URL,
    url: '/api/categories/all',
};

  const response = await axios(config);
  const page = response.data;
  const response2 = await axios(config2);
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
    params: Params
}

type ControlComponentsData = {
  activePage: number;
}

const ProductList = () => {

    const { page, categories, params } = useLoaderData() as Loader;
    const products = page.content;
    const navigate = useNavigate();
    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({
      activePage: 0
    });

    const handlePageChange = (pageNumber: number) => {
      setControlComponentsData({ activePage: pageNumber });
    }

    const onPageChange = (page: number) => {
      console.log(page);
      navigate(`/admin/products?page=${page}&filter=${params.filter}&categoryId=${params.categoryId}`);
    }

    useEffect(() => {
      const input = document.getElementById("filter") as  HTMLInputElement;
      input.value = params.filter;
      const select = document.getElementById("categoryId") as  HTMLSelectElement;
      select.value = params.categoryId;
    }, [params]);

    const content = products.map((product) => {
        return (
            <div className="col-12 mt-3" key={ product.id }>
                <div className="row m-0 py-2 p-md-3 p-lg-0 product-card card-container align-items-center">
                    <ProductCrudCard product={ product } />
                </div>
            </div>
        );
    })

  return (
      <div className="row p-xl-4">
        <FilterAndButton categories={ categories } defaultValues={ params } handleClearFilter={() => navigate('/admin/products')} />

        { content }
        <div className="col-12 mt-4">
            <Pagination pageCount={page.totalPages} range={3} onChange={onPageChange} forcePage={page.number} />
          </div>
      </div>
  );
}

export default ProductList;
