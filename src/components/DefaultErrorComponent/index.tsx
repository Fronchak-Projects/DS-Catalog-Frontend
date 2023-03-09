import { useRouteError } from "react-router-dom";

type Error = {
  statusText: string;
  message: string;
}

const DefaultErrorComponent = () => {
  const error = useRouteError() as Error;

  return (
    <div className="container my-5 py-5 text-center">
      <h1 className="fs-1 mb-4">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
          <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default DefaultErrorComponent;
