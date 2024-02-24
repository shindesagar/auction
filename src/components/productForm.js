import React, { useState,useRef } from 'react';
import ImageUpload from '../components/ImageUpload';
import axios from 'axios';
import { baseURL } from '../constants/alpha-env.constant';
import { useNavigate } from 'react-router-dom';
export default function ProductForm() {
  
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [getProductData, setProductData] = useState({ title: '', slug: '' });
  const slugValue = useRef('');
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
        slugValue.current = value;
    }
    setProductData((prev) => ({ ...prev, [name]: value, slug: generateSlug(slugValue.current) }));
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9\s(){}\[\]]/g, '-').replace(/\s+/g, '-');
  };

  const createProduct = async () => {
    try {
      const imagesToSend = images
        .filter(res => res.data.filename)
        .map(res => res.data.filename);

      const requestData = { ...getProductData, images: imagesToSend };
      const { data } = await axios.post(`${baseURL}/product-ms/add`, requestData, {
        headers: {
            "Content-Type" : "application/json"
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      if(error.response && error.response.status === 401){
        navigate('/login'); 
      }
    }
  };
  return (
    <main className="form-signin ">
        <div className='container'>
            <div className="form-floating mb-3 text-center fw-bold fs-1">Add Product</div>
            <div class="mb-3">
                <label  class="form-label">Title</label>
                <input type="text" class="form-control" value={getProductData.title}  name="title" onChange={handleChange}/>
            </div>
            <div className="mb-3 mt-">
                <label className="form-label" style={{marginRight:"20px"}}>Slug:</label>
                <span className='primary-color'>{getProductData.slug}</span>
                
                </div>
            <div  class="mb-3">
                <label  class="form-label">Category</label>
                <select class="form-select" aria-label="Category" name="category" onChange={handleChange}>
                    <option selected></option>
                    <option value="car">Car</option>
                    <option value="House">House</option>
                    <option value="jwelry">Jwelry</option>
                    <option value="watches">Watches</option>
                </select>
            </div>
            <div class="mb-3">
                <label  class="form-label">Description</label>
                <textarea class="form-control" rows="3"  name="description" onChange={handleChange}></textarea>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div class="mb-3">
                        <label  class="form-label">Starting Bid</label>
                        <input type="number" class="form-control"  name="startingBid" onChange={handleChange}/>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div class="mb-3">
                        <label  class="form-label">Auction Duration</label>
                        <input type="number" class="form-control"  name="auctionDuration" onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="formFileSm" class="form-label">Images</label>
                <div className='col-md-12'>
                    <ImageUpload multipleImage={true} imageRender={images} setImageRender={setImages}/>
                </div>
                
            </div>
            <div>
                <button className="w-100 btn btn-lg btn-dark" type="submit" onClick={() =>  createProduct()}>
                    Submit
                </button>
            </div>
        </div>   
    </main>
  )
}
