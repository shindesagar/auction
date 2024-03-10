import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../constants/alpha-env.constant';
import { useParams } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
const socket = io(baseURL);


const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [getProduct, setProduct] = useState([]);
  const [bidAmount, setBidAmount] = useState(100);
  const [getAuctionDurationStatus,setAuctionDurationStatus] = useState();
  const timeRemaining = new Date(getProduct?.auctionDuration).getTime() - new Date().getTime();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  
  useEffect(() => {
    async function fetchProductList() {
      try {
        const where = encodeURIComponent(JSON.stringify({ slug: params.slug }));
        const { data: res } = await axios.get(`${baseURL}/product-ms/getProductList?filter=${where}`,{
          headers:{
            "Content-Type" : "application/json"
          }
        });
        setProduct(res.data[0]);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    }
    
    fetchProductList();
    return () => {
        socket.off('placeBidDetails');
    };
    
  }, [params.slug]);
  // Listen for 'bidPlaced' event
  socket.on('placeBidDetails', (updatedUserBidHistory) => {
    setProduct(updatedUserBidHistory);
  });
  const placeBid = () => {
    socket.emit('placeBid', {
      productId: getProduct._id,
      username: `${userDetails.firstName} ${userDetails.lastName}`, 
      userId:`${userDetails.id}`,
      amount: bidAmount,
    });
  };
  async function handlePay(productId,amt){
    const stripe = await loadStripe(
      "pk_test_51Oool4SIiKMrNAex7ioOIyx1ahoCol5DJr6SLitld717QDOafCIBEcQZiEFNpXbNloPuoVUYaHPObV1VrlajDpnG000WYrr8jJ"
    );
    const getUserDetails= JSON.parse(localStorage.getItem('userDetails'));
    const body={
      product:productId, //product id
      amount:amt,  // amount
      userName: `${getUserDetails.firstName} ${getUserDetails.lastName}`
    }
    const headers= {
      "Content-type" : "application/json"
    }
    const response = await fetch(
      `${baseURL}/place-order-session`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
      }
    );
    const session = await response.json(); // api call jab success hoga to session milega

    const result =  stripe.redirectToCheckout({
      sessionId:session.id
    })
    if(result.error){
      console.log(result.error);
    }
    else{
      console.log("payment success")
      // api call to a controller that will mark your payment success particular auction winner ka for product
    }
  }
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 text-center">
        {getProduct && getProduct.images && getProduct.images.length > 0 ? (
          <img
            src={`${baseURL}/images/${getProduct.images[0]}`}
            alt={`Product 1`} 
            className="img-fluid"
          />
            ) : (
              <img
                src={require('../assets/no-image.png')}
                alt={`No product available`} 
                className="img-fluid"
              />
            )}
        </div>
        <div className="col-md-6">
          <h2 className="mb-4 text-uppercase fw-bold">{getProduct?.title}</h2>
          <p className="lead mb-4">{getProduct?.description}</p>
          <div className="mb-4">
            <p className="fs-3">
              <strong>Current Bid:&#8377; {getProduct?.startingBid}</strong>{' '}
            </p>
            <div className="timer-wrapper text-center">
              <Countdown
                daysInHours={true}
                date={Date.now() + timeRemaining}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  
                  if (completed) {
                    setAuctionDurationStatus('completed')
                    return <span className="text-danger fw-bold fs-5 d-block text-start">Expire</span>;
                  } else {
                    return (
                      <>
                      <div className="countdown d-flex align-items-center">
                        <div className="countdown-item text-center">
                          <div className="countdown-value  d-flex align-items-center fw-bold fs-5 justify-content-center">
                            {days}D{' '}
                          </div>
                        </div>
                        <div className="countdown-item text-center">
                          <div className="countdown-value  d-flex align-items-center fw-bold fs-5 justify-content-center">
                            {hours} H
                          </div>
                        </div>
                        <div className="countdown-item text-center">
                          <div className="countdown-value  d-flex align-items-center fw-bold fs-5 justify-content-center">
                            {minutes} M
                          </div>
                        </div>
                        <div className="countdown-item text-center">
                          <div className="countdown-value  d-flex align-items-center fw-bold fs-5 justify-content-center">
                            {seconds} S
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 mt-5">
                        <label htmlFor="bidAmount" className="form-label w-100 float-start text-start fs-4 fw-bold">
                          Your Bid Amount
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">&#8377;</span>
                          <input
                            type="number"
                            id="bidAmount"
                            className="form-control"
                            min={getProduct?.startingBid}
                            step="1"
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='float-start w-100'>
                        <button className={`btn btn-primary btn-lg mb-4 float-start ${getProduct?.startingBid > bidAmount ? 'disabled' : ''}`} onClick={placeBid}>
                          Place Bid
                        </button>
                      </div>
                      </>
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <h4 className="mb-4">Users Bid History</h4>
            <ul className="list-group list-group-light userBidList">
              
            {getProduct && getProduct.bids // Check if getProduct is defined and has bids property
              ? getProduct.bids
                    .sort((a, b) => b.amount - a.amount) // Sort bids in descending order of amount
                    .map((bid, index) => (
                        <li key={bid.id} className="list-group-item d-flex align-items-center">
                            <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style={{ width: '45px', height: '45px' }} className="rounded-circle" />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">
                                    {bid.username} {getAuctionDurationStatus === 'completed' && (index === 0 ? 'has won the deal 👑' : ' will try better next time')}
                                </p>
                            </div>
                            <span className="ml-auto fw-bold" style={{ marginLeft: "auto" }}>&#8377;{bid.amount} { getAuctionDurationStatus === 'completed' && (index === 0 ? <button className='btn btn-primary' style={{marginLeft:"20px"}}   onClick={() => handlePay(getProduct?._id,bid.amount)}>Buy now</button> : "")}</span>
                        </li>
                    ))
              : <li>No one has placed a bid on this product</li>
          }
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
