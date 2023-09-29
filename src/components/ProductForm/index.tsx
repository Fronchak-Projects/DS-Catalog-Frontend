import axios, { AxiosRequestConfig } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Product } from '../../types/Product';
import './styles.css';
import Select from 'react-select';
import { Category } from '../../types/Category';
import CurrencyInput from 'react-currency-input-field';

type Props = {
  handleOnSubmit: (input: Product) => Promise<void>;
  product: Product | null;
  categories: Category[];
}

const ProductForm = ({ handleOnSubmit, product, categories }: Props) => {

  const [wasSubmited, setWasSubmited] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Product>();


  useEffect(() => {
    if(product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('categories', product.categories);
      setValue('description', product.description);
      setValue('imgUrl', product.imgUrl);
    }
  }, []);

  return (
    <div className="col-12" id="product-form-container">
      <div className="row">
        <div className="col-12 mb-5">
          <h1>Dados do Produto</h1>
        </div>
        <div className="col-12">
          <form className="row" onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="col-12 col-lg-6">
              <div className="mb-4">
                <input
                  { ...register("name", {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /[\S]+/,
                      message: 'Nome do produto não pode estar em branco'
                    }
                  })}
                  type="text"
                  name="name"
                  id="name"
                  className={`form-control ${errors.name ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
                  placeholder="Nome do produto"
                ></input>
                <div className="invalid-feedback">
                  { errors.name?.message }
                </div>
              </div>

              <div className="mb-4">
                <Controller
                  name="categories"
                  rules={{
                    required: 'Campo obrigatório'
                  }}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select {...field}
                        className={`form-select ${errors.categories ? 'is-invalid' : ''}`}
                        isMulti
                        options={categories}
                        getOptionLabel={(category) => category.name}
                        getOptionValue={(category) => String(category.id)}
                      />
                    </>
                  )}
                />
                  <div className="invalid-feedback d-block">
                    { errors.categories?.message }
                  </div>
              </div>

              <div className="mb-4">
                  <Controller
                    name="price"
                    rules={{
                      required: 'Campo obrigatório'
                    }}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        placeholder='Preço'
                        disableGroupSeparators={false}
                        className={`form-control ${errors.price ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                      )}
                  />
                  <div className="invalid-feedback">
                    { errors.price?.message }
                  </div>
              </div>
              <div className="mb-4">
                <input
                  { ...register('imgUrl', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Favor inserir um formato válido de link'
                    }
                  })}
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  placeholder='Url da imagem'
                  className={`form-control ${errors.imgUrl ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
                ></input>
                <div className="invalid-feedback">
                  { errors.imgUrl?.message }
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mb-4">
                <textarea
                { ...register('description', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /[\S]+/,
                    message: 'Descrição não pode estar em branco'
                  }
                })}
                className={`form-control ${errors.description ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
                name="description"
                id="description"
                placeholder="Descrição" rows={8}></textarea>
                <div className="invalid-feedback">
                  { errors.description?.message }
                </div>
              </div>
            </div>
            <div className="col-12" id="buttons-form-container">
                <Link className="btn btn-danger text-uppercase" to="/admin/products">Cancelar</Link>
                <button className="btn btn-primary text-uppercase" onClick={() => setWasSubmited(true)}>Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
