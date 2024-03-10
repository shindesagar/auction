import React, { useState,useRef } from 'react';
import ImageUpload from '../components/ImageUpload';
import axios from 'axios';
import { baseURL } from '../constants/alpha-env.constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    if (name === 'auctionDuration') {
      const parsedDate = new Date(value);
      setProductData((prev) => ({ ...prev, [name]: value, auctionDuration: convertToIsoString(parsedDate), slug: generateSlug(slugValue.current) }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value, slug: generateSlug(slugValue.current)}));
    }
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9\s(){}[\]]/g, '-').replace(/\s+/g, '-');
  };
  const convertToIsoString = (date) => {
    let datetime = new Date(date);
    return datetime.toISOString();
  };
  const createProduct = async () => {
    try {
      const imagesToSend = images
        .filter(res => res.data.filename)
        .map(res => res.data.filename);

      const requestData = { ...getProductData, images: imagesToSend };
      console.log(requestData);
      await axios.post(`${baseURL}/product-ms/add`, requestData, {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": JSON.parse(localStorage.getItem('x-access-token'))
        }
      });
      toast.success('Added product successfully!');
      setTimeout(() => {
        navigate('/'); 
      }, 1000);
     
    } catch (error) {
      toast.error('Failed to add product:', error);
      setTimeout(() => {
        navigate('/'); 
      }, 1000);
      if(error.response && error.response.status === 401){
        navigate('/login'); 
      }
    }
  };
  return (
    <main className="form-signin ">
        <div className='container'>
            <div className="form-floating mb-3 text-center fw-bold fs-1">Add Product</div>
            <div className="mb-3">
                <label  className="form-label">Title</label>
                <input type="text" className="form-control" value={getProductData.title}  name="title" onChange={handleChange}/>
            </div>
            <div className="mb-3 mt-">
                <label className="form-label" style={{marginRight:"20px"}}>Slug:</label>
                <span className='primary-color'>{getProductData.slug}</span>
                
                </div>
            <div  className="mb-3">
                <label  className="form-label">Category</label>
                <select className="form-select" aria-label="Category" name="category" onChange={handleChange}>
                    <option selected></option>
                    <option value="car">Car</option>
                    <option value="House">House</option>
                    <option value="jwelry">Jwelry</option>
                    <option value="watches">Watches</option>
                </select>
            </div>
            <div className="mb-3">
                <label  className="form-label">Description</label>
                <textarea className="form-control" rows="3"  name="description" onChange={handleChange}></textarea>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label  className="form-label">Starting Bid</label>
                        <input type="number" className="form-control"  name="startingBid" onChange={handleChange}/>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label  className="form-label">Auction Duration</label>
                        <input type="datetime-local" className="form-control"  name="auctionDuration" onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">Images</label>
                <div className='col-md-12'>
                    <ImageUpload multipleImage={true} imageRender={images} setImageRender={setImages}/>
                </div>
                
            </div>
            <div className='text-end'>
                <button className=" btn btn-lg btn-dark" type="submit" onClick={() =>  createProduct()}>
                    Submit
                </button>
            </div>
        </div>   
    </main>
  )
}
