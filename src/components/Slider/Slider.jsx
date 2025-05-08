import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import img1 from '../../assets/images/slide1.jpg';
import img2 from '../../assets/images/slide2.jpg';
import img3 from '../../assets/images/slide3.jpg';
import img4 from '../../assets/images/slide4.jpg';
import img5 from '../../assets/images/slide5.jpg';
import img6 from '../../assets/images/slide6.jpg';
function Slider() {
  const [wid, setWid] = useState()
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 900) setWid(1)
      else if (window.innerWidth >= 900 && window.innerWidth <= 1400) setWid(2)
    })
  }, [])
  return (
    <div id="sliderHome">
      <Swiper
        className="swiper_container"
        effect={'cards'}
        centeredSlidesBounds={true}
        centeredSlides={false}
        centerInsufficientSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        spaceBetween={60}
        slidesPerView={wid}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide key={img1}><div className='Sliderimg'><img src={img1} alt="img" /></div></SwiperSlide>
        <SwiperSlide key={img2}><div className='Sliderimg'><img src={img2} alt="img" /></div></SwiperSlide>
        <SwiperSlide key={img3}><div className='Sliderimg'><img src={img3} alt="img" /></div></SwiperSlide>
        <SwiperSlide key={img4}><div className='Sliderimg small-image'><img src={img4} alt="img" /></div></SwiperSlide>
        <SwiperSlide key={img5}><div className='Sliderimg small-image'><img src={img5} alt="img" /></div></SwiperSlide>
        <SwiperSlide key={img6}><div className='Sliderimg small-image'><img src={img6} alt="img" /></div></SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>

    </div>
  );
}

export default Slider