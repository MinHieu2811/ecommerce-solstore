import React from 'react';
import Loader from './Loader/Loader';


const PreviewImages = ({id, label, fileHandler, images, isUploading}) => {

  return (
    <div className="blog-create-container_form_item">
      <label htmlFor={id} className='label-file'><i className='bx bx-upload'></i> {label}</label>
      <input type="file" id={id} name="image" multiple={true} onChange={fileHandler} />
      <div className='blog-create-container_form_item_image'>
        {isUploading ? <Loader /> : null}
        {
          images && !isUploading ? (
            images.map((image, index) => (
              <img key={index} src={`../../${image}`} alt="preview" />
            ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PreviewImages