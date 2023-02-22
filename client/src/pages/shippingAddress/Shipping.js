/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./checkOut.scss";
import Helmet from "../../components/Helmet";
import { ToastContainer } from "react-toastify";
import {
  resetCart,
  savePaymentMethod,
  saveShippingAddress,
} from "../../actions/cartActions";
import { createOrder } from "../../actions/orderActions";
import Loader from "../../components/Loader/Loader";

const Shipping = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success: successOrderCreate, order } = orderCreate;

  const [name, setName] = useState(userInfo.name);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.quantity) *
            (Number(item.price) - Number(item.price) * Number(item.discount)),
        0
      )
    );
  }, [cartItems]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((cart.itemsPrice * 0.15).toFixed(2)));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, city, address }));
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: { country, city, address },
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (successOrderCreate) {
      setName("");
      setPhoneNumber("");
      setCountry("");
      setCity("");
      setAddress("");
      setPaymentMethod("");

      dispatch(resetCart());
      navigate(`/order/${order._id}`);
    }
  }, [dispatch, navigate, successOrderCreate]);

  return (
    <Helmet title="Check out">
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="checkOut-wrapper">
          <div className="form-wrapper col-6 col-md-10 col-sm-11">
            <h1 className="form-wrapper_title">Check out</h1>
            <form className="form-wrapper_container" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                className="form-wrapper_container_input col-8 col-md-12 col-sm-12"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your phone number"
                value={phoneNumber}
                className="form-wrapper_container_input col-8 col-md-12 col-sm-12"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your country"
                value={country}
                className="form-wrapper_container_input col-8 col-md-12 col-sm-12"
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your region"
                value={city}
                className="form-wrapper_container_input col-8 col-md-12 col-sm-12"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                className="form-wrapper_container_input col-12"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="form-wrapper_container_choice col-12">
                <div className="form-wrapper_container_choice_item col-3">
                  <input
                    type="radio"
                    id="delivery"
                    name="payment"
                    value={paymentMethod}
                    className="radio"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="delivery">Payment by delivery</label>
                </div>
                <div className="form-wrapper_container_choice_item col-3">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value={paymentMethod}
                    className="radio"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">Paypal</label>
                </div>
                <div className="form-wrapper_container_choice_item col-3">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value={paymentMethod}
                    className="radio"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <br />
                  <label htmlFor="card">Credit Card</label>
                </div>
              </div>
              <button type="submit" className="form-wrapper_container_btn">
                Submit
              </button>
            </form>
          </div>
          <div className="productInfo-container col-4 col-md-10 col-sm-11">
            <div className="productInfo-wrapper">
              {cartItems.map((item, index) => (
                <div className="productInfo-wrapper_item" key={index}>
                  <div className="left col-8">
                    <div className="productInfo-wrapper_item_img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="productInfo-wrapper_item_title">
                      <span className="title">{item.name}</span>
                      <span className="quantity">x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="right col-4">
                    <div className="productInfo-wrapper_item_price">
                      $
                      {Number(
                        (item.price - item.price * item.discount) *
                          item.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="totalPrice">
              <p>Total: ${totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default Shipping;
