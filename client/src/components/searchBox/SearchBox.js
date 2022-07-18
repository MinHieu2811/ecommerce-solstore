import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBox.scss';
import { ToastContainer } from 'react-toastify';

const SearchBox = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/category/search/${keyword}`);
        } else {
            // toast.info('Check your keywords');
            navigate('/category');
        }
    };

  return (
    <div className='searchBox-wrapper'>
        <ToastContainer />
        <form onSubmit={submitHandler} >
            <input type='text' className='searchBox-wrapper_input' placeholder='Search...' onChange={(e) => setKeyword(e.target.value)}/>
            <span className='line'></span>
            <button type='submit' className='searchBox-wrapper_button'>
                <i className='bx bx-search-alt-2'></i>
            </button>
        </form>
    </div>
  )
}

export default SearchBox