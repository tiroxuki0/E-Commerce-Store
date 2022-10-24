import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import AccountForm from "../form/AccountForm";
import SearchBar from "./SearchBar";
import CheckOut from "../checkout/CheckOut";
import UserInfo from "../userinfo/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleForm as toggleFormRedux,
  toggleSearch as toggleSearchRedux,
  setFormUserInfo as setFormUserInfoRedux,
  toggleUserInfo,
} from "../../redux/commonSlice";
import {
  clearAll,
  setOriginalPrice,
  setDiscount,
  setTotalAmount,
} from "../../redux/cartSlice";
import { firebaseSignOut } from "../../firebase/service";
import useToast from "../../hooks/useToast";
import { calculateTotal, displayMoney } from "../../helpers/utils";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useToast();
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // total original price
    const cartTotal = cartItems.map((item) => {
      return item.originalPrice * item.quantity;
    });

    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);

    dispatch(
      setOriginalPrice({
        number: calculateCartTotal,
        text: displayCartTotal[0],
      })
    );

    // total discount
    const cartDiscount = cartItems.map((item) => {
      return (item.originalPrice - item.finalPrice) * item.quantity;
    });

    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);

    dispatch(
      setDiscount({
        number: calculateCartDiscount,
        text: displayCartDiscount[0],
      })
    );

    // final total amount
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    dispatch(
      setTotalAmount({
        number: totalAmount,
        text: displayTotalAmount[0],
      })
    );
  }, [cartItems]);

  // handle the sticky-header
  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

    window.addEventListener("scroll", handleIsSticky);

    return () => {
      window.removeEventListener("scroll", handleIsSticky);
    };
  }, [isSticky]);

  const cartQuantity = cartItems.reduce(
    (total, cur) => total + cur.quantity,
    0
  );

  const showCart = (e) => {
    e.preventDefault();
    if (formUserInfo) {
      navigate("/cart");
    } else {
      dispatch(toggleFormRedux(true));
    }
  };

  return (
    <>
      <header id="header" className={isSticky ? "sticky" : ""}>
        <div className="container">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/">X-Beat</Link>
            </h2>
            <nav className="nav_actions">
              <div className="search_action">
                <span
                  onClick={() => {
                    /*  */
                    dispatch(toggleSearchRedux(true));
                    /*  */
                  }}
                >
                  <AiOutlineSearch />
                </span>
                <div className="tooltip">Search</div>
              </div>

              <div className="cart_action">
                <Link to="/cart" onClick={showCart}>
                  <AiOutlineShoppingCart />
                  {cartQuantity > 0 && (
                    <span className="badge">{cartQuantity}</span>
                  )}
                </Link>
                <div className="tooltip">Cart</div>
              </div>

              <div className="user_action">
                <span>
                  <AiOutlineUser />
                </span>
                <div className="dropdown_menu">
                  <h4 className="dropdown_header">
                    {formUserInfo && (
                      <div
                        onClick={() => {
                          dispatch(toggleUserInfo(true));
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        {formUserInfo.photoURL ? (
                          <Avatar
                            className="header_avatar"
                            alt="avatar"
                            src={
                              formUserInfo.photoURL.includes("http")
                                ? formUserInfo.photoURL
                                : `data:image/svg+xml;base64,${formUserInfo.photoURL}`
                            }
                            style={{
                              width: 40,
                            }}
                          />
                        ) : (
                          <Avatar
                            className="header_avatar"
                            style={{
                              width: 40,
                              backgroundColor: "#f5f5f5",
                            }}
                            icon={<UserOutlined />}
                          />
                        )}
                        <Link
                          to="#"
                          style={{ marginLeft: "10px" }}
                          className="header_name"
                        >
                          {formUserInfo.username
                            ? formUserInfo.username
                            : formUserInfo.email.split("@")[0]}
                        </Link>
                      </div>
                    )}
                  </h4>
                  <p style={{ marginTop: 15 }}>
                    Access account and manage orders
                  </p>
                  {!formUserInfo && (
                    <button
                      type="button"
                      onClick={() => {
                        /*  */
                        dispatch(toggleFormRedux(true));
                        /*  */
                      }}
                    >
                      Login / Signup
                    </button>
                  )}
                  {formUserInfo && (
                    <>
                      <div className="separator"></div>
                      <ul>
                        <li>
                          <Link
                            onClick={() => {
                              dispatch(toggleUserInfo(true));
                            }}
                          >
                            Account
                          </Link>
                        </li>
                        <li>
                          <Link to="orders">Orders</Link>
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(setFormUserInfoRedux(""));
                          dispatch(clearAll());
                          navigate("/");
                          notify("success", `You're successfully logged out`);
                          firebaseSignOut();
                        }}
                        style={{
                          margin: "0.5rem 0px 0px 0px",
                          padding: "3px 10px",
                        }}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <SearchBar />
      <AccountForm />
      <CheckOut />
      <UserInfo />
    </>
  );
};

export default Header;
