import React, { useState } from 'react';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [couponCode, setCouponCode] = useState('');


  const handlePayment = () => {
    // Handle payment logic here
    alert(`Payment of $${amount} successful!`);
  };

  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Make a Payment</h2>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="form-control"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Expiry"
                  className="form-control"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="CVV"
                  className="form-control"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Amount"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="form-control"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Payment Breakup</h2>
              {/* <div className="mb-3"><strong>Subtotal</strong>: ${subTotal}</div>
              <div className="mb-3"><strong>GST</strong>: ${gst}</div>
              <div className="mb-3"><strong>Coupon Discount</strong>: -</div>
              <div className="mb-3"><strong>Delivery Charge</strong>: ${deliveryCharge}</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
