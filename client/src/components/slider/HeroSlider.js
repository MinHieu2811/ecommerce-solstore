import React, { useEffect } from "react";
import { randomProducts } from "../../actions/productActions";
import "./heroSlider.scss";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(randomProducts());
  }, [dispatch]);

  const randomProductList = useSelector((state) => state.randomProductList);
  const { loading, products } = randomProductList;

  return loading ? (
    <Loader />
  ) : (
    <div className="heroslider">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        className="heroslider-wrapper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            {({ isActive }) => (
              <div className="heroslider-wrapper_item">
                <div className="heroslider-wrapper_item_info col-4 col-md-12 col-sm-12">
                  <div className="heroslider-wrapper_item_info_wrapper">
                    <div className="heroslider-wrapper_item_info_name">
                      {isActive && (
                        <motion.h1
                        initial="hidden"
                        animate={isActive ? 'visible': 'hidden'}
                        variants={{ visible: { opacity: 1, translateX: 0, transition: { duration: 0.3, delay: 0.3 } },
                        hidden: { opacity: 0, translateX: -100 } 	
                      }}
                          className={`bottom-3 delay-3 ${
                            isActive ? "active" : ""
                          }`}
                        >
                          {product.name}
                        </motion.h1>
                      )}
                    </div>
                    <div className="heroslider-wrapper_item_info_brand">
                      {isActive && (
                        <motion.p
                        initial="hidden"
                        animate={isActive ? 'visible': 'hidden'}
                        variants={{ visible: { opacity: 1, translateY: 0, transition: { duration: 0.3, delay: 0.4 } },
                        hidden: { opacity: 0, translateY: -100 } }}
                          className={`bottom-2 delay-2 ${
                            isActive ? "active" : ""
                          }`}
                        >
                          {product.brand}
                        </motion.p>
                      )}
                    </div>
                    <div className="heroslider-wrapper_item_info_btn">
                      {isActive && (
                        <motion.button
                        initial="hidden"
                        animate={isActive ? 'visible': 'hidden'}
                        variants={{ visible: { opacity: 1, translateY: 0, transition: { duration: 0.3, delay: 0.5 } },
                        hidden: { opacity: 0, translateY: -100 } }}
                          className={`btn bottom-1 delay-1 ${
                            isActive ? "active" : ""
                          }`}
                        >
                          <Link to={`/category/${product._id}`}>
                          Shop now
                          </Link>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="heroslider-wrapper_item_img col-8  col-md-12 col-sm-12">
                  <div className="heroslider-wrapper_item_img_wrapper">
                    {isActive && (
                      <motion.img
                        src={product.image1}
                        alt=""
                        className={`slider-img-wrapper_item bottom-3 delay-3 ${
                          isActive ? "active" : ""
                        }`}

                        initial="hidden"
                        animate={isActive ? 'visible': 'hidden'}
                        variants={{ visible: { opacity: 1, rotate: -45, rotate: 0, transition: { duration: 0.3, delay: 0.3 } },
                        hidden: { opacity: 0, rotate: 45 } }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
