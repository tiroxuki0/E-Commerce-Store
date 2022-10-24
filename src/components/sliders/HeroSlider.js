import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import { displayMoney } from "../../helpers/utils";
import { useSelector } from "react-redux";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";

const HeroSlider = () => {
  const productsData = useSelector((state) => state.data.products);
  const imagesData = useSelector((state) => state.data.images);
  const heroProducts = productsData.filter(
    (item) => item.tag === "hero-product"
  );

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {heroProducts.map((item, i) => {
        const {
          id,
          title,
          tagline,
          heroImage,
          finalPrice,
          originalPrice,
          path,
        } = item;
        const newPrice = displayMoney(finalPrice);
        const oldPrice = displayMoney(originalPrice);

        /*  */
        const imagePath = heroImage
          .slice(1)
          .split("/")
          .reduce((result, cur) => result + "%2F" + cur, "")
          .replace("%2F", "");

        const imageFinal = imagesData.find((img) =>
          img.toLowerCase().includes(imagePath.toLowerCase())
        );
        /*  */

        return (
          <SwiperSlide
            key={id}
            className={`wrapper hero_wrapper hero_slide-${i}`}
          >
            <div className="hero_item_txt">
              <h3>{title}</h3>
              <h1>{tagline}</h1>
              <h2 className="hero_price">
                {newPrice} &nbsp;
                <small>
                  <del>{oldPrice}</del>
                </small>
              </h2>
              <Link to={`${path}${id}`} className="btn">
                Shop Now
              </Link>
            </div>
            <figure className="hero_item_img">
              <img src={imageFinal} alt="product-img" />
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
