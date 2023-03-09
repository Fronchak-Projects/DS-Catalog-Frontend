import { Category } from "../../types/Category"
import CategoryBadge from "../CategoryBadge";
import './styles.css';

type Props = {
    categories: Category[];
}

const CategoryBadgeList = ({ categories }: Props) => {
    return (
        <div className="col-12 product-categories-container">
            { categories.map((category) => <CategoryBadge key={ category.id } category={ category } />) }
        </div>
    );
}

export default CategoryBadgeList;
