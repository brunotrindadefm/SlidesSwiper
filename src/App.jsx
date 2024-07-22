import './index.css'

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, EffectFlip, EffectCoverflow } from 'swiper/modules';

import { register } from 'swiper/element/bundle'
register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

function App() {

  const [images, setImages] = useState([])
  const [sliderPerView, setSliderPerView] = useState(2)

  const getImages = async () => {

    try {
      const requests = Array.from({ length: 4 }, () => axios.get('https://picsum.photos/1200/1000', {
        responseType: 'blob'
      }));
      const responses = await Promise.all(requests);
      const imageUrls = responses.map(response => URL.createObjectURL(response.data));
      setImages(imageUrls);
    } catch (erro) {
      console.log(erro)
    }

  }

  useEffect(() => {

    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1)
      } else {
        setSliderPerView(2)
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize)

    getImages();

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='container'>
      <h1>Slider com React</h1>
      
      <h2>Slider Normal</h2>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{ clickable: true }}
      >
        {images && images.map((imagens, index) => (
          <SwiperSlide key={index}>
            <img
              src={imagens}
              alt="Slider"
              className='slide-item'
            />
          </SwiperSlide>
        ))}

      </Swiper>

       

        <h2>EffectFade</h2>
      <Swiper
        modules={[EffectFade]}
        effect='fade'
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{ clickable: true }}
      >
        {images && images.map((imagens, index) => (
          <SwiperSlide key={index}>
            <img
              src={imagens}
              alt="Slider"
              className='slide-item'
            />
          </SwiperSlide>
        ))}

      </Swiper>
       
      <h2>EffectFlip</h2>
      <Swiper
        modules={[EffectFlip]}
        effect='flip'
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{ clickable: true }}
      >
        {images && images.map((imagens, index) => (
          <SwiperSlide key={index}>
            <img
              src={imagens}
              alt="Slider"
              className='slide-item'
            />
          </SwiperSlide>
        ))}

      </Swiper>
       
      <h2>EffectCoverFlow</h2>
      <Swiper
        modules={[EffectCoverflow]}
        effect='coverflow'
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{ clickable: true }}
      >
        {images && images.map((imagens, index) => (
          <SwiperSlide key={index}>
            <img
              src={imagens}
              alt="Slider"
              className='slide-item'
            />
          </SwiperSlide>
        ))}

      </Swiper>
      
    </div>
  )
}

export default App
