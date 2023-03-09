import { Form, Link } from 'react-router-dom';
import CategoryBadgeList from '../CategoryBadgeList';
import { Product } from '../../types/Product';
import { formatPriceWithCurrency } from '../../util/formatters';
import './styles.css';

type Props = {
    product: Product;
}

const ProductCrudCard = ({ product }: Props) => {

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!window.confirm('Realmente deseja excluir esse produto?')) {
      event.preventDefault();
    }
  }

    return (
        <>
            <div className="col-12 pb-2 pb-lg-0 col-lg-2 product-card-img-container mb-2 mb-lg-0">
                <img src={ product.imgUrl } alt="Computer setup" className="img-fluid" />
            </div>
            <div className="col-12 col-lg-8 mb-2 mb-lg-0">
                <div className="row py-lg-3">
                    <div className="col-12">
                        <h3 className="fw-bold">{ product.name }</h3>
                        <p className="product-price">{ formatPriceWithCurrency(product.price) }</p>
                    </div>
                    <CategoryBadgeList categories={ product.categories } />
                </div>
            </div>
            <div className="col-12 col-lg-2 p-0">
                <div className="row m-0 buttons-container">
                    <div className="col-6 col-lg-12">
                      <Form action={`delete/${ product.id }`} method="post">
                        <button type='submit' className="btn delete-button" onClick={(event) => handleDelete(event)}>Excluir</button>
                      </Form>
                    </div>
                    <div className="col-6 col-lg-12">
                        <Link to={`edit/${product.id}`} className="btn edit-button">Editar</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCrudCard;
