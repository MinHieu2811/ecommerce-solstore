import React, { useState, useEffect } from "react";
import './profile.scss';
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../../components/Helmet";
import { useNavigate } from "react-router";
import { getUserDetails, updateUserDetails } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { listMyOrders } from "../../actions/orderActions";
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
    }else{
      toast.error("Profile not updated");
    }
  }, [success])

  return (
    <Helmet title="Profile">
      {loading || loadingOrders ? (
        <Loader />
      ) : error || errorOrders ? (
        <div>{error || errorOrders}</div>
      ) : (
        <div className="container">
          <ToastContainer />
          <div className="user-info-wrapper col-6 col-md-12 col-sm-12">
            <h1 className="user-info-title">Profile</h1>
            <form className="user-info-form" onSubmit={submitHandler}>
              <div className="user-info-form_item col-8 col-md-12 col-sm-12">
                <input
                  className="user-info-form_item_input"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="user-info-form_item col-8 col-md-12 col-sm-12">
                <input
                  className="user-info-form_item_input"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="user-info-form_item col-8 col-md-12 col-sm-12">
                <input
                  className="user-info-form_item_input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="user-info-form_item col-8 col-md-12 col-sm-12">
                <input
                  className="user-info-form_item_input"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="user-info-form_item">
                <button type="submit" className="user-info-form_item_btn">
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="user-cart-wrapper col-6 col-md-12 col-sm-12">
            <h1 className="user-cart-title">My orders</h1>
            <table className="user-cart-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="bx bx-x" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="bx bx-x" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                          Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Helmet>
  );
};

export default Profile;
