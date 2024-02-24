
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../components/auth/AuthUser'
export default function Header() {
    const { token, logOut} = AuthUser()
    const [isLogin] = useState(true);
    const [isOpenDropdown, setDropdownValue] = useState(false);
    const openDropdown = () =>{
        setDropdownValue((isToggle) => !isToggle);
    }
    const logOutUser = () =>{
        if(token !== undefined){
            logOut();
        }
    }

  return (
    <header className="p-3">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <span className="fw-bold primary-color fs-2">Bid.com</span>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{marginLeft:"30px"}}>
          <li><Link to={'/'}><span className="nav-link text-dark px-2 text-secondary">Home</span></Link></li>
          <li><Link to={'/'}><span className="nav-link text-dark px-2 text-secondary">Auction</span></Link></li>
          <li><Link to={'/'}><span className="nav-link text-dark px-2 text-secondary">Contact</span></Link></li>
          {/* <li><a className="nav-link text-dark px-2" href="#">Add Poduct</a></li>/ */}
        </ul>

        {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
        </form> */}

        <div className="text-end">
            {
               isLogin ?
                <div className="dropdown text-end">
                    <span className="d-block link-dark text-decoration-none dropdown-toggle" onClick={openDropdown}>
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                    </span>
                    <ul className={`dropdown-menu text-small ${isOpenDropdown ? 'd-block end-0' : ''}`}>
                        <li><Link to={'/product'}><span className="dropdown-item">Profile</span></Link></li>
                        <li><Link to={'/product'}><span className="dropdown-item">Add Poduct</span></Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><span className="dropdown-item" onClick={logOutUser}>Sign out</span></li>
                    </ul>
                </div>
                :
                <Link to="/login"><button type="button" className="btn btn-outline-light me-2 text-white">Login</button></Link>
            }
            
            
         </div>
      </div>
    </div>
  </header>
  )
}
