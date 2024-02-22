import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard() {
    const navigate = useNavigate();

    const handleClick = (value) => {
        navigate(`/product/${value}`);
    };

    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="bd-placeholder-img card-img-top">
                    <img src="http://localhost:7000/images/1708448746365-img-banner-3.jpg" alt="" style={{ width: "100%" }} />
                </div>

                <div className="card-body">
                    <h6 className="fs-6 fw-bold">Antique Pieces For Decoration</h6>
                    <div className="d-flex items-center">
                        {/* Your SVG icons */}
                    </div>
                    <div className="bid-area d-flex my-4">
                        {/* Bid area content */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            {/* Pass a function reference to onClick */}
                            <button type="button" className="btn btn-md text-white" onClick={() => handleClick('anti')}>
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
