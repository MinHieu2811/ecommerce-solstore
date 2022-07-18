import React from "react";
import "./cart.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { motion } from "framer-motion";

const CartItem = ({ cartInfo, delay }) => {
  const dispatch = useDispatch();

  console.log(cartInfo);

  const cartRemoveHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQuantity = (e) => {
    e.preventDefault();
    dispatch(addToCart(cartInfo.product, Number(e.target.value)))
  }

  return (
    <motion.div className="cart_item" style={{ marginTop: "80px" }} initial="hidden" animate="visible" variants={{
      visible: { opacity: 1, translateY: 0, transition: { duration: 0.3, delay: delay*0.2 } },
      hidden: { opacity: 0, translateY: 100, transition: { duration: 0.3, delay: delay*0.2 } }}}>
      <div className="cart_item_image">
        <img src={cartInfo.image} alt="" />
      </div>
      <div className="cart_item_info">
        <div className="cart_item_info_name">
          <Link to={`/category/${cartInfo.product}`}>{`${cartInfo.name}`}</Link>
        </div>
        <div className="cart_item_info_price">
          ${Number(cartInfo.price).toFixed(2)}
        </div>
        <div className="cart_item_info_discount">
            Discount: {cartInfo.discount*100}%
        </div>
        <div className="cart_item_info_quantity">
          <div className="product_info_item_quantity">
            {
              <select
                className="product-info-wrapper_info_quantity_select"
                value={cartInfo.quantity}
                onChange={updateQuantity}
              >
                {[...Array(cartInfo.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            }
          </div>
        </div>
        <div
          className="cart_item_info_del"
          onClick={() => cartRemoveHandler(cartInfo.product)}
        >
          <i className="bx bx-trash"></i>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
