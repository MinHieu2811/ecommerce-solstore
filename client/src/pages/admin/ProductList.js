/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate/Paginate";
import { deleteProduct, getProducts, createProduct } from "../../actions/productActions";
import Loader from "../../components/Loader/Loader";
import Helmet from "../../components/Helmet";
import './productList.scss';
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {success: successCreate, product: createdProduct } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getProducts(search.keyword, search.pageNumber, search.filter, search.sorting));
    }
  }, [userInfo, successDelete, search.keyword, search.pageNumber, search.filter, search.sorting, successCreate, createdProduct._id]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // Delete products
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return loading || loadingDelete ? (
    <Loader />
  ) : error || errorDelete ? (
    <h1>{error || errorDelete}</h1>
  ) : (
    <Helmet title="Product List">
      <div className="productlist-wrapper">
        <div className="productlist-header">
          <h1>Product List</h1>
          <button className="btn-create" onClick={createProductHandler}>Create product</button>
        </div>
        <div className="productlist-content">
          <table className="productlist-content_table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>ID</th>
                <th>PRICE</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="btn-link">
                        <i
                          className="bx bxs-edit"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                      </button>
                    </Link>
                    <button
                      className="btn-link"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i
                        className="bx bxs-trash"
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate totalPage={pages} currentPage={page} isAdmin/>
        </div>
      </div>
    </Helmet>
  );
};

export default ProductList;
