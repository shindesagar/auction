import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../constants/alpha-env.constant';
export default function ProductCard(props) {
    const navigate = useNavigate();
    console.log(props.getImage);
    const handleClick = (value) => {
        navigate(`/product/${value}`);
    };

    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="bd-placeholder-img card-img-top">
                    {/* <img src={`${baseURL}/images/${props?.getImage?.images[0]}`} alt="" style={{ width: "100%" }} /> */}
                </div>

                <div className="card-body">
                    <h6 className="fs-6 fw-bold">{props?.getImage?.title}</h6>
                    <div className="d-flex items-center">
                        {/* Your SVG icons */}
                    </div>
                    <div className="bid-area d-flex my-4">
                        {/* Bid area content */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            {/* Pass a function reference to onClick */}
                            <button type="button" className="btn btn-md text-white" onClick={() => handleClick(props?.getImage?.slug)}>
                                View Details
                            </button>
                        </div>
                        <small className="text-muted">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
