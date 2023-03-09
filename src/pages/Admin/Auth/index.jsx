import { Route, Switch } from 'react-router-dom';
import LoginImage from '../../../assets/imgs/login.svg';
import LoginCard from '../../../components/LoginCard';

const Auth = () => {
  return (
    <div className="container py-3 py-md-4 px-lg-3" id="auth-card-container">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 order-md-1 px-lg-2">
          <Switch>
            <Route path="/admin/auth/login">
              <LoginCard />
            </Route>
            <Route path="/admin/auth/signup">
              <h1>Login Signup</h1>
            </Route>
            <Route path="/admin/auth/recover">
              <h1>Login Recover</h1>
            </Route>
          </Switch>
        </div>
        <div className="col-12 col-lg-6 d-none d-lg-block px-lg-2">
          <h1 className="mb-4">Divulgue seus produtos no DS Catalog</h1>
          <p className="gray-light-color mb-4">Faça parte do nosso catálogo de divulgação e aumente a venda dos seus produtos.</p>
          <img src={ LoginImage } alt="Login" className="img-fluid"/>
        </div>
      </div>
    </div>
  );
}

export default Auth;
