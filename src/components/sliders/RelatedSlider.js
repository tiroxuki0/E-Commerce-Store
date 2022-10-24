import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";
import ProductCard from "../product/ProductCard";
import { useSelector } from "react-redux";

import "swiper/scss";
import "swiper/scss/pagination";

const RelatedSlider = (props) => {
  const { category } = props;
  const productsData = useSelector((state) => state.data.products);

  const relatedProduct = productsData.filter(
    (item) => item.category === category
  );

  return (
    <Swiper
      modules={[Pagination, A11y]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
      }}
      className="related_swiper"
    >
      {relatedProduct.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RelatedSlider;
