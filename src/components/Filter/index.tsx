import { Form, useSubmit, useFetcher, useNavigate } from "react-router-dom";
import { Category } from "../../types/Category";

type DefaultValues = {
  filter: string;
  categoryId: string;
}

type Props = {
  categories: Category[];
  defaultValues: DefaultValues;
  handleClearFilter: Function;
}

const Filter = ({ categories, defaultValues, handleClearFilter }: Props) => {
  const submit = useSubmit();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <div className="col-12">
      <fetcher.Form className="row m-0 card-container p-lg-1" id="search-section-container">
        <div className="col-12 col-lg-5 mb-2 mb-lg-0" id="input-search-container">
          <input
            onChange={(event) => submit(event.currentTarget.form)}
            id="filter"
            name="filter"
            className="form-control"
            placeholder="Nome do produto"
            defaultValue={defaultValues.filter}
          />

          <i className="bi bi-search"></i>
        </div>
        <div className="col-7 col-lg-5">
          <select
            className="form-select"
            aria-label="Category filter"
            defaultValue={defaultValues.categoryId}
            name="categoryId"
            id="categoryId"
            onChange={(event) => submit(event.currentTarget.form)}

          >
              <option value="0">Categoria</option>
              { categories.map((category) => <option key={category.id} value={category.id}>{ category.name }</option>) }
          </select>
        </div>
        <div className="col-5 col-lg-2" id="button-clean-filter-container">
          <button
            className="btn fw-bold gray-light-color text-uppercase w-100 d-block"
            id="button-clean-filter"
            type="button"
            onClick={() => handleClearFilter()}
            >Limpar filtro</button>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default Filter;
