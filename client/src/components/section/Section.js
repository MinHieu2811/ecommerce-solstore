import React, { useEffect } from "react";
import "./section.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { randomProducts } from "../../actions/productActions.js";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { ToastContainer, toast } from "react-toastify";
import { ADD_TO_FAVOR_RESET } from "../../constants/favorConstants.js";
import { addToFavorList } from "../../actions/favorActions.js";
import Loader from "../Loader/Loader";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

SwiperCore.use([Navigation, Autoplay]);

const Section = ({ title }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randomProducts(6));
  }, [dispatch]);

  const randomProductList = useSelector((state) => state.randomProductList);
  const { products } = randomProductList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToWishListHandler = (productId) => {
    if (userInfo) {
      dispatch(addToFavorList(productId));
    } else {
      toast.error("Please login to add to wishlist");
    }
  };

  const addToWishList = useSelector((state) => state.addToWishList);
  const {
    success,
    loading: loadingWishList,
    error: errorWishList,
  } = addToWishList;

  useEffect(() => {
    if (success) {
      toast.success("Added to wishlist");
      dispatch({ type: ADD_TO_FAVOR_RESET });
    } else {
      toast.error(errorWishList);
    }
  }, [success, toast, dispatch]);

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [inView, control]);

  return loadingWishList ? (
    <Loader />
  ) : errorWishList ? (
    <div>{errorWishList}</div>
  ) : (
    <motion.section className="section-wrapper" 
    ref={ref}
                initial="hidden"
                animate={control}
                variants={{
                  visible: {
                    opacity: 1,
                    translateX: 0,
                    transition: { duration: 0.3, delay: 0.3 },
                  },
                  hidden: { opacity: 0, translateX: -100 },
                }}>
      <ToastContainer />
      <h1 className="title">{title}</h1>
      <Swiper
        breakpoints={{
          375: { width: 375, slidesPerView: 1 },
          768: { width: 768, slidesPerView: 2 },
        }}
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation]}
        pagination={{ clickable: true }}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <>
              <div
                className="slider-container_item"
              >
                <div className="slider-container_item_img">
                  <img src={product.image1} alt="" className={`img `} />
                  <img src={product.image2} alt={product.name} />
                  <div className="slider-overlay"></div>
                </div>

                <div className="slider-container_item_info">
                  <div className="slider-container_item_info_branch">
                    <span>{product.brand}</span>
                  </div>
                  <div className="slider-container_item_info_title">
                    <h3>{product.name}</h3>
                  </div>
                  <div className="slider-container_item_info_price">
                    <span className="price">${product.price}</span>
                  </div>
                </div>

                <div className="slider-container_item_btn_container">
                  <div className="slider-container_item_btn_container_item">
                    <Link
                      to={`category/${product._id}`}
                      style={{ height: "100%" }}
                    >
                      <div className="btn-view-detail btn">View detail</div>
                    </Link>
                    <div
                      className="btn-add-cart btn"
                      onClick={() => addToWishListHandler(product._id)}
                    >
                      add to wishlist
                    </div>
                  </div>
                </div>
              </div>
            </>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default Section;
