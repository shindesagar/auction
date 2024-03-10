import React from 'react'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div className="container mt-5">
          <footer className="pt-5">
            <div className="row">
              <div className="col-2">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Home</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Features</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Pricing</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">FAQs</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">About</span></Link></li>
                </ul>
              </div>

              <div className="col-2">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Home</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Features</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Pricing</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">FAQs</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">About</span></Link></li>
                </ul>
              </div>

              <div className="col-2">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Home</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Features</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">Pricing</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">FAQs</span></Link></li>
                  <li className="nav-item mb-2"><Link to={'/'}><span className="nav-link p-0 text-muted">About</span></Link></li>
                </ul>
              </div>

              <div className="col-4 offset-1">
                <form>
                  <h5>Subscribe to our newsletter</h5>
                  <p>Monthly digest of whats new and exciting from us.</p>
                  <div className="d-flex w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
                    <button className="btn btn-primary" type="button">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex justify-content-between py-4 my-4 mb-0 border-top">
              <p>© 2021 Company, Inc. All rights reserved.</p>
            </div>
          </footer>
        </div>
  )
}
