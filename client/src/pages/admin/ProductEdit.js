import React, {useState, useEffect} from 'react';
import './productEdit.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Helmet from '../../components/Helmet';
import { useNavigate } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../../actions/productActions';
import axios from 'axios';

const ProductEdit = () => {
    const productId = useParams().id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [discount, setDiscount] = useState(0);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [brand, setBrand] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      navigate("/admin/productlist");
    }
    if (!product.name || product._id !== productId) {
      dispatch(getSingleProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage1(product.image1);
      setImage2(product.image2);
      setDiscount(product.discount);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setRating(product.rating);
      setBrand(product.brand);
    }
  }, [product, dispatch, productId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image1,
        image2,
        discount,
        category,
        description,
        countInStock,
        rating,
        brand,
        numReviews: product.numReviews,
      })
    );
  };

  const uploadFirstImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage1(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const uploadSecondImageHandler = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage2(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <Helmet title='Edit Product'>
        {
            loading || loadingUpdate ? (<Loader />) : error || errorUpdate ? (<div>{error}</div>) : (
                <form onSubmit={submitHandler} className='form-group'>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} className='input' />
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='price'>Price</label>
                        <input type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} className='input' />
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='image'>Image 1</label>
                        <input type='text' placeholder='Enter image url' value={image1} onChange={(e) => setImage1(e.target.value)} className='input' />
                        <input type='file' id='files' name='files' multiple='multiple' accept='image/jpeg, image/png, image/jpg' onChange={uploadFirstImageHandler} className='image-input' />
                        <output id="results"></output>
                        {uploading && <Loader />}
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='image'>Image 2</label>
                        <input type='text' placeholder='Enter image url' value={image2} onChange={(e) => setImage2(e.target.value)} className='input' />
                        <input type='file' id='files' name='files' multiple='multiple' accept='image/jpeg, image/png, image/jpg' onChange={uploadSecondImageHandler} className='image-input' />
                        <output id="results"></output>
                        {uploading && <Loader />}
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='discount'>Discount</label>
                        <input type='number' placeholder='Enter Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} className='input' />
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='brand'>Brand</label>
                        <input type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} className='input' />
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='countInStock'>Count In Stock</label>
                        <input type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className='input' />
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='discription'>Description</label>
                        <input type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} className='input' />
                    </div>
                    <div className='form-group_item col-6 col-md-11 col-sm 12'>
                        <label htmlFor='rating'>Rating</label>
                        <input type='number' placeholder='Enter Rating' value={rating} onChange={(e) => setRating(e.target.value)} className='input' />
                    </div>
                    <button type='submit' className='btn-submit'>
                        Update
                    </button>
                </form>
            )
        }
    </Helmet>
  )
}

export default ProductEdit