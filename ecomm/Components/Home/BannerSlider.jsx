import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom'
import Banner1 from './images/Banner1.png'
const BannerSlider = () => {
    const slider = [{
        id:"slide1",
        image:Banner1,
        heading:'Autumn & Winter 2024 Collection',
        text:'ESELLSI STORE',
        link:'',
        link_text:'Shop Now'
    },
    {
        id:"slide2",
        image:'https://img.freepik.com/free-photo/attractive-young-man-posing-isolated-white-wall_171337-16144.jpg?w=1380&t=st=1709207047~exp=1709207647~hmac=42f9485d3d3ff93b22d95af469dc5ce512afe65daa87847828716ffa60af3b58',
        heading:"Looking For The Best Price",
        text:'',
        link:'',
        link_text:'Shop Now'
    },
    {
        id:"slide3",
        image:'https://elessi2.myshopify.com/cdn/shop/files/slider03_1512x.jpg?v=1614392001',
        heading:'Spring Summer Collection',
        text:'NEW FASHION',
        link:'',
        link_text:'Shop Now'
    }]
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:false,
        arrows:true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
        // cssEase: 'linear',
        // autoplaySpeed: 0,
      };
     
   
   
const slides = []
slider.forEach((value, index) => {
    slides.push(
        <div className='container-fluid'>
      <div className="slideshow" id={value.id} key={index} > 
      <img className=" banner-img img-fluid" src={value.image} alt="" />
      <div className='banner-content col-6'>
        <h1>{value.heading}</h1>
        <p>{value.text}</p>
        <Link className='btn btn-primary' to={`/${value.link}`} type="button"> {value.link_text}</Link>
        </div>
      </div>
      </div>
    );
    console.log(`Slide ${index}:`, value.image);
  });
    return (
       
        <Slider {...settings}>
            
                 {slides}
        </Slider>
       
        
    );
}

export default BannerSlider;
