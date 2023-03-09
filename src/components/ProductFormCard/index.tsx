import { Category } from "../../types/Category";
import { Product } from "../../types/Product";
import ProductForm from "../ProductForm";

type Props = {
  handleOnSubmit: (input: Product) => Promise<void>;
  product: Product | null;
  categories: Category[];
}

const ProductFormCard = ({ handleOnSubmit, product, categories }: Props) => {
  return  (
    <div className="container-xl base-card py-3 py-sm-4 p-lg-4 p-xl-5" id="product-form-card-container">
      <div className="row m-sm-0">
        <ProductForm handleOnSubmit={ handleOnSubmit } product={ product } categories={categories}  />
      </div>
    </div>
  );
}

export default ProductFormCard;
