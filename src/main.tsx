import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './pages/Admin';
import ProductList, { loader as productCrudPageLoader } from './pages/Admin/ProductList';
import Catalog, { loader as catalogLoader } from './pages/Catalog';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import ProductCreatePage, { loader as createProductLoader } from './pages/ProductCreatePage';
import ProductDetails, { loader as productDetailsLoader } from './pages/ProductDetails';
import ProductEditPage, { loader as productEditLoader } from './pages/ProductEditPage';
import { action as deleteProductAction } from './pages/DeleteProduct';
import Root from './pages/Root';
import DefaultErrorComponent from './components/DefaultErrorComponent';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <DefaultErrorComponent />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'products',
            element: <Catalog />,
            loader: catalogLoader
          },
          {
            path: 'products/:id',
            element: <ProductDetails />,
            loader: productDetailsLoader
          },
          {
            path: 'admin',
            element: <Admin />,
            children: [
              {
                errorElement: <DefaultErrorComponent />,
                children: [
                  {
                    path: 'products',
                    element: <ProductList />,
                    loader: productCrudPageLoader
                  },
                  {
                    path: 'products/create',
                    element: <ProductCreatePage />,
                    loader: createProductLoader
                  },
                  {
                    path: 'products/edit/:id',
                    element: <ProductEditPage />,
                    loader: productEditLoader
                  },
                  {
                    path: 'products/delete/:id',
                    action: deleteProductAction,
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
)
