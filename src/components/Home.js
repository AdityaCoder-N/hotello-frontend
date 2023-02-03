import React from 'react'
import Carrousel from './carousel/Carrousel'
import Features from './Features/Features'
import SliderComponent from './Slider/Slider'
import Search from './SearchByLocation/Search'



const Home = () => {
  return (
    <>
      <Carrousel/>
    
      <Search></Search>

      <Features/>

      <SliderComponent/>
    </>
  )
}

export default Home