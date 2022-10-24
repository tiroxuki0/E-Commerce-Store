import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem as incrementItemRedux,
  decrementItem as decrementItemRedux,
} from "../../redux/cartSlice";
import { checkCartUser } from "../../firebase/service";

const QuantityBox = (props) => {
  const dispatch = useDispatch();
  const { itemId, itemQuantity } = props;
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div className="quantity_box">
        <button
          type="button"
          onClick={() => {
            const update = cartItems
              .map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }
                return item;
              })
              .filter((item) => item.quantity !== 0);
            checkCartUser(formUserInfo.uid, update);
            dispatch(decrementItemRedux(itemId));
          }}
        >
          <FaMinus />
        </button>
        <span className="quantity_count">{itemQuantity}</span>
        <button
          type="button"
          onClick={() => {
            const update = cartItems.map((item) => {
              if (item.id === itemId) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }
              return item;
            });
            checkCartUser(formUserInfo.uid, update);
            dispatch(incrementItemRedux(itemId));
          }}
          disabled={itemQuantity >= 5}
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
};

export default QuantityBox;
