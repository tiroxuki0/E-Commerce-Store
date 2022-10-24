import React from "react";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import QuantityOrder from "../common/QuantityOrder";
import { useDispatch, useSelector } from "react-redux";
import { removeItem as removeItemRedux } from "../../redux/cartSlice";
import { checkCartUser } from "../../firebase/service";

const CartItem = (props) => {
  const { id, images, title, info, finalPrice, originalPrice, quantity, path } =
    props;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const imagesData = useSelector((state) => state.data.images);
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
      <div className="cart_item cart_order">
        <figure className="cart_item_img">
          <Link to={`${path}${id}`}>
            <img src={imageFinal} alt="product-img" />
          </Link>
        </figure>
        <div className="cart_item_info">
          <div className="cart_item_head">
            <h4 className="cart_item_title">
              <Link to={`/product-details/${id}`}>
                {title} {info}
              </Link>
            </h4>
          </div>

          <h2 className="cart_item_price">
            {newPrice} &nbsp;
            <small>
              <del>{oldPrice}</del>
            </small>
          </h2>

          <QuantityOrder itemId={id} itemQuantity={quantity} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
