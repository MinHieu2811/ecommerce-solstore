import React, { useEffect, useState } from "react";
import "./orderEdit.scss";
import axios from "axios";
import { getOrderDetails } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Helmet from "../../components/Helmet";
import Checkbox from "../../components/checkbox/CheckBox";
import { PayPalButton } from "react-paypal-button-v2";
import { deliverOrder, payOrder } from "../../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConstants";

const OrderEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId = useParams().id;

  const [sdkReady, setSdkReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading: loadingDetails, error: errorDetails, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId.id, paymentResult));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [userInfo, orderId, dispatch, navigate, order, successPay, successDeliver]);

  return (
    <Helmet title="Order Edit">
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <div>{errorDetails}</div>
      ) : (
        <div className="order-edit-wrapper">
          <div className="order-edit-header">
            {
              userInfo.isAdmin ? (<h1>Order Update</h1>) : (<h1>Order Details</h1>)
            }
          </div>
          <div className="order-edit-body">
            <div className="order-edit-body-left col-4 col-md-11 col-sm-12">
              <div className="order-edit-body-left_item">
                <span className="title">User: </span>
                <span className="value">{order.user.name}</span>
              </div>
              <div className="order-edit-body-left_item">
                <span className="title">Country: </span>
                <span className="value">{order.shippingAddress.country}</span>
              </div>
              <div className="order-edit-body-left_item">
                <span className="title">City: </span>
                <span className="value">{order.shippingAddress.city}</span>
              </div>
              <div className="order-edit-body-left_item">
                <span className="title">Address: </span>
                <span className="value">{order.shippingAddress.address}</span>
              </div>
              <div className="order-edit-body-left_item">
                <span className="title">Payment Method: </span>
                <span className="value">{order.paymentMethod}</span>
              </div>
              <div className="order-edit-body-left_item">
                <span className="title">Total Price: </span>
                <span className="value">${order.totalPrice}</span>
              </div>
              {!order.isPaid && (
                <div className="order-pay" style={{ width: '50%'}}>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered &&
                order.isPaid && (
                  // <button className='btn' onClick={deliverHandler}>Mark As Delivered</button>
                  <Checkbox
                    label="Mark As Delivered"
                    onChange={deliverHandler}
                  />
                )}
            </div>
            <div className="order-edit-body-right col-8 col-md-11 col-sm-12">
              <div className="productInfo-wrapper">
                {order.orderItems.map((item, index) => (
                  <div className="productInfo-wrapper_item" key={index}>
                    <div className="left col-4">
                      <div className="productInfo-wrapper_item_img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="productInfo-wrapper_item_title">
                        <span className="title">{item.name}</span>
                        <span className="quantity">Quantity: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="right col-4">
                      <div className="productInfo-wrapper_item_discount">
                        <span className="title">Discount: </span>
                        <span className="value">{item.discount * 100}%</span>
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
            </div>
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default OrderEdit;
