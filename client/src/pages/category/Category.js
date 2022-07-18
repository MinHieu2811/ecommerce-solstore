import React, { useEffect } from 'react';
import './category.scss';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '../../components/Helmet'
import SearchBox from '../../components/searchBox/SearchBox'
import FilterProducts from '../../components/filterProducts/FilterProducts';
import { getProducts } from '../../actions/productActions';
import Grid from '../../components/Grid';
import ProductCard from '../../components/productCard/productCard';
import Paginate from '../../components/Paginate/Paginate';
import { useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { ADD_TO_FAVOR_RESET } from '../../constants/favorConstants';
import { motion } from 'framer-motion';
import { gridAnimation } from '../../components/Animation.js'

const Category = () => {

  const dispatch = useDispatch();

  const search = useParams();

  const productList = useSelector(state => state.productList);
  const { products, loading, error, pages, page } = productList;

  const addToWishList = useSelector(state => state.addToWishList);
  const { success, loading: loadingWishList} = addToWishList;

  useEffect(() => {
    if(success){
      toast.success('Added to wishlist');
      dispatch({ type: ADD_TO_FAVOR_RESET });
    }
  }, [success, dispatch, error])

  useEffect(() => {
    dispatch(getProducts(search.keyword, search.pageNumber, search.filter, search.sorting));
  }, [dispatch, search.keyword, search.pageNumber, search.filter, search.sorting, success]);

  return (
    <Helmet title="Category">
      <ToastContainer />
      {
        ( loading || loadingWishList ) && <Loader />
      }
      <div className='category-wrapper'>
        <div className='category-header'>
          <div className='category-header_left'>
            <div className='category-header_left_title'>All Products</div>
          </div>
          <div className='category-header_center'>
            <SearchBox />
          </div>
          <div className='category-header_right'>
            <FilterProducts />
          </div>
        </div>
        <motion.div 
        className='category-content'
        initial="initial"
        animate="enter"
        exit="exit"
        style={{minHeight: '80vh'}}
        variants={gridAnimation}
         >
          {error ? ( <h1>{error}</h1>) : (
            <Grid col={3} mdCol={2} smCol={1} gap={20}>
            {
              products.map((product, index) => (
                <ProductCard key={product._id} delay={index} product={product}/>
              ))
            }
          </Grid>
          )}
        </motion.div>
        <div className='category-paginate'>
            <Paginate totalPage={pages} currentPage={page}/>
        </div>
      </div>
    </Helmet>
  )
}

export default Category