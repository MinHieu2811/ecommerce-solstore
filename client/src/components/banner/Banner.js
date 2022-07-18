import React, { useEffect } from "react";
import "./banner.scss";
import banner_left from "../../assets/images/banner/banner5.jpg";
import banner_right from "../../assets/images/banner/banner7.jpg";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Banner = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
      console.log("inView");
    }
  }, [inView, control]);
  return (
    <div>
      <div className="banner-wrapper">
        <motion.div
          className="banner-wrapper_left"
          initial="hidden"
          animate={control}
          ref={ref}
          variants={{
            visible: { opacity: 1, transition: { duration: 0.4 } },
            hidden: { opacity: 0.2 },
          }}
        >
          <div
            className="banner-wrapper_left_img"
            style={{ backgroundImage: "url(" + banner_left + ")" }}
          ></div>
        </motion.div>
        <motion.div
          className="banner-wrapper_right"
          initial="hidden"
          animate={control}
          ref={ref}
          variants={{
            visible: { opacity: 1, transition: { duration: 0.4 } },
            hidden: { opacity: 0.2 },
          }}
        >
          <div className="banner-wrapper_right_info">
            <motion.span
              className="banner-wrapper_right_info_branch"
              initial="hidden"
              animate={control}
              ref={ref}
              variants={{
                visible: {
                  translateX: 0,
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.2 },
                },
                hidden: { translateX: -100, opacity: 0 },
              }}
            >
              spring collection
            </motion.span>
            <motion.h3
              className="banner-wrapper_right_info_title"
              initial="hidden"
              animate={control}
              ref={ref}
              variants={{
                visible: {
                  translateX: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.35 },
                },
                hidden: { translateX: -100, opacity: 0 },
              }}
            >
              changing <span className="red">the</span> ideal of{" "}
              <span className="red">beauty</span>
            </motion.h3>
            <motion.p className="banner-wrapper_right_info_desc"
            initial="hidden"
            animate={control}
            ref={ref}
            variants={{
              visible: {
                translateX: 0,
                opacity: 1,
                transition: { duration: 0.6, delay: 0.45 },
              },
              hidden: { translateX: -100, opacity: 0 },
            }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic enim
              temporibus reiciendis illo saepe possimus sunt dolor aperiam neque
              ipsum minima error exercitationem, nostrum excepturi!
            </motion.p>
            <button className="banner-wrapper_right_info_btn">
              <Link to="/category">Shop Now</Link>
            </button>
          </div>
          <div className="banner-wrapper_right_img">
            <img src={banner_right} alt="" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
