import React from "react";
import "./paginate.scss";
import { Link } from "react-router-dom";

const Paginate = ({
  totalPage,
  currentPage,
  isAdmin = false,
  keyword = "",
}) => {
  return (
    totalPage > 1 && (
      <div className="paginate-wrapper">
          <Link to={!isAdmin ? 
          keyword 
          ? `/category/search/${keyword}/page/${currentPage - 1 === 0 ? 1 : currentPage - 1}` 
          : `/category/page/${currentPage - 1 === 0 ? 1 : currentPage - 1}` 
          : `/admin/productlist/${currentPage - 1 === 0 ? 1 : currentPage - 1}`}
          className='paginate-wrapper_link'>
              <i className='bx bx-chevron-left'></i>
          </Link>
          {[...Array(totalPage).keys()].map((x) => (
              <Link
                key={x + 1}
                to={ !isAdmin ? keyword ?
                    `/category/search/${keyword}/page/${x + 1}` :
                    `/category/page/${x + 1}` :
                    `/admin/productlist/${x + 1}`
                }
                className={`paginate-wrapper_link ${currentPage === x + 1 ? "active" : ""}`}
              >
                  {x + 1}
              </Link>
          ))}
          <Link to={!isAdmin ? 
          keyword 
          ? `/category/search/${keyword}/page/${currentPage + 1 > totalPage ? totalPage : currentPage + 1}` 
          : `/category/page/${currentPage + 1 > totalPage ? totalPage : currentPage + 1}` 
          : `/admin/productlist/${currentPage + 1 > totalPage ? totalPage : currentPage + 1}`}
          className='paginate-wrapper_link'>
              <i className='bx bx-chevron-right'></i>
          </Link>
      </div>
    )
  );
};

export default Paginate;
