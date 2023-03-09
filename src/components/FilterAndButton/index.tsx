import { Link } from "react-router-dom";
import { Category } from "../../types/Category";
import Filter from "../Filter";

type DefaultValues = {
  filter: string;
  categoryId: string;
}

type Props = {
  categories: Category[];
  defaultValues: DefaultValues;
  handleClearFilter: Function;
}

const FilterAndButton = ({ categories, defaultValues, handleClearFilter }: Props) => {
  return (
    <>
        <div className="col-12 col-lg-2 mb-3 mb-lg-0" id="button-container">
            <Link to="create" className="btn btn-primary text-uppercase w-100 h-100 d-flex justify-content-center align-items-center">Adicionar</Link>
        </div>
        <div className="col-12 col-lg-10">
          <Filter categories={ categories } defaultValues={ defaultValues } handleClearFilter={ handleClearFilter } />
        </div>
    </>
  );
}

export default FilterAndButton;
