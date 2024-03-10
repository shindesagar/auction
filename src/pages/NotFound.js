import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 fw-bold primary-color">404</h1>
      <p className="lead">Page Not Found</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
     );
}

export default NotFound;
