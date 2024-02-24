import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { baseURL } from '../constants/alpha-env.constant';
import { useParams } from "react-router-dom";
import  ProductCard  from "../components/ProductCard"
export default function ProductDetails() {
  const params = useParams();
  const [getProduct, setProduct] = useState([])
  useEffect(() => {
    async function fetchProductList() {
      try {
        const where = encodeURIComponent(JSON.stringify( {slug: params.slug }));
        const { data: res } = await axios.get(`${baseURL}/product-ms/getProductList?filter=${where}`);
        setProduct(res.data[0])
        console.log(res.data[0]);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    }

    fetchProductList();
  }, [params.slug]); 
  return (
    <div className='container'>
      <ProductCard getImage={getProduct}/>
    </div>
    
  )
}
