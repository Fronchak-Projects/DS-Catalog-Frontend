import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuthData, requestBackendLogin, saveAuthData } from "../../util/requests";
import ButtonIcon from "../ButtonIcon";
import './styles.css';

type FormData = {
  username: string;
  password: string;
}

const LoginCard = () => {
  const [hasError, setHasError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        const token = getAuthData().access_token;
        console.log(token);
        console.log('SUCESSO!')
        console.log(response);
        setHasError(false);
      })
      .catch((e) => {
        console.log('Error!');
        console.log(e);
        setHasError(true)
      });
  };

  return (
    <div className="container base-card px-4 py-4" id="login-card-container">
      <h1 className="mb-5 text-center">Login</h1>
      {hasError &&
        <div className="alert alert-danger" role="alert">
          Favor preencher todos os campos corretamente
        </div>
      }

      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="mb-4">
          <input
            {...register("username", {
              required: 'Campo obrigatório.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Favor entrar com um endereço de email válido'
              }
            })}

            type="email"
            name="username"
            id="username"
            placeholder="Email"
            className={`form-control ${ errors.username ? 'is-invalid' : '' }`}
            required
          ></input>
          <div className="invalid-feedback">
            { errors.username?.message }
          </div>
        </div>
        <div className="mb-5" id="password-input-container">
          <input
            {...register("password", {
              required: 'Campo obrigatório',
              minLength: {
                value: 6,
                message: "Password must have at least 6 letters"
              }
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            className={`form-control ${ errors.password ? 'is-invalid' : '' }`}
          ></input>
          <div className="invalid-feedback">
            { errors.password?.message }
          </div>
          <Link to="/home" className="mt-1 mb-5 d-block">Esqueci a senha</Link>
        </div>
        <ButtonIcon label={"Fazer login"} />
        <p className="text-center mt-3">Não tem cadastro? <Link to="/admin/auth/signup">CADASTRAR</Link></p>
      </form>
    </div>
  );
}

export default LoginCard;
