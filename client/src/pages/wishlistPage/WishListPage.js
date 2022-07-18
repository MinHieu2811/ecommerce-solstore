import React, { useEffect } from "react";
import "./wishlistPage.scss";
import { getFavorList } from "../../actions/favorActions.js";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "../../components/Helmet";
import Grid from "../../components/Grid";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/productCard/productCard.js";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const WishListPage = () => {
  const dispatch = useDispatch();

  const myWishList = useSelector((state) => state.myWishList);
  const { loading, error, wishList } = myWishList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteFromWishList = useSelector((state) => state.deleteFromWishList);
  const { loading: loadingDelete, success } = deleteFromWishList;

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(getFavorList());
    }
  }, [userInfo, dispatch, success]);

  return (
    <Helmet title="Wishlist">
      {(loading || loadingDelete) && <Loader />}
      {error ? (
        <div style={{ margin: "120px 100px 100px 100px", fontSize: "2rem" }}>
          {error}
        </div>
      ) : userInfo ? (
        <div className="wishlist-wrapper">
          <ToastContainer />
          <div className="wishlist-container">
            <div className="wishlist-header">
              <h1>My Wishlist</h1>
            </div>
            <div className="wishlist-body">
              {(userInfo === null || (userInfo && wishList.length !== 0)) && (
                <Grid col={3} mdCol={2} smCol={1} gap={20}>
                  {userInfo && wishList[0].favorItems.length === 0 ? (
                    <div style={{ fontSize: "2.5rem" }}>
                      Your wishlist is empty !!!{" "}
                    </div>
                  ) : (
                    <>
                      {wishList &&
                        wishList[0].favorItems.map((item) => (
                          <ProductCard
                            key={item._id}
                            link={item.id}
                            product={item}
                            isMarked={item.isMarked}
                          />
                        ))}
                    </>
                  )}
                </Grid>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: "2.5rem", margin: "100px" }}>
          Please{" "}
          <Link to="/login" style={{ color: "#c93429" }}>
            login
          </Link>{" "}
          to see your wishlist
        </div>
      )}
    </Helmet>
  );
};

export default WishListPage;


// : (
//   <div style={{ fontSize: "2.5rem", margin: "100px" }}>
//     Please{" "}
//     <Link to="/login" style={{ color: "#c93429" }}>
//       login
//     </Link>{" "}
//     to see your wishlist
//   </div>
//   <></>
// )