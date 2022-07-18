import React, { useEffect } from "react";
import "./userlist.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { listUsers, deleteUser } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, loading: loadingDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  useEffect(() => {
    if (successDelete) {
      toast.info("User deleted successfully");
    }
  }, [successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  return loading || loadingDelete ? (
    <Loader />
  ) : error ? (
    toast.error(error)
  ) : (
    <Helmet title="User List">
      <ToastContainer />
      <div className="user-list">
        <h1>Users List</h1>
        <table className="table-container">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ID</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="bx bx-check"
                      style={{ color: "green", fontSize: "1.5rem" }}
                    ></i>
                  ) : (
                    <i
                      className="bx bx-x"
                      style={{ color: "red", fontSize: "1.5rem" }}
                    ></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="btn-link">
                      <i
                        className="bx bxs-edit"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className="btn-link"
                  >
                    <i
                      className="bx bxs-trash"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Helmet>
  );
};

export default UserList;
