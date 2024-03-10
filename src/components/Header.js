
import React, { useState,useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import AuthUser from '../components/auth/AuthUser'
export default function Header() {
    const navigate = useNavigate();
    const { token, logOut} = AuthUser()
    let [isLogin, setLogin] = useState(false);
    const [isOpenDropdown, setDropdownValue] = useState(false);
    const openDropdown = () =>{
        setDropdownValue((isToggle) => !isToggle);
    }
    const logOutUser = () =>{
        if(token !== undefined){
            logOut();
            isLogin = false
        }
    }
    useEffect(() => {
      const isToken = JSON.parse(localStorage.getItem('login'));
      setLogin(isToken);
      }, [navigate]);
  return (
    <header className="p-3" style={{background:"#489f48"}}>
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <span className="fw-bold  text-white fs-2">Bid.com</span>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{marginLeft:"30px"}}>
          <li><Link to={'/'}><span className="nav-link text-white px-2 text-secondary">Home</span></Link></li>
          <li><Link to={'/'}><span className="nav-link text-white px-2 text-secondary">Auction</span></Link></li>
          <li><Link to={'/'}><span className="nav-link text-white px-2 text-secondary">Contact</span></Link></li>
        </ul>

         <div className="text-end">
            {
              isLogin && isLogin ?
                <div className="dropdown text-end">
                    <span className="d-block link-dark text-decoration-none dropdown-toggle" onClick={openDropdown}>
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                    </span>
                    <ul className={`dropdown-menu text-small ${isOpenDropdown ? 'd-block end-0' : ''}`}>
                        <li className='text-white'><Link to={'/profile'}><span className="dropdown-item" onClick={()=>setDropdownValue(false)}>Profile</span></Link></li>
                        <li className='text-white'><Link to={'/product'}><span className="dropdown-item" onClick={()=>setDropdownValue(false)}>Add Poduct</span></Link></li>
                        <li className='text-white'><hr className="dropdown-divider"/></li>
                        <li className='text-white'><span className="dropdown-item" onClick={logOutUser}>Sign out</span></li>
                    </ul>
                </div>
                :
                <Link to="/login"><button type="button" className="btn btn-outline-light me-2 bg-white text-dark">Login</button></Link>
            }
            
            
         </div>
      </div>
    </div>
  </header>
  )
}
