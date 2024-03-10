import React from 'react';
import axios from 'axios';
import { baseURL } from '../constants/alpha-env.constant'
export default function ImageUpload(props) {
  const handleImageAdded = async (e) => {
    const uploadFileList = [...e.target?.files];
    uploadFile(uploadFileList)
    e.target.value = '';
  };
  
  const uploadFile = async (imgs, sizes = true) => {
    const formData = new FormData();
    imgs.forEach(imgBlob => formData.append("file", imgBlob));
    try {
      const response = await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const uploadfiles = [...props.imageRender];
      if (Array.isArray(response.data)) {
        uploadfiles.push(...response.data);
      } else if (response.data) {
        uploadfiles.push(response.data);
      }
      
      props.setImageRender(uploadfiles);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  const handleAddImageClick = () => {
   document.getElementById('file_upload').click();
  };
  
  const handleRemoveImage = (index) =>{
    const tempImages = [...props.imageRender];
    tempImages.splice(index,1);
    props.setImageRender(tempImages);
  }
  
  return (
    <>
      <div className='border-primary position-relative' style={{minHeight:"157px"}}>
        {
            props.imageRender.length > 0 ? (
              <ul className='d-flex p-0 flex-wrap position-relative' style={{listStyleType:"none", zIndex:"1"}}>
                {props.imageRender.map((image, index) => (
                  <li key={index} className='m-3 position-relative text-break' style={{width: '150px'}}>
                    <span 
                      className='
                      position-absolute 
                      border text-center 
                      bg-white text-danger 
                      rounded-circle' 
                      style={{width:"25px",height:"25px",right:"-8px",fontSize:"14px",top:"-13px",cursor:"pointer"}}
                      onClick={handleRemoveImage}
                    >X</span>
                   <img
                    src={`${baseURL}/images/${image?.data?.filename}`}
                    alt={`Product thumbnail ${index}`} 
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderStyle: 'dashed' }}
                    className='img-thumbnail'
                  />
                    <span className='text-gray-500 float-left w-100' style={{fontSize:"12px", textOverflow:"ellipsis"}}>
                      {image?.data?.filename}
                    </span>
                  </li>
                ))}
                {
                  props.multipleImage &&
                    <li  className='m-3'>
                      <div 
                        className='text-center primary-color border-primary rounded d-flex flex-wrap justify-content-center align-items-center' style={{width:"150px",height:"150px",cursor:"pointer"}}
                        onClick={handleAddImageClick}
                      >
                        <span className='d-flex flex-wrap'>
                          <span className='fs-1 fw-bold w-100 float-left'>&#43;</span>
                          <span className='fs-6 w-100 float-left'>Add Images</span>
                        </span>
                      </div>

                    </li>
                }
              </ul>
            ) : (
              <>
                <label className='text-center primary-color position-absolute m-auto' style={{width:"160px",height:"80px",left:"0",right:"0",top:"0",bottom:"0"}}>
                    Drag & Drop Here<br/>
                    Or<br/>
                    Browse<br/>
                </label>
                
              </>
            )
            
        }
        
        <input 
          className='position-absolute w-100 h-100' 
          type="file"
          id="file_upload"
          accept=".png, .jpg, .jpeg"
          multiple
          style={{opacity:"0",top:"0"}}
          onChange={handleImageAdded}
        />
    </div>
    </>
    
    
  );
}
