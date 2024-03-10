import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="container mt-5">
        <h1 className="text-center primary-color">Payment Successful!</h1>
        <p className="lead text-center">Thank you for your purchase.</p>
        <div className="text-center">
        <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
    </div>
  );
}

export default PaymentSuccess;
