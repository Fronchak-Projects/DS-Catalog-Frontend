import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css';

const Admin = () => {
  return (
    <div className="container-xxl p-0">
        <div className="row m-0">
            <Navbar />
            <div className="col-12 col-xl-10">
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Admin;
