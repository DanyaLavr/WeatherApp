import { useEffect, useState } from 'react';
import { useLoading } from '@/hooks/useLoading';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { createBem } from '@/utils/createBem';

import styles from './swiper.module.scss';
import '@/style/global.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { fetchPictures } from '@/api/swiper.js';
import Loader from '@/components/loader/Loader';

const bem = createBem('swiper', styles);

export default function MySwiper() {
  const [pictures, setPictures] = useState([]);
  const [isLoading, handleLoading, error, handleError, resetError] = useLoading();
  useEffect(() => {
    handleLoading(true);
    resetError();
    const getPictures = async () => {
      try {
        const data = await fetchPictures();
        setPictures(data);
      } catch {
        handleError();
      } finally {
        handleLoading(false);
      }
    };
    getPictures();
  }, []);

  return (
    <section className={styles['swiper-section']}>
      <div className={`${styles['swiper-container']} container`}>
        <h2 className={bem('title')}>Beautiful nature</h2>
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {pictures.length > 0 && (
          <Swiper
            className={bem()}
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            initialSlide={2}
            coverflowEffect={{
              rotate: 0,
              stretch: 60,
              depth: 150,
              modifier: 2,
            }}
          >
            {pictures.map(({ id, largeImageURL }) => (
              <SwiperSlide key={id}>
                <div className={bem('slide')}>
                  <img src={largeImageURL} alt={id} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
