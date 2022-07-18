import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import "./header.scss";
import jwt_decode from "jwt-decode";

const Header = () => {
  const headerRef = useRef(null);

  const userMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlerUserMenu = () => {
    userMenuRef.current.classList.toggle("show");
  };

  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
      setIsAdmin(userInfo.isAdmin);
    } else {
      setIsLogin(false);
      setIsAdmin(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (isLogin) {
      const decodedToken = jwt_decode(userInfo.token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }
  }, [isLogin]);

  const mainNav = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "category",
      path: "/category",
    },
    {
      display: "wishlist",
      path: "/wishlist",
    },
    {
      display: "blog",
      path: "/blog",
    },
    {
      display: "contact",
      path: "/contact",
    },
  ];

  const { pathname } = useLocation();
  const navActive = mainNav.findIndex(
    (e) => e.path.split("/")[1] === pathname.split("/")[1]
  );

  return (
    <div className="main-nav" ref={headerRef}>
      <div className="main-nav_left">
        <h1>
          <span className="red">Sol</span>Store
        </h1>
      </div>
      <div className="main-nav_center">
        <ul className="main-nav_center_container">
          {mainNav.map((item, index) => (
            <li
              className={`main-nav_center_container_item ${
                index === navActive ? "active" : ""
              }`}
              key={index}
            >
              <Link to={item.path}>{item.display}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-nav_right">
        <div className="main-nav_right_item">
          <span className="main-nav_right_item_qty">
              {
                userInfo && cartItems.length ? cartItems.length : 0
              }
          </span>
          <Link to="cart">
            <i className="bx bx-cart-alt"></i>
          </Link>
        </div>
        <div
          className="main-nav_right_item login-box"
          onClick={handlerUserMenu}
        >
          <>
            {userInfo ? (
              <span className="user-name">
                {userInfo.name.toString().substring(0, 1)}
              </span>
            ) : (
              <i className="bx bx-user"></i>
            )}
          </>
          <div className="signin_box" ref={userMenuRef}>
            {isLogin ? (
              <div className="signin_box_container">
                <div className="signin_box_container_item">
                  <Link to="/profile">Profile</Link>
                </div>
                <>
                  {isAdmin ? (
                    <>
                      <div className="signin_box_container_item">
                        <Link to="/admin/userlist">Users</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/productlist">Products</Link>
                      </div>
                      <div className="signin_box_container_item">
                        <Link to="/admin/orderlist">Orders</Link>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
                <div
                  className="signin_box_container_item"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="signin_box_container">
                <div className="signin_box_container_item">
                  <Link to="/login">Sign In</Link>
                </div>
                <div className="signin_box_container_item">
                  <Link to="/register">Sign Up</Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="main-nav_right_item">
          <i className="bx bx-menu-alt-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
