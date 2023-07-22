import React from 'react'
import "./Features.css"

const Features = () => {

    // const [isMobile, setIsMobile] = useState(false)
 
     
    // const handleResize = () => {
    //     if (window.innerWidth < 720) {
    //         setIsMobile(true)
    //     } else {
    //         setIsMobile(false)
    //     }
    // }

    // // create an event listener
    // useEffect(() => {
    //     window.addEventListener("resize", handleResize)
    // })

    return (

        <div className='features-container'>

            <div className='features-container-content'>
                <p>Our Hotels offer the best of services for a good stay and satisfaction of the Guest. Our rooms are well maintained and cleaned regularly by the hotel staff.
                </p>
            </div>

            <div className='logo-container'>

                <div className='logos'>
                    <div style={{display:"flex", alignItems:"center" ,justifyContent:"center"}}>
                        <i className="fa-solid fa-wifi"></i>
                    </div>
                  
                    <p>WiFi Avalaible</p>
                </div>

                <div className='logos'>
                    <div style={{display:"flex", alignItems:"center" ,justifyContent:"center"}}>
                        <i className="fa-solid fa-virus-covid-slash"></i>
                    </div>
                 
                    <p>Covid Negative tested Staff</p>
                </div>

                <div className='logos'>
                    <div style={{display:"flex", alignItems:"center" ,justifyContent:"center"}}>
                        <i className="fa-solid fa-bell-concierge"></i>
                    </div>
                  
                    <p>Great Service</p>
                </div>

                <div className='logos'>
                    <div style={{display:"flex", alignItems:"center" ,justifyContent:"center"}}>
                        <i className="fa-solid fa-bowl-food"></i>
                    </div>
       
                    <p>Great Food</p>
                </div>

                <div className='logos'>
                    <div style={{display:"flex", alignItems:"center" ,justifyContent:"center"}}>
                        <i className="fa-solid fa-video-slash"></i>
                    </div>
                    <p>Protection of Privacy</p>
                </div>

            </div>
        </div>

    )
}

export default Features