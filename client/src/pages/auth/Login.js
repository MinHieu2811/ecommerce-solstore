import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import bg from "../../assets/images/banner/banner9.jpg";
import "./signIn.scss";
import Helmet from "../../components/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login, resetPasswordEmail } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const [email, setEmail] = useState("123@gmail.com");
  const [password, setPassword] = useState("abc123@");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error: errorLogin, userInfo } = userLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      dispatch(login(email, password));
    } catch (error) {
      setError(error.message);
    }
  };

  const [visible, setVisible] = useState("password");

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

    const handleResetPass = () => {
      if(email){
        dispatch(resetPasswordEmail(email));
      }else{
        toast.error("Please enter your email");
      }
    }

  useEffect(() => {
    if (userInfo) {
      navigate(-1);
    }

    if (errorLogin) {
      toast.error(errorLogin);
    }
  }, [navigate, userInfo, redirect, errorLogin]);

  return loading ? (
    <Loader />
  ) : (
    <Helmet title="Sign In">
      <ToastContainer />
      <div
        className="sign-wrapper"
        style={{ backgroundImage: "url(" + bg + ")" }}
      >
        <div className="sign-container col-5 col-md-9 col-sm-10">
          <h1 className="title">Sign In</h1>
          <div className="sign-container_form">
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="sign-container_form_field">
                  <Field
                    type="email"
                    value={email}
                    name="email"
                    className="field"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="sign-container_form_error">
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="error"
                  />
                </div>
                <div className="sign-container_form_field password">
                  <div className="btn">
                    <i
                      className={`bx bxs-show btn_item ${
                        visible.match("password") ? "active" : ""
                      }`}
                      onClick={() => setVisible("text")}
                    ></i>
                    <i
                      className={`bx bxs-hide btn_item ${
                        visible.match("text") ? "active" : ""
                      }`}
                      onClick={() => setVisible("password")}
                    ></i>
                  </div>
                  <Field
                    type={`${visible}`}
                    name="password"
                    value={password}
                    className="field"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="sign-container_form_error">
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="error"
                  />
                </div>
                <div className="sign-container_form_span" onClick={handleResetPass}>
                  <span>Quên mật khẩu</span>
                  <span>
                    <Link to="/register">Tạo tài khoản</Link>
                  </span>
                </div>
                <div className="sign-container_form_btn">
                  <button
                    type="submit"
                    className="form-btn"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default SignIn;
