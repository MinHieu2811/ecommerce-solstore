import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import CartItem from "./CartItems";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { useLocation, useParams, useNavigate } from "react-router";
import { addToCart } from "../../actions/cartActions";
import { motion } from "framer-motion";

const Cart = () => {
  const productId = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const productInfo = useLocation();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success: successOrderCreate } = orderCreate;

  console.log(successOrderCreate)

  useEffect(() => {
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * ( Number(item.price) - (Number(item.price) * Number(item.discount))),
        0
      )
    );
  }, [cartItems]);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId.id, productInfo.search.split("=")[1]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productId.id, productInfo.search.split("=")[1]]);

  const handleBack = () => {
    navigate(-1)
  }

  return (
    userInfo ? (
      <Helmet title="Cart">
      <div className="cart">
        <div style={{ marginTop: '2rem'}}>
          <motion.div 
          className="navigate-back" 
          onClick={handleBack}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { opacity: 1, translateX: 0, transition: { duration: 0.3 } },
            hidden: { opacity: 0, translateX: -100, transition: { duration: 0.3 } }
          }}>
            <i className='bx bx-left-arrow-alt'></i> Back
          </motion.div>
        <motion.div className="cart_info"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, translateX: 0, transition: { duration: 0.3 } },
            hidden: { opacity: 0, translateX: -100, transition: { duration: 0.3 } }
        }}>
          
          <div className="cart_info_text">
            <p>You have {totalProducts} in your cart</p>
            <div className="cart_info_txt_price">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="cart_info_btn">
            <Link to="/checkout">
              <button className="btn-cart">Checkout</button>
            </Link>
            <Link to="/category">
              <button className="btn-cart">Continue shopping</button>
            </Link>
          </div>
        </motion.div>
        </div>
        <div className="cart_list">
          {cartItems.map((item, index) => (
            <CartItem cartInfo={item} key={index} delay={index} />
          ))}
        </div>
      </div>
    </Helmet>
    ) : (
      <Helmet title="Cart">
        <div className="cart" style={{ marginTop: '120px', display: 'flex', flexDirection: 'column'}}>
          <h2>Please sign in before shopping !!!</h2>
          <Link to="/login" style={{marginTop: '20px', fontSize: '2rem'}}>Login</Link>
        </div>
      </Helmet>
    )
  );
};

export default Cart;
