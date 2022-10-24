import React from "react";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import OrderItem from "../components/cart/OrderItem";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

const marks = [
  {
    value: 0,
    label: "Ordered",
  },
  {
    value: 50,
    label: "Shipped",
  },
  {
    value: 100,
    label: "Delivered",
  },
];

const Cart = () => {
  useDocTitle("Order details");
  const uid = useSelector((state) => state.common.formUserInfo.uid);
  const ordersData = useSelector((state) => state.data.orders);
  const [selectedOrder, setSelectedOrder] = React.useState(0);

  const handlePagination = (event, page) => {
    console.log(page);
    setSelectedOrder(page - 1);
  };

  const RenderOrders = () => {
    let orders = null;
    /* Object.keys(ordersData[uid])[selectedOrder] */
    if (ordersData[uid] && Object.keys(ordersData[uid]).length > 0) {
      orders = (
        <section id="orders" className="section_orders">
          <div className="container">
            <>
              <div className="separator separator_order"></div>
              <div className="wrapper cart_wrapper">
                <div className="cart_left_col">
                  {ordersData[uid][
                    Object.keys(ordersData[uid])[selectedOrder]
                  ].cart.cartItems.map((item) => (
                    <OrderItem key={item.id} {...item} />
                  ))}
                </div>

                {/* <CheckOut /> */}

                <div className="cart_right_col">
                  <div className="order_header">
                    <div className="date">
                      <h4>Date</h4>
                      <p>
                        {ordersData[uid][
                          Object.keys(ordersData[uid])[selectedOrder]
                        ].createdAt.date +
                          " " +
                          ordersData[uid][
                            Object.keys(ordersData[uid])[selectedOrder]
                          ].createdAt.time}
                      </p>
                    </div>
                    <div className="id_order">
                      <h4>Order No.</h4>
                      <p>#{Object.keys(ordersData[uid])[selectedOrder]}</p>
                    </div>
                  </div>
                  <div className="order_summary">
                    {/* PRICE */}
                    <div className="order_summary_details order_price_details">
                      <div className="price">
                        <span>Original Price</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].cart.originalPrice.text
                          }
                        </b>
                      </div>
                      <div className="discount">
                        <span>Discount</span>
                        <b>
                          -{" "}
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].cart.discount.text
                          }
                        </b>
                      </div>
                      <div className="delivery">
                        <span>Delivery</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].cart.delivery
                          }
                        </b>
                      </div>
                      <div className="separator"></div>
                      <div className="total_price">
                        <b>
                          <small>Total Price</small>
                        </b>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].cart.totalAmount.text
                          }
                        </b>
                      </div>
                    </div>
                    {/*  */}
                    <div className="separator"></div>
                    {/* ADDRESS */}
                    <div className="order_summary_details order_address_details">
                      <div className="order_name">
                        <div className="firstName">
                          <span>First name</span>
                          <b>
                            {
                              ordersData[uid][
                                Object.keys(ordersData[uid])[selectedOrder]
                              ].shippingAddress.firstName
                            }
                          </b>
                        </div>
                        <div className="lastName">
                          <span>Last name</span>
                          <b>
                            {
                              ordersData[uid][
                                Object.keys(ordersData[uid])[selectedOrder]
                              ].shippingAddress.lastName
                            }
                          </b>
                        </div>
                      </div>
                      <div className="address1">
                        <span>Address 1</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].shippingAddress.address1
                          }
                        </b>
                      </div>
                      <div className="address2">
                        <span>Address 2</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].shippingAddress.address2
                          }
                        </b>
                      </div>
                      <div className="city">
                        <span>City</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].shippingAddress.city
                          }
                        </b>
                      </div>
                      <div className="province">
                        <span>State/Province</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].shippingAddress.province
                          }
                        </b>
                      </div>
                      <div className="country">
                        <span>Country</span>
                        <b>
                          {
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].shippingAddress.country
                          }
                        </b>
                      </div>
                    </div>

                    <h3 className="order_tracking">Tracking Order</h3>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "85%" }}>
                        <Slider
                          aria-label="Custom marks"
                          defaultValue={
                            ordersData[uid][
                              Object.keys(ordersData[uid])[selectedOrder]
                            ].tracking === "ordered"
                              ? 0
                              : ordersData[uid][
                                  Object.keys(ordersData[uid])[selectedOrder]
                                ].tracking === "shipped"
                              ? 50
                              : 100
                          }
                          step={50}
                          min={0}
                          max={100}
                          valueLabelDisplay="auto"
                          marks={marks}
                          disabled
                        />
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </section>
      );
    } else {
      orders = (
        <section id="cart" className="section">
          <div className="container">
            <div className="empty_cart_wrapper">
              <div className="empty_cart_img">
                <BsCartX />
              </div>
              <h2>Your Orders is Empty</h2>
              <Link to="/all-products" className="btn">
                Start Shopping
              </Link>
            </div>
          </div>
        </section>
      );
    }
    return orders;
  };

  return (
    <>
      <RenderOrders />
      {ordersData[uid] && Object.keys(ordersData[uid]).length !== 1 && (
        <Stack spacing={2} className="order_pagination">
          <Pagination
            count={Object.keys(ordersData[uid]).length}
            shape="rounded"
            onChange={handlePagination}
          />
        </Stack>
      )}
    </>
  );
};

export default Cart;
