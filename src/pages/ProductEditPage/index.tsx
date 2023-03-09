import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useParams, LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import ProductFormCard from '../../components/ProductFormCard';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../util/requests';

import './styles.css';

export const loader = async({ params }: LoaderFunctionArgs) => {
  const response = await axios.get(`${BASE_URL}/api/products/${ params.id }`);
  const product = response.data;
  const categoriesResponse = await axios.get(`${BASE_URL}/api/categories/all`);
  const categories = categoriesResponse.data;
  return { product, categories };
}

type Loader = {
  product: Product;
  categories: Category[]
}

const ProductEditPage = () => {

  const { product, categories } = useLoaderData() as Loader;
  const params = useParams();
  const navigate = useNavigate();
  console.log(params, product);

  const handleSubmit = async (input: Product) => {
    const data = { ...input, price: String(input.price).replace(',', '.') };
    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      url: `/api/products/${ params.id }`,
      method: 'put',
      data
    }

    const response = axios(config)
      .then((response) => {
        toast.info('Produto atualizado com succeso!');
        //navigate('/products/' + response.data.id);
      }).catch((error) => {
        console.log(JSON.stringify(error.response.data.errors[0]));
        toast.error(JSON.stringify(error.response.data.errors[0]));
      });
  }

  return (
    <div className="my-xl-4 my-xxl-5 ms-xl-4 ms-xxl-5">
      <ProductFormCard handleOnSubmit={handleSubmit} product={ product } categories={categories} />
    </div>
  );
}

export default ProductEditPage;
