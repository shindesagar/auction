import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../constants/alpha-env.constant';
import Countdown from 'react-countdown-now';

export default function ProductCard(props) {
    const navigate = useNavigate();
    const [highestPrice, setHighestPrice] = useState(0); // Initialize state with 0

    const handleClick = (value) => {
        navigate(`/product/${value}`);
    };

    useEffect(() => {
        if (props.getImage && props.getImage.bids) {
            let highestBid = props.getImage.bids.reduce((max, bid) => Math.max(max, bid.amount), 0);
            setHighestPrice(highestBid);
        }
    }, [props.getImage]);

    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="bd-placeholder-img card-img-top">
                    {props?.getImage?.images[0] === undefined ?
                        <img src={require("../assets/no-image.png")} alt="" style={{ width: "100%", height: '300px', overflow: 'hidden' }} /> :
                        <img src={`${baseURL}/images/${props?.getImage?.images[0]}`} alt="" style={{ width: "100%", height: '300px', overflow: 'hidden' }} />
                    }
                </div>

                <div className="card-body">
                    <h6 className="fs-6 fw-bold">{props?.getImage?.title}</h6>

                    <div className="bid-area d-flex my-4">
                        <div className="bid-amount col-md-6">
                            <div className="icon">
                                <i className="flaticon-auction"></i>
                            </div>
                            <div className="amount-content primary-color">
                                <div className="current">Current Bid</div>
                                <div className="amount fw-bold">&#8377;{highestPrice}</div>
                            </div>
                        </div>
                        <div className="bid-amount col-md-6 d-flex">
                            <div className="icon text-danger " style={{ fontSize: "33px", marginRight: "10px" }}>
                                &#8377;
                            </div>
                            <div className="amount-content">
                                <div className="current  text-danger">Bid Price</div>
                                <div className="amount fw-bold">&#8377;{props?.getImage?.startingBid}</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm text-white" onClick={() => handleClick(props?.getImage?.slug)}>
                                View Details
                            </button>
                        </div>
                        
                        <div className="timer-wrapper text-center">
                            {
                                props?.getImage?.auctionDuration && 
                                <Countdown
                                    daysInHours={true}
                                    date={Date.now() + new Date(props?.getImage?.auctionDuration).getTime() - new Date().getTime()}
                                    renderer={({ days, hours, minutes, seconds, completed }) => {
                                        if (completed) {
                                            return <span className='text-danger'>Expire</span>;
                                        } else {
                                            return (
                                                <div className="countdown d-flex align-items-center">
                                                    <div className="countdown-item text-center m-0">
                                                        <div className="countdown-value  d-flex align-items-center justify-content-center" style={{ fontSize: "12px", boxShadow: "none", width: "38px", padding: "2px 4px" }}>{days}D </div>
                                                    </div>
                                                    <div className="countdown-item text-center  m-0">
                                                        <div className="countdown-value  d-flex align-items-center justify-content-center" style={{ fontSize: "12px", boxShadow: "none", width: "38px", padding: "2px 4px" }}>{hours} H</div>
                                                    </div>
                                                    <div className="countdown-item text-center  m-0">
                                                        <div className="countdown-value  d-flex align-items-center justify-content-center" style={{ fontSize: "12px", boxShadow: "none", width: "38px", padding: "2px 4px" }}>{minutes} M</div>
                                                    </div>
                                                    <div className="countdown-item text-center  m-0">
                                                        <div className="countdown-value  d-flex align-items-center justify-content-center" style={{ fontSize: "12px", boxShadow: "none", width: "38px", padding: "2px 4px" }}>{seconds} S</div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
