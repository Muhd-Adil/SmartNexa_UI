import React from 'react'
import './Navbar.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate, Link } from 'react-router-dom';
import SearchIcon from './icons/search.svg'
import PersonIcon from './icons/person.svg'
import CartIcon from './icons/cart.svg'
import DropDown from './icons/dropdown.svg'
import HomeIcon from './icons/home.svg'
import BuildingIcon from './icons/building.png'
import OfficeIcon from './icons/office.png'
import HotelIcon from './icons/hotel.png'
import HospitalIcon from './icons/hospital.svg'
import IndustrialIcon from './icons/industrial.svg'
 

const Navbar = () => {
  return (          
    <>
        <div className='navbar-container' >
            <div className='brand-name'>SmartNexa</div>
            {/* <div className='search-input-container'>
              <input type="text" className='search-input' placeholder='Search Products'/>
              <div className="search-icon-box">
                <a href="">
                    <img src={SearchIcon} alt="Search Icon" width={21} height={21} />
                </a>
              </div>
            </div> */}
            <div>
                <ul className='links'>
                    <li className='dropdown-container'>
                      <div className='dropdown-header'data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products</div>
                      <div><img src={DropDown} alt="dropdown" width={21} height={21}/></div>
                      <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            <span><img src={HomeIcon} alt="home icon" /></span>
                            <div className='dropdown-txt'>
                              <span>Home</span>
                            </div>
                          </a>
                          <a className="dropdown-item" href="#">
                            <span><img src={BuildingIcon} alt="home icon" className='building-img'/></span>
                            <div className='dropdown-txt'>
                              <span>Building</span>
                            </div>
                          </a>
                          <a className="dropdown-item" href="#">
                            <span><img src={OfficeIcon} alt="home icon" className='office-img' /></span>
                            <div className='dropdown-txt'>
                              <span>Office</span>
                            </div>
                          </a>
                          <a className="dropdown-item" href="#">
                            <span><img src={HotelIcon} alt="home icon" className='hotel-img'/></span>
                            <div className='dropdown-txt'>
                              <span>Hotel</span>
                            </div>
                          </a>
                          <a className="dropdown-item" href="#">
                            <span><img src={HospitalIcon} alt="home icon" /></span>
                            <div className='dropdown-txt'>
                              <span>Hospital</span>
                            </div>
                          </a>
                          <a className="dropdown-item" href="#">
                            <span><img src={IndustrialIcon} alt="home icon" /></span>
                            <div className='dropdown-txt'>
                              <span>Industrial</span>
                            </div>
                          </a>
                      </div>
                    </li> 
                    <li>Deals</li>
                    <li>Guides</li>
                    <li className='dropdown-container'>
                      <div>Support</div>
                      <div><img src={DropDown} alt="dropdown" width={21} height={21}/></div>
                    </li>            
                </ul>
            </div>
            <div className='icon-container'>
                <a href="">
                  <img src={PersonIcon} alt="Person Icon" width={21} height={21} />
                </a>
                <a href="" className='cart-container'>
                    <img src={CartIcon} alt="Cart Icon" width={21} height={21}/>
                </a>
            </div>
        </div>
    </>
  )
}

export default Navbar