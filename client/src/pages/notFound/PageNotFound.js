import React from "react";
import "./pageNotFound.scss";
import { useNavigate } from "react-router-dom";
import Helmet from "../../components/Helmet";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Helmet title="Not Found">
      <div className="page-not-found-wrapper">
        <h1 className="page-not-found-wrapper_number">404</h1>
        <h1 className="page-not-found-wrapper_title">Page not found</h1>
        <button onClick={handleClick}>Back</button>
      </div>
    </Helmet>
  );
};

export default PageNotFound;
