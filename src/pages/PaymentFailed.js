import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="container mt-5">
        <h1 className="text-center text-danger">Payment failed!</h1>
        <p className="lead text-center">We apologize, but there was an issue processing your payment.</p>
        <div className="text-center">
        <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
    </div>
  );
}

export default PaymentFailed;
