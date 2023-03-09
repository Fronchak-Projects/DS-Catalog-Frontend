import axios, { AxiosRequestConfig } from "axios";
import { useNavigate, useLoaderData } from "react-router-dom";
import ProductFormCard from "../../components/ProductFormCard"
import { Category } from "../../types/Category";
import { Product } from "../../types/Product";
import { convertProductData } from "../../util/convertions";
import { BASE_URL } from "../../util/requests";

export const loader = async() => {
  const response = await axios.get(`${BASE_URL}/api/categories/all`);
  const categories = response.data;
  return { categories };
}

type Loader = {
  categories: Category[];
}

const ProductCreatePage = () => {

  const { categories } = useLoaderData() as Loader;
  const navigate = useNavigate();

  const handleSubmit = async(input: Product) => {
    const data = { ...input, price: String(input.price).replace(',', '.') };
    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      url: '/api/products',
      method: 'post',
      data
    }
    const response = await axios(config);
    const product = response.data;
    navigate(`/products/${ product.id }`);
  }

  return (
    <div className="my-xl-4 my-xxl-5 ms-xl-4 ms-xxl-5">
      <ProductFormCard handleOnSubmit={handleSubmit} product={ null } categories={ categories } />
    </div>
  )

}

export default ProductCreatePage;
