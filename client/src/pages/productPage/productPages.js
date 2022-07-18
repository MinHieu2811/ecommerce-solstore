import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../../actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import { createProductReview } from "../../actions/productActions";
import "./productPages.scss";
import Loader from "../../components/Loader/Loader";
import Helmet from "../../components/Helmet";
import Rating from "../../components/rating/Rating";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import { addToFavorList } from "../../actions/favorActions";
import { transition1, imageVariants, backVariants } from "../../components/Animation";
import { ADD_TO_FAVOR_RESET } from "../../constants/favorConstants";

const ProductPages = () => {
  const dispatch = useDispatch();

  const expandRef = useRef(null);

  const navigate = useNavigate();

  const ratingRef = useRef(null);
  const commentRef = useRef(null);
  const quantityRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {loading: loadingReview, success: successProductReview, error: errorProductReview } =
    productCreateReview;

  const addToWishList = useSelector(state => state.addToWishList);
  const { success, loading: loadingWishList, error: errorWishList } = addToWishList;

  const handleExpand = () => {
    expandRef.current.classList.toggle("expand");
  };

  const addToCartHandler = () => {
    if(product.countInStock === 0){
      toast.error("This product is out of stock");
      return;
    }else if(userInfo === null){
      toast.error("Please login to add to cart");
      return;
    }else {
      navigate(
        `/cart/${window.location.pathname.split("/")[2]}?qty=${
          quantityRef.current.value
        }`
      );
    }
  };

  const addToWishlistHandler = (id) => {
    if (userInfo) {
      dispatch(addToFavorList(id));
    } else {
      toast.error("Please login to add to wishlist");
    }
  };

  useEffect(() => {
    if (successProductReview) {
      toast.success("Review submitted");
      ratingRef.current.value = 1;
      commentRef.current.value = "";
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getSingleProduct(window.location.pathname.split("/")[2]));
  }, [dispatch, successProductReview]);

  useEffect(() => {
    if(success){
      toast.success('Added to wishlist');
      dispatch({ type: ADD_TO_FAVOR_RESET });
    }else{
      toast.error(errorWishList);
    }
  }, [success, toast, dispatch])

  const quantityHandler = useCallback(async (e) => {
    e.preventDefault();
  });

  const transformDate = (date) => {
    return date.split('-').reverse().join('/');
  }

  const handleSubmitComment = useCallback(
    async (e) => {
      e.preventDefault();
      if (ratingRef.current.value === "") {
        toast.error("Please rate the product");
        return;
      } else if (commentRef.current.value === "") {
        toast.error("Please write a comment");
        return;
      } else {
        dispatch(
          createProductReview(window.location.pathname.split("/")[2], {
            rating: ratingRef.current.value,
            comment: commentRef.current.value,
          })
        );
      }
    },
    [dispatch, ratingRef, commentRef, window.location.pathname.split("/")[2]]
  );

  const handleBack = () => {
    navigate(-1);
  }

  return loading || loadingReview ? (
    <Loader />
  ) : error || errorProductReview || errorWishList ? (
    <h1>{error|| errorProductReview || errorWishList}</h1>
  ) : (
    <Helmet title={`${product.name}`}>
      <motion.div className="product-info-wrapper" style={{minHeight: '80vh'}}>
        <ToastContainer />
        <div className="product-info-wrapper_img_container col-7 col-md-10 col-sm-11">
          <div className="navigate-back" onClick={handleBack}>
          <i className='bx bx-left-arrow-alt'></i> Back
          </div>
          <motion.div className="product-info-wrapper_img_container_main" initial="exit" transition={transition1} variants={imageVariants}  animate="enter" exit="exit">
            <motion.img src={product.image1} className="pic1" alt={product.name}/>
            <img src={product.image2} className="pic2" alt={product.name} />
          </motion.div>
          <div className={`product-description`} ref={expandRef}>
            <div className="product-description_title">Product details</div>
            <div
              className="product-description_content"
              dangerouslySetInnerHTML={{
                __html:
                  product.name +
                  " " +
                  product.description +
                  product.description,
              }}
            ></div>
            <div
              className="product-description_toggle"
              onClick={() => handleExpand()}
            >
              <button>Expand</button>
            </div>
          </div>

          <div className="product-review" style={{ marginTop: "50px" }}>
            <div className="product-review_title">Reviews</div>
            {product.reviews.length === 0 ? (
              <h2 style={{ marginBottom: "50px" }}>No reviews yet</h2>
            ) : (
              product.reviews.map((review) => (
                <div className="product-review_content" key={review._id}>
                  <div className="product-review_content_title">
                    <div className="product-review_content_title_user">
                      <span className="avatar">
                        {review.name.toString().substring(0, 1)}
                      </span>
                      {review.name}
                    </div>
                    <div className="product-review_content_title_time">
                      {transformDate(review.createdAt.substring(0, 10))}
                    </div>
                  </div>
                  <div className="product-review_content_rating">
                    <Rating value={review.rating} />
                  </div>
                  <div className="product-review_content_comment">
                    {review.comment}
                  </div>
                </div>
              ))
            )}
            <div className="product-review_form">
              {userInfo ? (
                <form>
                  <div className="product-review_content_rating">
                    <select name="rating" ref={ratingRef}>
                      <option value="">Select...</option>
                      <option value="1">1 - Very Bad</option>
                      <option value="2">2 - Bad</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="product-review_content_comment">
                    <textarea
                      name="comment"
                      ref={commentRef}
                      placeholder="Comment"
                    ></textarea>
                  </div>
                  <button type="submit" onClick={handleSubmitComment}>
                    Submit
                  </button>
                </form>
              ) : (
                <h2>
                  <Link to="/login">Login</Link> to review
                </h2>
              )}
            </div>
          </div>
        </div>
        <motion.div className="product-info-wrapper_info col-5 col-md-10 col-sm-11" variants={backVariants} initial="exit" animate="enter" exit="exit">
          <div className="product-info-wrapper_info_name">
            <h1 className="name">{product.name}</h1>
          </div>
          <div className="product-info-wrapper_info_branch">
            <span className="branch">{product.brand}</span>
          </div>
          <div className="product-info-wrapper_info_price">
            <span className="price">Price: ${product.price}</span>
          </div>
          <div className="product-info-wrapper_info_rating">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
          <div className="product-info-wrapper_info_quantity">
            <form className="product-info-wrapper_info_quantity_form">
              <span className="product-info-wrapper_info_quantity_form_title">
                Quantity:{" "}
              </span>
              {product.countInStock > 0 ? (
                <select
                  className="product-info-wrapper_info_quantity_select"
                  ref={quantityRef}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1} onClick={quantityHandler}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="product-info-wrapper_info_quantity_form_title">
                  Out of stock
                </span>
              )}
            </form>
          </div>
          <div className="product-info-wrapper_info_btn">
            <button
              className="btn"
              onClick={() => addToCartHandler()}
              style={{ marginRight: "10px" }}
            >
              add to cart
            </button>
            <button
              className="btn"
              onClick={() => addToWishlistHandler(product._id)}
            >
              add to wishlist
            </button>
          </div>
        </motion.div>
      </motion.div>
    </Helmet>
  );
};

export default ProductPages;
