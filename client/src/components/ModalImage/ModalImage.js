import React from 'react';
import './modalImage.scss';
import { motion } from 'framer-motion';

const ModalImage = ({ images, isShow = false, setShow }) => {

    const [currentImage, setCurrentImage] = React.useState(0);

    const handleNav = (opt) => {
        if(opt === '+'){
            setCurrentImage(currentImage + 1 > images.length - 1 ? 0 : currentImage + 1);
        }else{
            setCurrentImage(currentImage - 1 < 0 ? images.length - 1 : currentImage - 1);
        }
    }

  return (
    <motion.div className={`modal-image-wrapper ${isShow ? 'show' : ''}`} >
        <div className="modal-image-container">
            <div className="modal-image-container_image">
                <img src={`../../../${images[currentImage]}`} alt="preview" />
            </div>
            <div className="modal-image-container_thumbnail">
                {images.map((image, index) => (
                    <img key={index} src={`../../../${image}`} alt="preview" onClick={() => setCurrentImage(index)} />
                ))}
            </div>
            <div className="modal-image-container_close" onClick={() => setShow(false)}>
                <i className="bx bx-x"></i>
            </div>
            <div className="modal-image-container_nav">
                <div className='modal-image-container_nav_item' onClick={() => handleNav('-')}>
                    <i className="bx bx-chevron-left"></i>
                </div>
                <div className='modal-image-container_nav_item' onClick={() => handleNav('+')}>
                    <i className="bx bx-chevron-right"></i>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default ModalImage