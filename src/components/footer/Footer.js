import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer' id='about'>

        <div className='grid'>

            <div className='f-about'>
                <div>
                    <h3>About</h3>
                    <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum atque voluptatem magnam odit sunt ipsum in beatae nobis ab eligendi? Nostrum quam magni illo ad ab rerum numquam autem enim.
                    </p>
                </div>
            </div>

            <div className='f-links'>
                <div>
                    <h3>Links</h3>
                    <ul>
                        <li><a href='/'><i className="fa-solid fa-arrow-right-long"></i> linkedin</a></li>
                        <li><a href='/'><i className="fa-solid fa-arrow-right-long"></i> github</a></li>
                        <li><a href='/'><i className="fa-solid fa-arrow-right-long"></i> instagram</a></li>
                    </ul>
                </div>
            </div>

            <div className='f-services'>
                <div>
                    <h3>Services</h3>
                    <ul>
                        <li><a href='/'><i className="fa-solid fa-arrow-right-long"></i> Web-Design</a></li>
                        <li><a href='/'><i className="fa-solid fa-arrow-right-long"></i> Web-Development</a></li>
                        <li><a href='/'><i className="fa-solid fa-arrow-right-long"></i> MERN project</a></li>
                    </ul>
                </div>
            </div>

            <div className='f-address'>
                <div>
                    <h3>Have a question?</h3>
                    <address>
                        <div>
                            <p><i className="fa-solid fa-location-dot"></i> Dehradun, Uttrakhand</p>
                        </div>
                        <div>
                            <a href='tel:+918979023321'><i className="fa-solid fa-phone"></i> +91 8979023321</a>
                        </div>
                        <div>
                            <a href='mailto:negiaditya1234@gmail.com'><i className="fa-solid fa-envelope"></i> negiaditya1234@gmail.com</a>
                        </div>
                    </address>
                </div>
            </div>

        </div>

        <div className="f-container">
            <div>
                <div className='f-social-icons'>
                    <a href='/'><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href='/'><i className="fa-brands fa-instagram"></i></a>
                    <a href='/'><i className="fa-brands fa-github"></i></a>
                </div>

                <div className='f-credits'>
                    <p>This website was created by Aditya Negi who is on his journey to become a web-developer</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Footer;