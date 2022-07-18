import React, { useRef } from "react";
import './filterProducts.scss';
import { Link } from "react-router-dom";

const FilterProducts = () => {
  const filterButton = useRef(null);

  const handleFilterButton = () => {
    filterButton.current.classList.toggle("active");
  };

  return (
    <div className="products-wrapper_filter">
        <ul
              className="products-wrapper_filter_container"
              ref={filterButton}
              onClick={handleFilterButton}
            >
              <li
                className={`products-wrapper_filter_container_item`}
              >
                <Link to={`/category/sort/1`}>Sort by price: ascending</Link>
              </li>
              <li
                className="products-wrapper_filter_container_item"
              >
                <Link to={`/category/sort/-1`}>Sort by price: descending</Link>
              </li>
              <li
                className="products-wrapper_filter_container_item"
              >
                <Link to={`/category/filter/${`Tom Ford`}`}>Branch: Tom Ford</Link>
              </li>
              <li
                className="products-wrapper_filter_container_item"
              >
                <Link to={`/category/filter/${`Loubotin`}`}>Branch: Loubotin</Link>
              </li>
              <li
                className="products-wrapper_filter_container_item"
              >
                <Link to={`/category/filter/${`Dior`}`}>Branch: Dior</Link>
              </li>
              <li
                className="products-wrapper_filter_container_item"
              >
                <Link to={`/category/filter/${`Gucci`}`}>Branch: Gucci</Link>
              </li>
            </ul>
    </div>
  );
};

export default FilterProducts;
