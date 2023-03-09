import { Category } from "../../types/Category";
import './styles.css';

type Props = {
    category: Category;
}

const CategoryBadge = ({ category }: Props) => {
    return <span className="product-category">{ category.name }</span>
}

export default CategoryBadge;