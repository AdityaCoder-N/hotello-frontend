import React, {useState,useEffect} from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./Slide";
import "./Slider.css"

const SliderComponent =()=>{

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  {/* Performs similarly to componentDidMount in classes */}
  useEffect(() => {
      window.addEventListener("resize", () => {
          const ismobile = window.innerWidth < 768;
          if (ismobile !== isMobile) setIsMobile(ismobile);
      }, false);
  }, [isMobile]);


  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: isMobile?1:3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    nextArrow: <></>,
    prevArrow: <></>
  };

  return (
    <div style={{marginTop:"8%",marginBottom:"10%"}} id='vacations'>
      <h2 style={{textAlign:"center"}}> Go For a Vacation!</h2>
      <div className="slider-container">

        <div style={{width:"100%" ,position:"absolute" ,zIndex:"1",marginTop:"3%"}}>
          <Slider {...settings} >
            <Slide index={0} />
            <Slide index={1} />
            <Slide index={2} />
            <Slide index={3} />
            <Slide index={4} />
            <Slide index={5} />
          </Slider>
        </div>

        <div className="slider-content">
          {/* colour box */}
        </div>

      </div>
    </div>
  );

}

export default SliderComponent