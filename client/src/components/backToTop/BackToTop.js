import React, { useState } from 'react';
import './backToTop.scss';

const BackToTop = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        if(scrolled > 300){
            setVisible(true)
        }else if(scrolled <= 300){
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

  return (
    <div className={`back-to-top-btn ${visible === true ? 'active' : ''}`} onClick={scrollToTop}>
        <i className='bx bxs-upvote'></i>
    </div>
  )
}

export default BackToTop