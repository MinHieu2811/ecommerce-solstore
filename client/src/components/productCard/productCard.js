import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./productCard2.scss";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { addToFavorList, deleteFavor } from "../../actions/favorActions";
import { ToastContainer } from "react-toastify";

const ProductCard = ({ product, isMarked, delay, link = null }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { _id, name, price, image1, image2, brand, id, countInStock } = product;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToWishListHandler = (productId) => {
    if (userInfo) {
      dispatch(addToFavorList(productId));
    }
  };

  const addToCart = (id) => {
    if (userInfo !== null && countInStock >= 1) {
      navigate(`/cart/${id}?qty=${1}`);
    }
  };

  const removeFromWishListHandler = (id) => {
    if (userInfo) {
      dispatch(deleteFavor(id));
    }
  };

  return (
    <motion.div
      className="productCart-wrapper"
      variants={{
        hidden: {
          opacity: 0,
          translateY: -100,
          transition: { duration: 0.3, delay: 0.1 * delay },
        },
        visible: {
          opacity: 1,
          translateY: 0,
          transition: { duration: 0.3, delay: 0.1 * delay },
        },
      }}
      initial="hidden"
      exit="exit"
      animate="visible"
    >
      <ToastContainer />
      <div className="productCart-wrapper_img">
        <img src={image1} alt={name} />
        <img src={image2} className="img" alt={name} />
      </div>
      <div className="productCart-wrapper_info">
        <span className="productCart-wrapper_info_branch">{brand}</span>
        <h3 className="productCart-wrapper_info_name">{name}</h3>
        <div className="productCart-wrapper_info_price">
          <span className="price">${price}</span>
        </div>
      </div>
      <div className="productCart-wrapper_action">
        <div className="productCart-wrapper_action_save action-wrapper">
          <div
            className={`productCart-wrapper_action_save_icon action-wrapper_icon delay-2`}
            onClick={() => addToWishListHandler(_id)}
          >
            <i className={`bx bxs-heart ${isMarked ? "active" : ""}`}></i>
          </div>
        </div>
        <div className="productCart-wrapper_action_add action-wrapper">
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-4">
            {link === null ? (
              <i className="bx bxs-cart-alt" onClick={() => addToCart(_id)}></i>
            ) : (
              <i
                className="bx bxs-cart-alt"
                onClick={() => addToCart(link)}
              ></i>
            )}
          </div>
        </div>
        <div className="productCart-wrapper_action_save action-wrapper">
          <div className="productCart-wrapper_action_save_icon action-wrapper_icon delay-6">
            {link === null ? (
              <Link to={`/category/${_id}`}>
                <i className="bx bxs-show"></i>
              </Link>
            ) : (
              <Link to={`/category/${link}`}>
                <i className="bx bxs-show"></i>
              </Link>
            )}
          </div>
        </div>
        <div
          className={`productCart-wrapper_action_add action-wrapper delete ${
            isMarked ? "active" : ""
          }`}
        >
          <div
            className="productCart-wrapper_action_save_icon action-wrapper_icon delay-8"
            onClick={() => removeFromWishListHandler(id)}
          >
            <i className="bx bxs-trash"></i>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
