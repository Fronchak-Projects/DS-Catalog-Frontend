import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="col-12 col-xl-2 mb-3 py-md-3 mb-xl-0 p-xl-0" id="sidebar-container">
      <div className="row text-center white-bg-color py-2 py-xl-0 m-xl-0">
        <div className="col-4 col-xl-12 p-0">
            <NavLink to="/admin/products" className="sidebar-link">Produtos</NavLink>
        </div>
        <div className="col-4 col-xl-12 p-0">
            <NavLink to="/admin/categories" className="sidebar-link">Categorias</NavLink>
        </div>
        <div className="col-4 col-xl-12 p-0">
            <NavLink to="/admin/users" className="sidebar-link">Usuários</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


