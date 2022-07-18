import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../components/checkbox/CheckBox";
import Helmet from "../../components/Helmet";
import Loader from "../../components/Loader/Loader";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import { getUserDetails } from "../../actions/userActions";
import { updateUser } from "../../actions/userActions";
import "./userEdit.scss";

const UserEdit = () => {
  const userId = useParams().id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Helmet title="Edit User">
      <div className="user-edit-wrapper" style={{ marginTop: "120px" }}>
        {loading || loadingUpdate ? (
          <Loader />
        ) : error ? (
          <div>{error || errorUpdate}</div>
        ) : (
          <div className="user-edit-container">
            <h1>User Edit</h1>
            <form onSubmit={submitHandler} className="form-group">
              <div className="form-group_item">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="form-group_item">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
              <div className="form-group_checkbox">
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="checkbox"
                />
                <label htmlFor="isAdmin">Is Admin</label>
              </div>
              <button type="submit" className="btn-link">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </Helmet>
  );
};

export default UserEdit;
