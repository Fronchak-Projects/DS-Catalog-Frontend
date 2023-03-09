import { formatPrice } from '../../util/formatters';
import './styles.css';

type Props = {
  price: number;
}

const ProductPrice = ({ price }: Props) => {

  const priceFormated = formatPrice(price);
  const integer = priceFormated.slice(0, -3);
  const cents = priceFormated.slice(-3);

  return (
    <div className="price-container">
      <span className="price-currency">R$</span>
      <span className="full-price">{ integer }</span>
      <span className="price-cents">{cents}</span>
    </div>
  );
}

export default ProductPrice;
