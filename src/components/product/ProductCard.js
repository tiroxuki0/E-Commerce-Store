import React from "react";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import useActive from "../../hooks/useActive";
import { addItem as addItemRedux } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm as toggleFormRedux } from "../../redux/commonSlice";

const ProductCard = (props) => {
  const {
    id,
    images,
    title,
    info,
    finalPrice,
    originalPrice,
    rateCount,
    path,
    stock,
  } = props;

  const dispatch = useDispatch();
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const imagesData = useSelector((state) => state.data.images);
  const { active, handleActive, activeClass } = useActive(false);

  // handling Add-to-cart
  const handleAddItem = () => {
    const item = { ...props };
    if (formUserInfo) {
      /*  */
      dispatch(addItemRedux({ uid: formUserInfo.uid, product: item }));
      /*  */
      handleActive(id);

      setTimeout(() => {
        handleActive(false);
      }, 3000);
    } else {
      dispatch(toggleFormRedux(true));
    }
  };

  const newPrice = displayMoney(finalPrice);
  const oldPrice = displayMoney(originalPrice);

  /*  */
  const imagePath = images[0]
    .slice(1)
    .split("/")
    .reduce((result, cur) => result + "%2F" + cur, "")
    .replace("%2F", "");

  const imageFinal = imagesData.find((img) =>
    img.toLowerCase().includes(imagePath.toLowerCase())
  );
  /*  */

  return (
    <>
      <div className="card products_card">
        <figure className="products_img">
          <Link to={`${path}${id}`}>
            <img src={imageFinal} alt="product-img" />
          </Link>
        </figure>
        <div className="products_details">
          <span className="rating_star">
            {[...Array(rateCount)].map((_, i) => (
              <IoMdStar key={i} />
            ))}
          </span>
          <h3 className="products_title">
            <Link to={`${path}${id}`}>{title}</Link>
          </h3>
          <h5 className="products_info">{info}</h5>
          <div className="separator"></div>
          <h2 className="products_price">
            {newPrice} &nbsp;
            <small>
              <del>{oldPrice}</del>
            </small>
          </h2>
          {stock > 0 ? (
            <button
              type="button"
              className={`btn products_btn ${activeClass(id)}`}
              onClick={handleAddItem}
            >
              {active ? "Added" : "Add to cart"}
            </button>
          ) : (
            <button
              type="button"
              className={`btn products_btn ${activeClass(id)}`}
              onClick={handleAddItem}
              disabled
            >
              {"Out of stock"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
