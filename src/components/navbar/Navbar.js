import React,{useState,useEffect,useRef} from 'react'
import { Link } from "react-router-dom";

import "./Navbar.css";


const Navbar = () => {

  const [showMenu,setShowMenu] = useState(false);
  const ref = useRef(null);



  return (
    <>
      <nav className='main-nav'>

        <div className='logo'>
          <h2>Hotello</h2>
        </div>

        <div className={showMenu ? "menu-links mobile-menu-link" : "menu-links"}>
          <ul>
            <li className='link-style'>
              <Link className='link-style' to="/">HOME</Link>
            </li>
            <li>
              <a className='link-style' href='#about' >ABOUT</a>
            </li>
            <li>
              <a className='link-style' href="#vacations" >VACATIONS</a>
            </li>
            <li>
              <a className='link-style' href="#search">SEARCH</a>
            </li>
            
          </ul>
        </div>

        <div className='socials'>
            <ul className="social-media-desktop">
              <li>
                <Link className='link-style' to="/login">Login</Link>
              </li>
              <li>
                <Link className='link-style' to="/signup">SignUp</Link>
              </li>
            </ul>

            {/* hamburger */}
            <div className='hamburger-menu'>
              <span onClick={()=>{setShowMenu(!showMenu)}}> 
                <i className="fa-solid fa-bars"></i>
              </span>
            </div>
        </div>

      </nav>
    </>
  )
}

export default Navbar